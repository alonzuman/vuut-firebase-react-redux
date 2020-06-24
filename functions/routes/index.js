const express = require('express');
const router = express.Router();
const { getAllHours, addHour } = require('../controllers/hours');
const { signup, signin, imageUpload } = require('../controllers/users');
const auth = require('../middleware/auth');

// Hours
router.get('/hours', getAllHours)
      .post('/hours', auth, addHour)

// Signup routes
router.post('/signup', signup)
      .post('/signin', signin)
      .post('/user/imageUpload', auth, imageUpload)

module.exports = router;
