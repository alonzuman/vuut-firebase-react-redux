import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import BackButton from '../BackButton';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

export default function Topbar({ backButton, themeToggle }) {
  return (
    <div className='topbar'>
      <ul className='topbar-menu'>
        {themeToggle === true &&
        <li className='topbar-item'>
          <ToggleSwitch />
        </li>}
        <li className='topbar-item'>
          {backButton === true ? <BackButton /> : ''}
        </li>
        <Link to='/profile'>
          <li className='topbar-item'>
            <img alt='user-avatar' className='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU' />
          </li>
        </Link>
      </ul>
    </div>
  )
}
