import axios from 'axios';
import { setAuthToken } from '../utils/axiosConfig'

export const loadUser = () => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  const token = localStorage.getItem('token');

  if (token) {
    setAuthToken(token)
  };

  try {
    const res = await axios.get('/api/load');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
}

export const signup = (user) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }

    const res = await axios.post('/api/signup', user, config)
    dispatch({
      type: 'SIGN_UP_SUCCESS',
      payload: {
        token: res.data.token,
        user: res.data.user
      }
    })
    // Dispatch alert
  } catch (error) {
    console.log(error.response.data.msg)
    // Dispatch alert
  }
}

export const signin = (user) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  });

  try {
    const res = await axios.post('/api/signin', user);
    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: {
        token: res.data.token
      }
    });
    // Dispatch an alert
    console.log(res.data);
  } catch (error) {
    // Dispatch an alert
    console.log(error.response.data.msg);
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  });
  try {
    dispatch({
      type: 'SIGN_OUT'
    })
  } catch (error) {
    // Set alert
  }
}
