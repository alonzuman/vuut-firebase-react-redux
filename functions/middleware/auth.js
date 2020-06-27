const admin = require('firebase-admin');

const auth = async (req, res, next) => {
  const idToken = (req.headers['auth-token']) ? req.headers['auth-token'] : '';
  if (idToken) {
    try {
      // Admin auth verify
      // TODO return req.user to the firstName and the lastName as well
      const data = await admin.auth().verifyIdToken(idToken);
      const dbUser = await admin.firestore().collection('users').where('userId', '==', data.uid).limit(1).get();
      req.user = dbUser.docs[0].data();
      req.user.id = dbUser.docs[0].id;
      next();
    } catch (error) {
      switch (error.code) {
        case 'auth/argument-error':
          console.log(error.code)
          return res.status(403).json({ msg: 'access denied' });
        default:
          console.log(error.code)
          return res.status(500).json({ msg: 'server error' });
      }
    }
  } else {
    res.status(403).json({
      msg: 'no auth token'
    });
  }
};

module.exports = auth;
