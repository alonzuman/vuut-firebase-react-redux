import axios from 'axios';
import { setAlert } from './alerts';

export const addHour = (hours) => async dispatch => {
  dispatch({
    type: 'HOURS_LOADING'
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    const res = await axios.post(`/api/hours`, hours, config);
    console.log(res.data)
    if (res.data.msg === 'added successfully!') {
      dispatch(setAlert({ msg: 'Added successfully!', type: 'success' }));
      dispatch({
        type: 'HOURS_ADDED',
        payload: {
          newHour: res.data
        }
      });
    };
  } catch (error) {
    // Dispatch alert
  }
}

export const getMyHours = () => async dispatch => {
  dispatch({
    type: 'HOURS_LOADING'
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    const res = await axios.get(`/api/hours`, config)
    dispatch({
      type: 'HOURS_LOADED',
      payload: res.data
    })
  } catch (error) {
    // Dispatch alert
  }
}
