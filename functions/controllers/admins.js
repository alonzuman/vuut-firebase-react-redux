const { db } = require('../utils/admin');
const hoursRef = db.collection('hours');
const usersRef = db.collection('users');

const getAllUsers = async (req, res) => {
  try {
    const snapshot = await usersRef.where('role', '==', 'user').get();
    let users = [];
    snapshot.forEach(doc => users.push({ id: doc.id, details: doc.data()}));
    res.status(200).json(users)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'server error'
    })
  }
}

const getAllUnapprovedHours = async (req, res) => {
  if (req.user.role === 'admin' || req.user.role === 'moderator') {
    try {
      const snapshot = await hoursRef.where('approved', '==', false).get()
      let hours = [];
      snapshot.forEach(doc => hours.push({ id: doc.id, details: doc.data()}));
      res.status(200).json(hours);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json({
      msg: `You don't have the permissions to do that foo`
    })
  }
}

const getUnapprovedUsers = async (req, res) => {
  try {
    const snapshot = await usersRef.where('role', '==', 'pending').get();
    let users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, details: doc.data() })
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

const approveUser = async (req, res) => {
  const id = req.params.id;
  try {
    await usersRef.doc(id).update({ isApproved: true });
    res.status(201).json({
      msg: `user ${id} approved`
    })
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

const changeRole = async (req, res) => {
  const id = req.body.id;
  const newRole = req.body.role;
  try {
    await usersRef.doc(id).update({ role: newRole });
    res.status(201).json({
      msg: `user ${id} unapproved`
    })
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

const unapproveUser = async (req, res) => {
  const id = req.params.id;
  try {
    await usersRef.doc(id).update({ isApproved: false });
    res.status(201).json({
      msg: `user ${id} unapproved`
    })
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

const approveHour = async (req, res) => {
  const id = req.params.id;
  try {
    // TOOD if already approved/unapproved
    await hoursRef.doc(id).update({ approved: true });
    res.status(201).json({
      msg: `document ${id} approved`
    })
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

const unapproveHour = async (req, res) => {
  const id = req.params.id;
  try {
    // TOOD if already approved/unapproved
    await hoursRef.doc(id).update({ approved: false });
    res.status(201).json({
      msg: `document ${id} unapproved`
    })
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

module.exports = { getAllUnapprovedHours, approveHour, unapproveHour, getUnapprovedUsers, approveUser, unapproveUser, getAllUsers }
