import colors from './colors.json';
const toggleColors = (type) => {
  if (type === 'dark') {
    return colors.dark
  } else {
    return colors.light
  }
}

const initialState = {
  type: localStorage.getItem('theme'),
  isLoading: 'false',
  colors: toggleColors(localStorage.getItem('theme'))
}

export const themeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'THEME_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'SWITCH_THEME':
      localStorage.setItem('theme', payload);
      document.body.style = `background-color: ${payload === 'dark' ? colors.dark.backgroundDark : colors.light.backgroundDark}`
      return {
        type: payload,
        isLoading: false,
        colors: toggleColors(payload)
      }
    case 'LOAD_THEME':
      document.body.style = `background-color: ${payload === 'dark' ? colors.dark.backgroundDark : colors.light.backgroundDark}`
      return {
        ...state
      }
    default: return state;
  }
}
