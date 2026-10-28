const router = require('express').Router();
const authenticate = require('./middleware/authenticate');
const { authorizeRoles } = require('./middleware/authorize');
const { ROLES } = require('./utils/constants');

router.get('/health', (_req, res) => res.json({ success: true, status: 'ok' }));
router.use('/auth', require('./modules/auth/auth.routes'));
router.use('/recruitment', require('./modules/recruitment/recruitment.routes'));
router.use('/dashboard', require('./modules/dashboard/dashboard.routes'));
router.use('/hr/applicants', authenticate, authorizeRoles(ROLES.HR, ROLES.ADMIN), require('./modules/applicants/applicants.routes'));
router.use('/admin/users', authenticate, authorizeRoles(ROLES.ADMIN), require('./modules/users/users.routes'));
module.exports = router;
