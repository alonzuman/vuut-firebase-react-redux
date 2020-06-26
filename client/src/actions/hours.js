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
    dispatch(setAlert({
      msg: 'Faild to add, please refresh the page and try again',
      type: 'danger'
    }))
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
    const res = await axios.get(`/api/hours`, config);
    dispatch({
      type: 'HOURS_LOADED',
      payload: res.data
    })
  } catch (error) {
    dispatch(setAlert({
      msg: 'Faild to load, please refresh the page',
      type: 'danger'
    }))
  }
}

export const deleteHour = (id) => async dispatch => {
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
    await axios.delete(`/api/hours/${id}`, config);
    dispatch({
      type: 'HOURS_DELETED',
      payload: id
    })
    dispatch(setAlert({
      msg: 'Hours deleted',
      type: 'success'
    }))
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to delete hours',
      type: 'danger'
    }))
  }
}
