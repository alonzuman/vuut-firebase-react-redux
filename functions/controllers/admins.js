const { db } = require('../utils/admin');
const hoursRef = db.collection('hours');
const usersRef = db.collection('users');

const getAllUnapprovedHours = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const data = await db.collection('hours').where('approved', '==', false).get()
      let hours = [];
      data.forEach(doc => hours.push({ id: doc.id, details: doc.data()}));
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
    const data = await usersRef.where('isApproved', '==', false).get();
    let users = [];
    data.forEach(doc => {
      users.push({ id: doc.id, user: doc.data() })
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

const unapproveUser = async (req, res) => {
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

module.exports = { getAllUnapprovedHours, approveHour, unapproveHour, getUnapprovedUsers, approveUser, unapproveUser }
