const express = require('express');
const router = express.Router();
const { getMyHours, addHour, removeHour } = require('../controllers/hours');
const { signup, signin, loadUser } = require('../controllers/users');
const { getAllUnapprovedHours, getUnapprovedUsers, approveHour, unapproveHour, unapproveUser, approveUser, getAllUsers } = require('../controllers/admins');
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
      .get('/admin/users/all', auth, getAllUsers) //TODO add auth
      .get('/admin/users/unapproved', auth, getUnapprovedUsers) //TODO add auth
      .put('/admin/hours/:id/approve', auth, approveHour)
      .put('/admin/hours/:id/unapprove', auth, unapproveHour)
      .put('/admin/users/:id/approve', auth, approveUser)
      .put('/admin/users/:id/unapprove', auth, unapproveUser)

module.exports = router;
