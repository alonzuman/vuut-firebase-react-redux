import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MenuItem({ option }) {
  const { colors } = useSelector(state => state.theme)
  const [isHover, setIsHover] = useState(false);
  const { link, icon, label, stat, border } = option;

  const style = {
    backgroundColor: isHover ? colors.backgroundDark : colors.boxBackground,
    color: colors.text,
    borderBottom: border ? `${colors.border}` : ''
  }

  return (
    <Link to={link}>
      <li onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} style={style} className='menu-item'>
        <div className='menu-item-info'>
          <i className={icon}></i>
          <p>{label}</p>
        </div>
        <p>{stat}</p>
      </li>
    </Link>
  )
}
