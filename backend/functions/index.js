const functions = require('firebase-functions');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKeys')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit-calc-app.firebaseio.com"
})

exports.hello = functions.https.onRequest((req, res) => {
  res.send('hello');
})

exports.getPersonalData = functions.https.onRequest((req, res) => {
  admin.firestore().collection('personalData').get().then(data => {
    let personalData = []
    data.forEach(doc => {
      personalData.push(doc.data())
    })
    return res.json(personalData)
  })
    .catch((err) => console.error(err))
})

exports.createPersonalData = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') return res.status(400).json({ error: 'Method not allowed' })

  const newPersonalData = {
    weight: req.body.weight,
    height: req.body.height,
    age: req.body.age,
    fat: req.body.fat,
    sex: req.body.sex,
    lifeActivity: req.body.lifeActivity,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  admin
    .firestore()
    .collection('personalData')
    .add(newPersonalData)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})