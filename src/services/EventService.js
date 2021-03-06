import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getDataEvents() {
    return apiClient.get('/events')
  },
  getEventId(id){
    return apiClient.get('/events/' + id)
  }
}
