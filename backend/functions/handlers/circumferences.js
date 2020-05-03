const { db } = require('../util/admin')

const circumferencesRef = db.collection('circumferences')
  .doc(new Date().toISOString().slice(0, 10));

exports.postBodyFatCircum = (req, res) => {
  const newCircumferences = {
    waist: req.body.waist,
    hips: req.body.hips,
    neck: req.body.neck,
    createdAt: new Date().toISOString()
  }

  circumferencesRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) return docSnapshot.ref.update(newCircumferences)

      return circumferencesRef.set(newCircumferences)
    })
    .then(() => {
      return res.json(newCircumferences)
    })
    .catch(err => console.log(err))
}