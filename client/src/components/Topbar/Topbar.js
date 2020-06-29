import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import BackButton from '../BackButton';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useSelector } from 'react-redux';

export default function Topbar({ backButton, themeToggle, avatar }) {
  const [avatarHover, setAvatarHover] = useState(false);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const topbarStyle = {
    backgroundColor: colors.backgroundDark,
    direction: 'ltr'
  }

  const avatarStyle = {
    backgroundColor: avatarHover ? colors.backgroundDarkHover : ''
  }

  return (
    <div style={topbarStyle} className='topbar'>
      <ul className='topbar-menu'>
        {themeToggle === true &&
        <li className='topbar-item'>
          <ToggleSwitch />
        </li>}
        <li className='topbar-item'>
          {backButton === true ? <BackButton /> : ''}
        </li>
        {avatar === true && <Link to='/profile'>
          <li className='topbar-item'>
            <img onMouseEnter={() => setAvatarHover(true)} onMouseLeave={() => setAvatarHover(false)} style={avatarStyle} alt='user-avatar' className='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU' />
          </li>
        </Link>}
      </ul>
    </div>
  )
}
