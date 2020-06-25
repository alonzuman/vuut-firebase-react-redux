const initialState = {
  isOn: false,
  msg: '',
  type: ''
};

export const alertsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLEAR_ALERT':
      return {
        ...state,
        isOn: false,
        msg: '',
        type: ''
      }
    case 'SET_ALERT':
      return {
        ...state,
        isOn: true,
        msg: payload.msg,
        type: payload.type
      }
    default: return state;
  }
}
