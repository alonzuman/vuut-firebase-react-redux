import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function StatItem({ stat, label }) {
  const [isHover, setIsHover] = useState(false);
  const { colors } = useSelector(state => state.theme);

  const style = {
    backgroundColor: isHover ? colors.backgroundDarkHover : colors.background,
    minWidth: '5rem'
  }

  return (
    <li style={style} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='stats-item'>
      <h1>{stat ? stat : 0}</h1>
      <p className='stats-label'>{label}</p>
    </li>
  )
}
