const initialState = {
  isAdmin: false,
  token: localStorage.getItem('token'),
  user: {
    firstName: '',
    lastName: '',
    total: 0,
    pending: 0,
    userId: '',
    organization: '',
    email: '',
    id: '',
    avatar: '',
  },
  isAuth: false,
  isLoading: false
}

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'USER_LOADED':
      return {
        ...state,
        user: payload,
        isAdmin: payload.isAdmin,
        isAuth: true,
        isLoading: false
      }
    case 'SIGN_IN_SUCCESS':
    case 'SIGN_UP_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        isLoading: false
      }
    case 'SIGN_OUT':
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: {},
        isAuth: false,
        isLoading: false
      }
    default: return state;
  }
}
