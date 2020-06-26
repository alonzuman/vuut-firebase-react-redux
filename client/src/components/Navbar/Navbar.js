import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { isAuth, isLoading } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const navbarStyle = {
    borderTop: colors.border,
    backgroundColor: colors.background,
    boxShadow: colors.shadow
  }

  return (
    <div style={navbarStyle} className='navbar'>
      <ul className='nav-menu'>
        {isAuth && !isLoading &&
        <Fragment>
          <NavLink activeClassName='active-nav-item' className='nav-item' exact to='/'><i className="fas fa-compass"></i><br />Home</NavLink>
          <NavLink activeClassName='active-nav-item' className='nav-item' to='/add'><i className="fas fa-plus"></i><br/>Add Hours</NavLink>
          <NavLink activeClassName='active-nav-item' className='nav-item' to='/notifications'><i className="fas fa-bell"></i><br/>Notifications</NavLink>
        </Fragment>}
      </ul>
    </div>
  )
}
