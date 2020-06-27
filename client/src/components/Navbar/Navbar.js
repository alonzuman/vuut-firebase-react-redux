import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { isAdmin, isAuth, isLoading } = useSelector(state => state.auth);
  const { colors } = useSelector(state => state.theme);

  const navbarStyle = {
    borderTop: colors.border,
    backgroundColor: colors.background,
    boxShadow: colors.shadow,
  }

  return (
    <div style={navbarStyle} className='navbar'>
      <ul className='nav-menu'>
        {!isLoading &&
        <Fragment>
          <NavLink exact activeClassName='active-nav-item' className='nav-item' to='/'><i className="fas fa-compass"></i><br /><small>Home</small></NavLink>
          <NavLink exact activeClassName='active-nav-item' className='nav-item' to='/add'><i className="fas fa-plus"></i><br /><small>Add Hours</small></NavLink>
          {/* <NavLink exact activeClassName='active-nav-item' className='nav-item' to='/notifications'><i className="fas fa-bell"></i><br /><small>Notifications</small></NavLink> */}
          {isAdmin && <NavLink exact activeClassName='active-nav-item' className='nav-item' to='/admin'><i className="fas fa-user-circle"></i><br /><small>Admin</small></NavLink>}
        </Fragment>}
      </ul>
    </div>
  )
}
