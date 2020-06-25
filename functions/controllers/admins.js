const { db, admin } = require('../utils/admin');

const getLatestHours = async (req, res) => {
  try {
    // Get latest hours
    const data = await db.collection('hours').get()
    let hours = [];
    data.forEach(doc => hours.push(doc.data()));
    res.status(200).json(hours);
  } catch (error) {
    res.status(200).json(error);
  }
}

const approveHour = async (req, res) => {
  res.send('approving hour')
}

const unapproveHour = async (req, res) => {
  res.send('unapproving hour')
}

module.exports = { getLatestHours, approveHour, unapproveHour }
