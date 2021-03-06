import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MenuItem({ option }) {
  const { colors } = useSelector(state => state.theme)
  const [isHover, setIsHover] = useState(false);
  const { link, icon, label, stat, isFirst, isLast } = option;

  const style = {
    backgroundColor: isHover ? colors.backgroundDarkHover : colors.boxBackground,
    borderBottom: isFirst ? colors.border : '',
    borderTopRightRadius: isFirst ? '1rem' : '',
    borderTopLeftRadius: isFirst ? '1rem' : '',
    borderBottomLeftRadius: isLast ? '1rem' : '',
    borderBottomRightRadius: isLast ? '1rem' : '',
  }

  return (
    <Link to={link}>
      <li onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} style={style} className='menu-item'>
        <div className='menu-item-info'>
          <i className={icon}></i>
          <p>{label}</p>
        </div>
        <p>{stat ? stat : 0}</p>
      </li>
    </Link>
  )
}
