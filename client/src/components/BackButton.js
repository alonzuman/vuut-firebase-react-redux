import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BackButton() {
  const history = useHistory();

  return (
    <button className='btn secondary-button' onClick={() => history.goBack()}><i className="fas primary secondary-button-icon fa-chevron-left"></i><span>Back</span></button>
  )
}
