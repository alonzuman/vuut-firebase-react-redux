import axios from 'axios';

// axios.defaults.baseURL = 'https://europe-west3-vuut-react-redux.cloudfunctions.net';
axios.defaults.baseURL = 'http://localhost:5001/vuut-react-redux/europe-west3';

export const setAuthToken = token => {
  axios.defaults.headers.common['auth-token'] = token;
}

export const removeAuthToken = () => {
  delete axios.defaults.headers.common['auth-token']
}
