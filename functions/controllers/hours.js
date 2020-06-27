const { db, admin } = require('../utils/admin');
const hoursRef = db.collection('hours');

const getLatestHour = async (req, res) => {
  try {
    const first = await hoursRef.where('userId', '==', 'NTZ6iXGsVST2V9j5pvAgUvcGcPl1').orderBy('dateCreated').limit(1).get()
    console.log(first);
    res.send('getting latest');
  } catch (error) {
    res.status(500).json(error);
  }
}

const getMyHours = async (req, res) => {
  try {
    const data = await hoursRef.where('userId', '==', req.user.userId).get();
    let hours = [];
    data.forEach(doc => hours.push({id: doc.id, data: doc.data()}));
    res.status(200).json(hours);
  } catch (error) {
    res.status(500).json(error);
  }
}

const addHour = async (req, res) => {
  const newHour = {
    description: req.body.description,
    hours: req.body.hours,
    date: req.body.date,
    approved: false,
    userId: req.user.userId,
    dateCreated: admin.firestore.Timestamp.fromDate(new Date())
  };

  try {
    const data = await hoursRef.add(newHour);
    res.status(201).json({
      msg: 'added successfully!',
      id: data.id
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

const removeHour = async (req, res) => {
  try {
    await hoursRef.doc(req.params.id).delete();
    res.status(200).json({
      msg: 'hours deleted'
    });
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

module.exports = { getMyHours, addHour, removeHour, getLatestHour };
