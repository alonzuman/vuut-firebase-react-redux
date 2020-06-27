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
    dispatch({
      type: 'SET_ADMIN_HOURS',
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert({
      msg: 'Failed to fetch, please refresh the page', type: 'danger'
    }));
  }
}
