const serviceAccount = require('./serviceAccountKey');

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vuut-react-redux.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db, admin }
