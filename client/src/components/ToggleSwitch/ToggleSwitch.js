import React from 'react';
import './ToggleSwitch.css';

export default function ToggleSwitch() {
  return (
    <div>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  )
}
