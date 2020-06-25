import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { isAuth, isLoading } = useSelector(state => state.auth)

  return (
    <div className='navbar'>
      <ul className='nav-menu'>
        {isAuth && !isLoading &&
        <Fragment>
          <NavLink activeClassName='active-nav-item' className='nav-item' to='/'>Home</NavLink>
          <NavLink activeClassName='active-nav-item' className='nav-item' to='/add'>Add Hours</NavLink>
          <NavLink activeClassName='active-nav-item' className='nav-item' to='/notifications'>Notifications</NavLink>
        </Fragment>}
      </ul>
    </div>
  )
}
