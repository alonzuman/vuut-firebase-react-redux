const initialState = {
  approved: null,
  pending: null,
  total: null,
  myHours: [],
  isLoading: false
}

export const hoursReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'HOURS_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'HOURS_ADDED':
      return {
        ...state,
        isLoading: false,
        myHours: [
          ...state.myHours,
          payload.newHour
        ]
      }
    case 'HOURS_LOADED':
      return {
        ...state,
        isLoading: false,
        myHours: [
          ...payload.myHours
        ],
        approved: payload.approved,
        pending: payload.pending,
        total: payload.total,
      }
    case 'HOURS_DELETED':
      console.log(state.myHours);
      return {
        ...state,
        isLoading: false,
        myHours: state.myHours.filter(hour => hour.id !== payload)
        // TODO calculate the hours minus that one
      }
    default: return state;
  }
}
