import React from 'react';
import './Alert.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Alert({ msg, type }) {
  const theme = useSelector(state => state.theme);
  const { colors } = theme;
  const dispatch = useDispatch();
  const alertColor = () => {
    switch (type) {
      case 'danger':
        return 'var(--red)'
      case 'success':
        return 'var(--green)';
      default: return 'var(--orange)'
    }
  }

  return (
    <div onClick={() => dispatch({type: 'CLEAR_ALERT'})} className='alert-background'>
        <div className='alert' style={{ backgroundColor: alertColor() }}>
          <p style={{color: colors.alertText}}><b>{msg}</b></p>
        </div>
    </div>
  )
}
