import axios from 'axios'
const baseUrl = '/api/auth'


const login = newObject => {
    return axios.post(`${baseUrl}/login`, newObject).then(response => response.data)
  }


  export default {login}