const functions = require('firebase-functions');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKeys')
const cors = require('cors')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit-calc-app.firebaseio.com"
})


const express = require('express')
const app = express()

app.get('/personalData', (req, res) => {
  admin.firestore().collection('personalData').get().then(data => {
    let personalData = []
    data.forEach(doc => {
      personalData.push(doc.data())
    })
    return res.json(personalData)
  })
    .catch((err) => console.error(err))
})

app.post('/personalData', (req, res) => {
  const newPersonalData = {
    weight: req.body.weight,
    height: req.body.height,
    age: req.body.age,
    fat: req.body.fat,
    sex: req.body.sex,
    lifeActivity: req.body.lifeActivity,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  return admin
    .firestore()
    .collection('personalData')
    .add(newPersonalData)
    .then(doc => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})

exports.api = functions.region('europe-west1').https.onRequest(app)