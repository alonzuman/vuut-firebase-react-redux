const initialState = {
  isLoading: false,
  total: null,
  pending: null,
  allHours: [],
  users: []
}

export const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADMIN_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'CLEAR_ADMIN_HOURS':
      return {
        ...state,
        isLoading: false,
        allHours: []
      }
    case 'SET_ADMIN_HOURS':
      return {
        ...state,
        isLoading: false,
        allHours: payload.hours,
        pending: payload.pending,
        total: payload.total
      }
    case 'APPROVE_HOUR':
      return {
        ...state,
        pending: payload.pending,
        total: payload.total,
        isLoading: false
      }
    case 'UNAPPROVE_HOUR':
      return {
        ...state,
        pending: payload.pending,
        total: payload.total,
        isLoading: false,
      }
    case 'APPROVE_USER':
      return {
        ...state,
        isLoading: false,
        users: state.users.filter(user => user.id !== payload)
      }
    case 'UNAPPROVE_USER':
      return {
        ...state,
        isLoading: false
      }
    case 'SET_USERS':
      return {
        ...state,
        isLoading: false,
        users: payload
      }
    default: return state;
  }
}
