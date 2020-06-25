import React from 'react';
import './ToggleSwitch.css';

export default function ToggleSwitch() {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
