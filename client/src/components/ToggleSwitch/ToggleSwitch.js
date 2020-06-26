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

  const iconStyle = {
    color: theme.colors.text,
    fontSize: '1rem',
    margin: '.7rem .4rem 0 .4rem',
  }

  const toggleContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  }

  const switchStyle = {
    // position: 'absolute'
  }

  return (
    <div style={toggleContainer}>
      <i style={iconStyle} className="fas fa-sun"></i>
      <label style={switchStyle} className="switch">
        <input onChange={toggleTheme} checked={theme.type === 'dark'} type="checkbox" />
        <span  className="slider round"></span>
      </label>
      <i style={iconStyle} className="fas fa-moon"></i>
    </div>
  )
}
