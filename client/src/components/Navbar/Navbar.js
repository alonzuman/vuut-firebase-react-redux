import React, { Fragment } from 'react';
import NavItem from './NavItem';
import './Navbar.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { isAdmin } = useSelector(state => state.auth);
  const { colors } = useSelector(state => state.theme);

  const navbarStyle = {
    borderTop: colors.border,
    backgroundColor: colors.background,
    boxShadow: colors.shadow,
  }

  return (
    <div style={navbarStyle} className='navbar'>
      <ul className='nav-menu'>
        <Fragment>
          <NavItem link='/' icon='fas fa-compass' label='Home' />
          <NavItem link='/add' icon='fas fa-plus' label='Add Hours' />
          {isAdmin && <NavItem link='/admin' icon='fas fa-user-circle' label='Admin' />}
          {/* <NavLink exact activeClassName='active-nav-item' className='nav-item' to='/notifications'><i className="fas fa-bell"></i><br /><small>Notifications</small></NavLink> */}
        </Fragment>
      </ul>
    </div>
  )
}
