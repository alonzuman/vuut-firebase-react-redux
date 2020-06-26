import React from 'react';
import './ToggleSwitch.css';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../../actions';

export default function ToggleSwitch() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      dispatch(switchTheme('light'));
    } else {
      dispatch(switchTheme('dark'));
    }
  }

  return (
    <div>
      <label className="switch">
        <input onChange={toggleTheme} checked={theme.type === 'dark'} type="checkbox" />
        <span  className="slider round"></span>
      </label>
    </div>
  )
}
