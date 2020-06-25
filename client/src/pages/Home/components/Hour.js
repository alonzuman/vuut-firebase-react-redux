import React, { useState } from 'react';
import ApprovalPopup from '../../../components/ApprovalPopup/ApprovalPopup';
import './Hour.css';

export default function Hour({ hour, isEditing }) {
  const [isDeleting, setIsDeleting] = useState(false)
  return (
    <div className='hour-container box-background'>
      {isDeleting && <ApprovalPopup approve={() => console.log('deleting')} cancel={() => setIsDeleting(false)} />}
      <div className='hour-header'>
        <h1>{hour.description}</h1>
        <small>{hour.date}</small>
      </div>
      <div className='hour-footer'>
        <p>Total: {hour.hours}</p>
        {isEditing ?
          <i onClick={() => setIsDeleting(true)} style={{ color: 'rgb(255, 69, 58)', fontSize: '1.3rem'}} className="fas fa-trash"></i>:
        !hour.approved ? <i className="orange button-icon fas fa-hourglass"></i> : <i className="green button-icon fas fa-check-square"></i>}
      </div>
    </div>
  )
}
