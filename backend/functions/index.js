const express = require('express')
const cors = require('cors')
const functions = require('firebase-functions');
const app = express()
// app.use(cors());

const {
  getPersonalData,
  postPersonalData,
  postFatData,
  postDailyWeight,
  postWeightData,
  postFinishDate,
  deleteActualGoal,
  deleteActualGoalSaveWeights,
  deleteFinishDateOnly,
  setFormula
} = require('./handlers/personalData')
const { postBodyFatCircum } = require('./handlers/circumferences')

// personalData routes
app.get('/personalData', getPersonalData)
app.post('/personalData', postPersonalData)
app.post('/fatData', postFatData)
app.post('/dailyWeight', postDailyWeight)
app.post('/weightData', postWeightData)
app.post('/finishDate', postFinishDate)
app.delete('/clearActualGoal', deleteActualGoal)
app.delete('/clearActualGoalSaveWeights', deleteActualGoalSaveWeights)
app.delete('/clearFinish', deleteFinishDateOnly)
app.post('/setFormula', setFormula)

// circumferences routes
app.post('/bodyFatCircum', postBodyFatCircum)

exports.api = functions.region('europe-west1').https.onRequest(app)