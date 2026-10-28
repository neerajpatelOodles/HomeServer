const {query}=require('../../config/db');
async function admin(){const r=await query(`SELECT (SELECT COUNT(*)::int FROM users WHERE is_active) active_users,(SELECT COUNT(*)::int FROM applicants WHERE status NOT IN ('hired','rejected')) open_applicants`);return {stats:{activeUsers:r.rows[0].active_users,openApplicants:r.rows[0].open_applicants}}}
async function hr(){const [byStatus,byProfession,recent]=await Promise.all([
 query('SELECT status,COUNT(*)::int AS n FROM applicants GROUP BY status'),
 query(`SELECT profession,COUNT(*)::int AS n FROM applicants WHERE status NOT IN ('hired','rejected') GROUP BY profession`),
 query('SELECT id,first_name,last_name,profession,status,created_at FROM applicants ORDER BY created_at DESC LIMIT 5')
]); const statuses={applied:0,screening:0,interview:0,offer:0,hired:0,rejected:0};for(const r of byStatus.rows)statuses[r.status]=r.n;
 const professions={RN:0,RPN:0,PSW:0,RSW:0};for(const r of byProfession.rows)professions[r.profession]=r.n;
 return {applicantsByStatus:statuses,openApplicantsByProfession:professions,recentApplicants:recent.rows.map(r=>({id:r.id,name:[r.first_name,r.last_name].filter(Boolean).join(' '),profession:r.profession,status:r.status,appliedAt:r.created_at}))};}
async function caregiver(){return {message:'Welcome Caregiver — Part 1 placeholder'};}
async function client(){return {message:'Welcome Client — Part 1 placeholder'};}
module.exports={admin,hr,caregiver,client};
