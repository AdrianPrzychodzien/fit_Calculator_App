const express = require('express')
const cors = require('cors')
const app = express()
const functions = require('firebase-functions');
const { db } = require('./util/admin')
let FieldValue = require('firebase-admin').firestore.FieldValue;

// app.use(cors());

app.get('/personalData', (req, res) => {
  db
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

const personalDataRef = db.collection('personalData')
  .doc(new Date().toISOString().slice(0, 10));

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

  personalDataRef.get()
    .then((docSnapshot) => {
      if (!docSnapshot.exists) return personalDataRef.set(newPersonalData)

      return docSnapshot.ref.update(newPersonalData)
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

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update(newPersonalData)

      return personalDataRef.set(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.post('/dailyWeight', (req, res) => {
  const newPersonalData = {
    weight: req.body.weight,
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (!docSnapshot.exists) return personalDataRef.set(newPersonalData)

      return docSnapshot.ref.update(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.post('/weightData', (req, res) => {
  const newPersonalData = {
    weight: req.body.weight,
    weightGoal: req.body.weightGoal,
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update(newPersonalData)

      return personalDataRef.set(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.post('/finishDate', (req, res) => {
  const newPersonalData = {
    finish: req.body.finish,
    start: req.body.start,
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update(newPersonalData)

      return personalDataRef.set(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.delete('/clearActualGoal', (req, res) => {
  const newPersonalData = {
    finish: "",
    start: "",
    weightGoal: "",
    dailyWeightArray: [],
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update({
        finish: FieldValue.delete(),
        start: FieldValue.delete(),
        weightGoal: FieldValue.delete()
      })
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.delete('/clearActualGoalSaveWeights', (req, res) => {
  const newPersonalData = {
    finish: "",
    start: "",
    weightGoal: "",
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update({
        finish: FieldValue.delete(),
        start: FieldValue.delete(),
        weightGoal: FieldValue.delete()
      })
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.delete('/clearFinish', (req, res) => {
  const newPersonalData = {
    finish: "",
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update({
        finish: FieldValue.delete()
      })
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

app.post('/setFormula', (req, res) => {
  const newPersonalData = {
    formula: req.body.formula,
    createdAt: new Date().toISOString(),
  }

  personalDataRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update(newPersonalData)

      return personalDataRef.set(newPersonalData)
    })
    .then(() => {
      return res.json(newPersonalData)
    })
    .catch(err => console.log(err))
})

exports.api = functions.region('europe-west1').https.onRequest(app)