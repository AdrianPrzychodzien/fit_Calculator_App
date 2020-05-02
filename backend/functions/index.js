const express = require('express')
const cors = require('cors')
const app = express()
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKeys')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit-calc-app.firebaseio.com"
})

// app.use(cors());

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

  const userRef = admin.firestore().
    collection('personalData').doc(new Date().toISOString().slice(0, 10));

  userRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
          return docSnapshot.ref.update(newPersonalData)
        })
      } else {
        return userRef.set(newPersonalData)
      }

      return res.json(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.post('/fatData', (req, res) => {
  const newPersonalData = {
    fat: req.body.fat,
    createdAt: new Date().toISOString(),
  }

  const userRef = admin.firestore().
    collection('personalData').doc(new Date().toISOString().slice(0, 10));

  userRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
          return docSnapshot.ref.update({ fat: newPersonalData.fat, createdAt: newPersonalData.createdAt })
        })
      } else {
        return userRef.set({ fat: newPersonalData.fat, createdAt: newPersonalData.createdAt })
      }

      return res.json(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})


app.post('/dailyWeight', (req, res) => {
  const newPersonalData = {
    date: req.body.date,
    weight: req.body.weight,
    createdAt: new Date().toISOString(),
  }

  const userRef = admin.firestore().
    collection('personalData').doc(new Date().toISOString().slice(0, 10));

  userRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
          return docSnapshot.ref.update({ weight: newPersonalData.weight, createdAt: newPersonalData.createdAt })
        })
      } else {
        return userRef.set({ weight: newPersonalData.weight, createdAt: newPersonalData.createdAt })
      }

      return res.json(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

exports.api = functions.region('europe-west1').https.onRequest(app)