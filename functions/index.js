const functions = require('firebase-functions');
const express = require('express');
const app = express();
const router = require('./routes/index');
const firebase = require('firebase');
const cors = require('cors');

const firebaseConfig = {
  apiKey: "AIzaSyD31w6OXeUOsD7yP3z6JQuc123mvdXoNMg",
  authDomain: "vuut-react-redux.firebaseapp.com",
  databaseURL: "https://vuut-react-redux.firebaseio.com",
  projectId: "vuut-react-redux",
  storageBucket: "vuut-react-redux.appspot.com",
  messagingSenderId: "727664657055",
  appId: "1:727664657055:web:aceeac8a9634d8b135d8aa",
  measurementId: "G-22JYXB29V7"
};

firebase.initializeApp(firebaseConfig);

app.use(cors());
app.use('/', router);

exports.api = functions.region('europe-west3').https.onRequest(app);
