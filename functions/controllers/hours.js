const { db, admin } = require('../utils/admin');
const hoursRef = db.collection('hours');
const usersRef = db.collection('users');

const getMyHours = async (req, res) => {
  try {
    const data = await hoursRef.where('user.id', '==', req.user.userId).get();
    let hours = [];
    data.forEach(doc => hours.push({id: doc.id, data: doc.data()}));
    res.status(200).json(hours);
  } catch (error) {
    res.status(500).json(error);
  }
}

const addHour = async (req, res) => {
  const {
    description,
    startDate,
    endDate,
    hours,
  } = req.body

  const {
    firstName,
    lastName,
    avatar,
    userId
  } = req.user

  const newHour = {
    description,
    startDate,
    endDate,
    hours,
    approved: false,
    user: {
      firstName,
      lastName,
      avatar: avatar || '',
      id: userId
    },
    dateCreated: admin.firestore.Timestamp.fromDate(new Date())
  };

  if (req.user.role === 'user' || req.user.role === 'moderator' || req.user.role === 'admin') {
    try {
      const data = await hoursRef.add(newHour);
      await usersRef.doc(req.user.id).update({
        pending: parseInt(req.user.pending) + parseInt(newHour.hours)
      })
      res.status(201).json({
        msg: 'added successfully!',
        id: data.id
      })
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  } else {
    return res.status(403).json({ msg: 'profile not approved yet, please ask admin for approval' })
  }
}

const removeHour = async (req, res) => {
  try {
    const response = await hoursRef.doc(req.params.id).get();
    const { hours } = response.data()
    await hoursRef.doc(req.params.id).delete();
    await usersRef.doc(req.user.id).update({
      pending: parseInt(req.user.pending) - parseInt(hours)
    })
    res.status(200).json({
      msg: 'hours deleted'
    });
  } catch (error) {
    res.status(500).json({
      msg: 'server error'
    })
  }
}

module.exports = { getMyHours, addHour, removeHour };
