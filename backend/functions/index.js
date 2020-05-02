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
  admin
    .firestore()
    .collection('personalData')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let personalData = []
      data.forEach(doc => {
        personalData.push({
          id: doc.id,
          weight: doc.data().weight,
          height: doc.data().height,
          age: doc.data().age,
          fat: doc.data().fat,
          sex: doc.data().sex,
          lifeActivity: doc.data().lifeActivity,
          createdAt: doc.data().createdAt
        })
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
    createdAt: new Date().toISOString(),
  }

  const userRef = admin.firestore().collection('personalData').doc(new Date().toISOString().slice(0, 10));

  userRef.get()
    .then((docSnapshot) => {
      return userRef.set(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

exports.api = functions.region('europe-west1').https.onRequest(app)