import axios from 'axios'
const baseUrl = '/api/entries'


const getAll = (term) => {
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        term: term,
        page: 1,
        limit: 100,
      },
    };
  
    return axios.get(baseUrl, config).then(response => response.data);
  };
  
  const getEntry = (id) => {
    const token = window.localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    return axios.get(`${baseUrl}/${id}`, config).then(response => response.data);
  };
  
  const addEntry = (newObject) => {
    const token = window.localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    return axios.post(baseUrl, newObject, config).then(response => response.data);
  };
  
  const deleteEntry = (id) => {
    const token = window.localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    return axios.delete(`${baseUrl}/${id}`, config).then(response => response.data);
  };
  
  const updateEntry = (id, newObject) => {
    const token = window.localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    return axios.put(`${baseUrl}/${id}`, newObject, config).then(response => response.data);
  };

  
  export default { getAll, getEntry, addEntry, deleteEntry, updateEntry}
