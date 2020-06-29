import React from 'react';
import './ApprovalPopup.css';
import { useSelector } from 'react-redux';

export default function ApprovalPopup({ approve, cancel }) {
  const { colors } = useSelector(state => state.theme);
  const { direction, translation } = useSelector(state => state.locale);

  const textBoxStyle = {
    backgroundColor: colors.background,
    direction
  }

  return (
    <div className='box-shadow'>
      <div style={textBoxStyle} className='text-box'>
        <h3>{translation.areYouSure}?</h3>
        <button style={{width: 'auto'}} className='btn btn-primary' onClick={approve}>{translation.approve}</button>
        <button className='btn secondary-button' onClick={cancel}>{translation.cancel}</button>
      </div>
    </div>
  )
}
