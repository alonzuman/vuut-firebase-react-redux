import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavItem({ link, icon, label }) {
  return (
    <NavLink
      exact activeClassName='active-nav-item'
      className='nav-item'
      to={link}
    >
      <i className={icon}></i><br />
      <small>{label}</small>
    </NavLink>
  )
}
