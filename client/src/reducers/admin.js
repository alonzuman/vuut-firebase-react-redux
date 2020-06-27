const initialState = {
  isLoading: false,
  total: 0,
  approved: 0,
  pending: 0,
  allHours: []
}

export const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADMIN_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'SET_ADMIN_HOURS':
      return {
        ...state,
        isLoading: false,
        allHours: payload
      }
    default: return state;
  }
}
