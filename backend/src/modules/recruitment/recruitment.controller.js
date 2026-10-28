const asyncHandler = require('../../utils/asyncHandler');
const { PROFESSIONS } = require('../../utils/constants');
const service = require('./recruitment.service');
exports.options = (_req, res) => res.json({ success: true, data: { professions: PROFESSIONS } });
exports.apply = asyncHandler(async (req, res) => {
  if (req.body.website) return res.status(201).json({ success: true, data: { reference: 'RECEIVED' } });
  const result = await service.submitApplication(req.body);
  res.status(201).json({ success: true, message: 'Application received.', data: result });
});
