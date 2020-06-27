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

    const calcHours = () => {
      let pending = 0;
      let total = 0;
      res.data.forEach(doc => {
        if (doc.details.approved) {
          total += parseInt(doc.details.hours);
        } else {
          pending += parseInt(doc.details.hours)
        }
      })
      return { pending, total }
    }
    const { pending, total } = calcHours();

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

export const getAllUnapprovedUsers = () => async dispatch => {
  try {
    const res = await axios.get('api/admin/users/unapproved');
    dispatch({
      type: 'SET_UNAPPROVED_USERS',
      payload: res.data
    })
  } catch (error) {
    dispatch(setAlert({
      msg: 'Server error, please refresh the page and try again',
      type: 'danger'
    }))
  }
}

export const approveUser = (id) => async dispatch => {
  console.log('approving')
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

    await axios.put(`/api/admin/users/${id}/approve`, config);
    dispatch(setAlert({
      msg: 'Approved user',
      type: 'success'
    }))
  } catch (error) {
    dispatch(setAlert({
      msg: 'Server error, please refresh the page and try again',
      type: 'danger'
    }))
  }
}

export const unapproveUser = (id) => async dispatch => {
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

    await axios.put(`/api/admin/users/${id}/unapprove`, config);
    dispatch(setAlert({
      msg: 'Approved user',
      type: 'success'
    }))
  } catch (error) {
    dispatch(setAlert({
      msg: 'Server error, please refresh the page and try again',
      type: 'danger'
    }))
  }
}

export const approveHour = (id, hours) => async dispatch => {
  const state = store.getState();
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
        total,
        pending
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
        total,
        pending
      }
    })
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to approve, please refresh and try again',
      type: 'danger'
    }))
  }
}
