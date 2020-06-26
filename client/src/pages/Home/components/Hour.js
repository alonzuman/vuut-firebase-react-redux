import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteHour } from '../../../actions';
import ApprovalPopup from '../../../components/ApprovalPopup/ApprovalPopup';
import './Hour.css';

export default function Hour({ hour, isEditing }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  console.log(hour);

  return (
    <div className='hour-container box-background'>
      {isDeleting && <ApprovalPopup approve={() => dispatch(deleteHour(hour.id))} cancel={() => setIsDeleting(false)} />}
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
