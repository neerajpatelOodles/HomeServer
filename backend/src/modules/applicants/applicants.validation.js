const {z,uuid,optText,page,limit}=require('../../utils/schemas');
const {PROFESSIONS,APPLICANT_STATUSES}=require('../../utils/constants');
const idParams=z.object({id:uuid('Invalid applicant id')});
const listQuery=z.object({status:z.enum(APPLICANT_STATUSES).optional(),profession:z.enum(PROFESSIONS).optional(),search:z.string().trim().max(100).optional(),page,limit:limit(20,100)});
const statusBody=z.object({status:z.enum(['applied','screening','interview','offer','rejected']),note:optText(1000)});
const hireBody=z.object({});
module.exports={idParams,listQuery,statusBody,hireBody};
