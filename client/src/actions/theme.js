export const switchTheme = (type) => dispatch => {
  dispatch({
    type: 'THEME_LOADING'
  });
  dispatch({
    type: 'SWITCH_THEME',
    payload: type
  })
}

export const loadTheme = () => dispatch => {
  dispatch({
    type: 'LOAD_THEME',
    payload: localStorage.getItem('theme')
  })
}
