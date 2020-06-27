import axios from 'axios';
import { setAlert } from './alerts';

export const getHomePage = (id) => async dispatch => {
  dispatch({
    type: 'HOURS_LOADING'
  })

  try {
    const res = await axios.get(`/api/users/${id}/stats`);
    console.log(res.data)
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to load, please refresh the page',
      type: 'danger'
    }))
  }
}

export const addHour = (hour) => async dispatch => {
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
    const res = await axios.post(`/api/hours`, hour, config);
    if (res.data.msg === 'added successfully!') {
      dispatch(setAlert({ msg: 'Added successfully!', type: 'success' }));
      dispatch({
        type: 'HOURS_ADDED',
        payload: {
          newHour: hour
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
    const calcHours = () => {
      let pending = 0;
      let approved = 0;
      let total = 0;
      res.data.forEach(doc => {
        if (doc.data.approved) {
          return approved += parseInt(doc.data.hours);
        } else {
          return pending += parseInt(doc.data.hours);
        }
      })
      res.data.forEach(doc => total += parseInt(doc.data.hours));
      return { pending, approved, total }
    }

    const { pending, approved, total } = calcHours();

    dispatch({
      type: 'HOURS_LOADED',
      payload: {
        myHours: res.data,
        approved,
        pending,
        total
      }
    })
  } catch (error) {
    dispatch(setAlert({
      msg: 'Faild to load, please refresh the page',
      type: 'danger'
    }))
  }
}

export const deleteHour = ({ id, hours }) => async dispatch => {
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
