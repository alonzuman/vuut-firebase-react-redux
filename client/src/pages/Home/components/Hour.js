import React from 'react';
import './Hour.css';

export default function Hour({ hour }) {
  return (
    <div className='hour-container box-background'>
      <div className='hour-header'>
        <h1>{hour.description}</h1>
        <small>{hour.date}</small>
      </div>
      <div className='hour-footer'>
        <p>Total: {hour.hours}</p>
        {!hour.approved ? <i className="orange button-icon fas fa-times-circle"></i> : <i className="green button-icon fas fa-check-square"></i>}
      </div>
    </div>
  )
}
