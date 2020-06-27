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
    zIndex: '999',
    position: 'absolute',
    right: 0,
    margin: '.6rem .4rem 0 .4rem',
  }

  const toggleContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  }

  const switchStyle = {
    // position: 'absolute'
  }

  const sliderStyle = {
    zIndex: 999
  }

  return (
    <div style={toggleContainer}>
      <label style={switchStyle} className="switch">
        <input onChange={toggleTheme} checked={theme.type === 'dark'} type="checkbox" />
        <span style={sliderStyle} className="slider round"></span>
        <i style={iconStyle} className={`fas fa-moon ${theme.type === 'dark' ? '' : 'hide'}`}></i>
        <i style={iconStyle} className={`fas fa-sun ${theme.type === 'light' ? '' : 'hide'}`}></i>
      </label>
    </div>
  )
}
