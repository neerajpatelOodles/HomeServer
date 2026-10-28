const { query, withTransaction } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { APPLICANT_TRANSITIONS } = require('../../utils/constants');
const { paginationMeta, likePattern } = require('../../utils/schemas');
const bcrypt = require('bcryptjs');
const env = require('../../config/env');
const toDto = (r) => ({ id:r.id, firstName:r.first_name, lastName:r.last_name, email:r.email, phone:r.phone, profession:r.profession,
  licenseNumber:r.license_number, yearsExperience:r.years_experience, city:r.city, region:r.region, coverNote:r.cover_note,
  status:r.status, rejectionReason:r.rejection_reason, hiredUserId:r.hired_user_id, appliedAt:r.created_at, updatedAt:r.updated_at });
async function list({ status, profession, search, page, limit }) {
  const where=[], params=[];
  if(status){params.push(status);where.push(`a.status=$${params.length}`)}
  if(profession){params.push(profession);where.push(`a.profession=$${params.length}`)}
  if(search){params.push(likePattern(search));const n=params.length;where.push(`(a.first_name ILIKE $${n} OR a.last_name ILIKE $${n} OR a.email ILIKE $${n})`)}
  const sql=where.length?`WHERE ${where.join(' AND ')}`:'';
  const total=(await query(`SELECT COUNT(*)::int AS n FROM applicants a ${sql}`,params)).rows[0].n;
  const rows=(await query(`SELECT a.* FROM applicants a ${sql} ORDER BY a.created_at DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`,[...params,limit,(page-1)*limit])).rows;
  return {items:rows.map(toDto),pagination:paginationMeta(total,page,limit)};
}
async function getById(id){
 const {rows}=await query('SELECT * FROM applicants WHERE id=$1',[id]);
 if(!rows[0]) throw ApiError.notFound('Applicant not found');
 const history=await query(`SELECT h.id,h.from_status,h.to_status,h.note,h.created_at,p.first_name,p.last_name FROM applicant_status_history h LEFT JOIN profiles p ON p.user_id=h.changed_by WHERE h.applicant_id=$1 ORDER BY h.created_at,h.id`,[id]);
 return {...toDto(rows[0]),history:history.rows.map(h=>({id:h.id,from:h.from_status,to:h.to_status,note:h.note,changedBy:[h.first_name,h.last_name].filter(Boolean).join(' ')||null,createdAt:h.created_at}))};
}
async function changeStatus(id,to,{note},actorId){
 await withTransaction(async db=>{
  const {rows}=await db.query('SELECT * FROM applicants WHERE id=$1 FOR UPDATE',[id]);
  if(!rows[0]) throw ApiError.notFound('Applicant not found');
  const from=rows[0].status;
  if(from===to) throw ApiError.badRequest(`Applicant is already "${to}"`);
  if(!APPLICANT_TRANSITIONS[from]?.includes(to)) throw ApiError.badRequest(`Cannot move applicant from "${from}" to "${to}"`);
  await db.query('UPDATE applicants SET status=$1,rejection_reason=$2 WHERE id=$3',[to,to==='rejected'?(note||null):null,id]);
  await db.query('INSERT INTO applicant_status_history (applicant_id,from_status,to_status,changed_by,note) VALUES ($1,$2,$3,$4,$5)',[id,from,to,actorId,note||null]);
 });
 return getById(id);
}
async function hire(id, _input, actorId){
 const defaultPassword = process.env.HIRED_CAREGIVER_PASSWORD || process.env.SEED_CAREGIVER_PASSWORD || env.seedCaregiver.password;
 const hash=await bcrypt.hash(defaultPassword, env.auth.bcryptRounds);
 const caregiver=await withTransaction(async db=>{
  const {rows}=await db.query('SELECT * FROM applicants WHERE id=$1 FOR UPDATE',[id]);
  const a=rows[0]; if(!a) throw ApiError.notFound('Applicant not found');
  if(a.status!=='offer') throw ApiError.badRequest(`Only applicants at the "offer" stage can be hired (this one is "${a.status}")`);
  const taken=await db.query('SELECT 1 FROM users WHERE LOWER(email)=LOWER($1)',[a.email]);
  if(taken.rowCount) throw ApiError.conflict('A user with this email already exists');
  const user=await db.query(`INSERT INTO users(email,password_hash,role_id) VALUES(LOWER($1),$2,(SELECT id FROM roles WHERE name='caregiver')) RETURNING id,email`,[a.email,hash]);
  const uid=user.rows[0].id;
  await db.query('INSERT INTO profiles(user_id,first_name,last_name,phone) VALUES($1,$2,$3,$4)',[uid,a.first_name,a.last_name,a.phone]);
  await db.query('INSERT INTO caregiver_profiles(user_id,applicant_id,profession,license_number,hire_date) VALUES($1,$2,$3,$4,CURRENT_DATE)',[uid,id,a.profession,a.license_number]);
  await db.query("UPDATE applicants SET status='hired',hired_user_id=$1,rejection_reason=NULL WHERE id=$2",[uid,id]);
  await db.query("INSERT INTO applicant_status_history(applicant_id,from_status,to_status,changed_by,note) VALUES($1,'offer','hired',$2,'Caregiver account created')",[id,actorId]);
  return {id:uid,email:user.rows[0].email};
 });
 return {applicant:await getById(id),caregiver};
}
module.exports={list,getById,changeStatus,hire};
