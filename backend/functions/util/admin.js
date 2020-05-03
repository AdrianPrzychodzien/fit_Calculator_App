const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKeys')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit-calc-app.firebaseio.com"
})

const db = admin.firestore()

module.exports = { admin, db }