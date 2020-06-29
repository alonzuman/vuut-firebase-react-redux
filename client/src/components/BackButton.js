import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function BackButton() {
  const [isHover, setIsHover] = useState(false);
  const history = useHistory();
  const { translation } = useSelector(state => state.locale);
  const { colors } = useSelector(state => state.theme);

  const labelStyle = {
    marginBottom: '.2rem'
  }

  const iconStyle = {
    fontSize: '1.5rem',
  }

  const buttonStyle = {
    backgroundColor: isHover ? colors.backgroundDarkHover : colors.backgroundColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <button onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)} style={buttonStyle} className='btn btn-secondary' onClick={() => history.goBack()}>
      <i style={iconStyle} className="fas primary btn-secondary-icon fa-chevron-left"></i><span style={labelStyle}>{translation.back}</span>
    </button>
  )
}
