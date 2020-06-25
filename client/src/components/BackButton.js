import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BackButton() {
  const history = useHistory();

  return (
    <button className='btn back-button' onClick={() => history.goBack()}><i class="fas primary back-button-icon fa-chevron-left"></i><span>Back</span></button>
  )
}
