export const setAlert = ({ msg, type }) => dispatch => {
  dispatch({
    type: 'SET_ALERT',
    payload: {
      msg,
      type
    }
  })
  setTimeout(() => dispatch({
    type: 'CLEAR_ALERT'
  }), 5000);
}
