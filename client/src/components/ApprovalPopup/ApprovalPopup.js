import React from 'react';
import './ApprovalPopup.css';

export default function ApprovalPopup({ approve, cancel }) {
  return (
    <div className='box-shadow'>
      <div className='text-box'>
        <h3>Are you sure?</h3>
        <button style={{width: 'auto'}} className='btn btn-primary' onClick={approve}>Approve</button>
        <button className='btn secondary-button' onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}
