import axios from 'axios'

const api = axios.create({
  baseUrl: "https://europe-west1-fit-calc-app.cloudfunctions.net/api"
})

export { api }