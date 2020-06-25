import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import BackButton from '../BackButton';

export default function Topbar({ backButton }) {
  return (
    <div className='topbar'>
      <ul className='topbar-menu'>
        <div className='topbar-item'>
          {backButton === true ? <BackButton /> : ''}
        </div>
        <li className='topbar-item'>
          <Link to='/profile'><img alt='user-avatar' className='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU' /></Link>
        </li>
      </ul>
    </div>
  )
}
