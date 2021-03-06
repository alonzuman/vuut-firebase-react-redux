const firebase = require('firebase');
const { db } = require('../utils/admin');
const usersRef = db.collection('users');

// Sign up
const signup = async (req, res) => {
  // Export it to a util function
  if (req.body.email.trim() === '' || req.body.password.trim() === '') {
    res.status(400).json({
      msg: `please fill all the required fields`
    })
  };

  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).json({
      msg: `passwords don't match`
  })};

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar
  }

  try {
    let user = await db.doc(`/users/${newUser.email}`).get();

    // Check if user already exists
    if (user.exists) return res.status(400).json({ msg: 'user already exists'});
    const data = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
    const token = await data.user.getIdToken();

    // Add user to the users collection
    const userCredentials = {
      email: newUser.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: req.body.avatar || '',
      organization: 'Shaldag',
      role: 'pending',
      total: 0,
      pending: 0,
      dateCreated: new Date().toISOString(),
      userId: data.user.uid
    }

    await db.collection('users').doc(data.user.uid).set(userCredentials);

    return res.status(201).json({
      msg: 'successfully created user',
      token,
      user: userCredentials
    })
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return res.status(400).json({ msg: `email ${newUser.email} is already in use`});
      case 'auth/invalid-email':
        return res.status(400).json({ msg: `invalid email`});
      default:
        return res.status(500).json({ msg: 'server error' })
    }
  }
}

// Sign in
const signin = async (req, res) => {
  if (req.body.email.trim() === '' || req.body.password.trim() === '') {
    res.status(400).json({
      msg: `please fill all the required fields`
    })
  };

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const data = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    const newUser = await usersRef.doc(data.user.uid).get();
    const token = await data.user.getIdToken();
    res.status(200).json({
      msg: 'welcome!',
      token,
      user: newUser.data()
    })
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
      case 'uth/user-not-found':
      case 'auth/wrong-password':
        return res.status(403).json({ msg:'invalid credentials' })
      default:
        return res.status(500).json({ msg: 'server error' })
    }
  }
}

const loadUser = async (req, res) => {
  try {
    const hours = await db.collection('hours').where('user.id', '==', req.user.userId).get();
    let total = 0;
    let hoursArr = []
    hours.forEach(doc => {
      const data = doc.data();
      if (data.approved) {
        hoursArr.push(parseInt(data.hours));
      }
    });
    total = hoursArr.reduce((a, b) => a + b, 0)

    // update total on each load

    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'failed to load user'
    })
  }
}

module.exports = { signup, signin, loadUser }
