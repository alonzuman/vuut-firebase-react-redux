import axios from 'axios';

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
    dispatch({
      type: 'HOURS_ADDED',
      payload: {
        newHour: res.data
      }
    })
    console.log(res.data)
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
