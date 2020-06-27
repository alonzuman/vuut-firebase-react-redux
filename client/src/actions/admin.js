import store from '../store';
import axios from 'axios';
import { setAlert } from './alerts';

export const getAllHours = () => async dispatch => {
  dispatch({
    type: 'ADMIN_LOADING'
  })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }

    const res = await axios.get('/api/admin/all', config);
    // console.log(res.data);
    let pending = 0;
    let total = 0;

    const calcHours = () => {
      res.data.forEach(doc => {
        if (doc.details.approved) {
          total += parseInt(doc.details.hours);
        } else {
          pending += parseInt(doc.details.hours)
        }
      })
      return { pending, total }
    }
    calcHours();

    dispatch({
      type: 'SET_ADMIN_HOURS',
      payload: {
        hours: res.data,
        pending,
        total
      }
    });
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to fetch, please refresh the page',
      type: 'danger'
    }));
  }
}

export const approveHour = (id, hours) => async dispatch => {
  const state = store.getState();

  dispatch({
    type: 'ADMIN_LOADING'
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    await axios.put(`/api/admin/hours/${id}/approve`, config)
    let total = state.admin.total += parseInt(hours);
    let pending = state.admin.pending -= parseInt(hours);

    dispatch({
      type: 'APPROVE_HOUR',
      payload: {
        id,
        total
      }
    })
    // TODO if already approved
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to approve, please refresh and try again',
      type: 'danger'
    }))
  }
}

export const unapproveHour = (id, hours) => async dispatch => {
  const state = store.getState();

  dispatch({
    type: 'ADMIN_LOADING'
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    await axios.put(`/api/admin/hours/${id}/unapprove`, config);
    // TODO if already unapproved
    let total = state.admin.total -= parseInt(hours);
    let pending = state.admin.pending += parseInt(hours);

    dispatch({
      type: 'UNAPPROVE_HOUR',
      payload: {
        id,
        total
      }
    })
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to approve, please refresh and try again',
      type: 'danger'
    }))
  }
}
