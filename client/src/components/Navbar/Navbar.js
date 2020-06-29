import React, { Fragment, useEffect } from 'react';
import NavItem from './NavItem';
import './Navbar.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { user } = useSelector(state => state.auth);
  const role = user.role;
  const { colors } = useSelector(state => state.theme);
  const { translation } = useSelector(state => state.locale);

  const navbarStyle = {
    borderTop: colors.border,
    backgroundColor: colors.background,
    boxShadow: colors.shadow,
  }

  return (
    <div style={navbarStyle} className='navbar'>
      <ul className='nav-menu'>
        <Fragment>
          <NavItem link='/' icon='fas fa-compass' label={translation.home} />
          <NavItem link='/add' icon='fas fa-plus' label={translation.add} />
          {(role === 'admin' || role === 'moderator') && <NavItem link='/admin' icon='fas fa-user-circle' label={translation.admin} />}
          {/* <NavLink exact activeClassName='active-nav-item' className='nav-item' to='/notifications'><i className="fas fa-bell"></i><br /><small>Notifications</small></NavLink> */}
        </Fragment>
      </ul>
    </div>
  )
}
