const express = require('express');
const router = express.Router();
const { getMyHours, addHour, removeHour } = require('../controllers/hours');
const { signup, signin, loadUser } = require('../controllers/users');
const { getLatestHours, approveHour, unapproveHour } = require('../controllers/admins');
const auth = require('../middleware/auth');

// Hours
router.get('/hours', auth, getMyHours)
      .post('/hours', auth, addHour)
      .post('/hours', auth, addHour)
      .delete('/hours/:id', removeHour) //TODO add auth

// Auth routes
router.post('/signup', signup)
      .post('/signin', signin)
      .get('/load', auth, loadUser)

// TODO
// Admin routes
router.get('/admin/hours', getLatestHours)
      .put('/admin/hours/:id/approve', approveHour)
      .put('/admin/hours/:id/unapprove', unapproveHour)

module.exports = router;
