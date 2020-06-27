import React from 'react';
import './ApprovalPopup.css';
import { useSelector } from 'react-redux';

export default function ApprovalPopup({ approve, cancel }) {
  const { colors } = useSelector(state => state.theme)

  const textBoxStyle = {
    backgroundColor: colors.background
  }

  return (
    <div className='box-shadow'>
      <div style={textBoxStyle} className='text-box'>
        <h3>Are you sure?</h3>
        <button style={{width: 'auto'}} className='btn btn-primary' onClick={approve}>Approve</button>
        <button className='btn secondary-button' onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}
