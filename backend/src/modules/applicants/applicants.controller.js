const asyncHandler = require('../../utils/asyncHandler');
const service = require('./applicants.service');
exports.list = asyncHandler(async (req,res)=>res.json({success:true,data:await service.list(req.validatedQuery)}));
exports.get = asyncHandler(async (req,res)=>res.json({success:true,data:{applicant:await service.getById(req.params.id)}}));
exports.changeStatus = asyncHandler(async (req,res)=>{const applicant=await service.changeStatus(req.params.id,req.body.status,req.body,req.user.id);res.json({success:true,data:{applicant}})});
exports.hire = asyncHandler(async (req,res)=>{const result=await service.hire(req.params.id,req.body,req.user.id);res.status(201).json({success:true,message:'Applicant hired. Caregiver account created with the agreed default password.',data:result})});
