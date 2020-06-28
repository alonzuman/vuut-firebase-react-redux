const express = require('express');
const router = express.Router();
const { getMyHours, addHour, removeHour } = require('../controllers/hours');
const { signup, signin, loadUser } = require('../controllers/users');
const { getAllUnapprovedHours, getUnapprovedUsers, approveHour, unapproveHour, unapproveUser, approveUser } = require('../controllers/admins');
const auth = require('../middleware/auth');

// Hours
router.get('/hours', auth, getMyHours)
      .post('/hours', auth, addHour)
      .post('/hours', auth, addHour)
      .delete('/hours/:id', auth, removeHour)

// Auth routes
router.post('/signup', signup)
      .post('/signin', signin)
      .get('/load', auth, loadUser)

// TODO
// Admin routes
router.get('/admin/all', auth, getAllUnapprovedHours)
      .get('/admin/users/unapproved', getUnapprovedUsers) //TODO add auth
      .put('/admin/hours/:id/approve', approveHour)
      .put('/admin/hours/:id/unapprove', unapproveHour)
      .put('/admin/users/:id/approve', approveUser)
      .put('/admin/users/:id/unapprove', unapproveUser)

module.exports = router;
