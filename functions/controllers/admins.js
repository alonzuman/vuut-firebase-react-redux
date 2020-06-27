const { db, admin } = require('../utils/admin');

const getAllHours = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const data = await db.collection('hours').get()
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

const approveHour = async (req, res) => {
  res.send('approving hour')
}

const unapproveHour = async (req, res) => {
  res.send('unapproving hour')
}

module.exports = { getAllHours, approveHour, unapproveHour }
