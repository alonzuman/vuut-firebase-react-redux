import React from 'react';
import './Spinner.css';

export default function Spinner({ padding }) {
  const style = {
    padding: padding === true ? '2rem 0' : ''
  }

  return (
    <div style={style} className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}
