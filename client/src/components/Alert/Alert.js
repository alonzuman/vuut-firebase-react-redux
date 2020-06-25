import React from 'react';
import './Alert.css'

export default function Alert({ msg, type }) {
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
    <div className='alert-background'>
      <div className='alert' style={{ backgroundColor: alertColor() }}>
        <p><b>{msg}</b></p>
      </div>
    </div>
  )
}
