const { db, admin } = require('../utils/admin');

const getAllHours = async (req, res) => {
  try {
    const data = await db.collection('hours').get()
    let hours = [];
    data.forEach(doc => hours.push(doc.data()));
    res.status(200).json(hours);
  } catch (error) {
    res.status(200).json(error);
  }
}

const addHour = async (req, res) => {
  const newHour = {
    description: req.body.description,
    hours: req.body.hours,
    approved: false,
    userId: req.user.userId,
    dateCreated: admin.firestore.Timestamp.fromDate(new Date())
  };

  try {
    const data = await db.collection('hours').add(newHour);
    res.status(201).json({
      msg: 'added successfully!',
      id: data.id
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

module.exports = { getAllHours, addHour };
