const { db } = require('../utils/admin');
const hoursRef = db.collection('hours');

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

module.exports = { getAllHours, approveHour, unapproveHour }
