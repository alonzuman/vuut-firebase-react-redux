import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function BackButton() {
  const history = useHistory();
  const { translation } = useSelector(state => state.locale);

  return (
    <button className='btn secondary-button' onClick={() => history.goBack()}><i className="fas primary secondary-button-icon fa-chevron-left"></i><span>{translation.back}</span></button>
  )
}
