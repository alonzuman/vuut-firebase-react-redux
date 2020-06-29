import he from './locale/he'
import en from './locale/en'

const initialState = {
  direction: 'rtl',
  language: 'he',
  translation: he
}

export const localeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default: return state;
  }
}
