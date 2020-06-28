import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHour, setAlert } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import './Add.css'

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Topbar from '../../components/Topbar/Topbar';

export default function Add() {
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  // const [date, setDate] = useState(Date.now());
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const hoursState = useSelector(state => state.hours);
  const { token, isAuth, isLoading } = useSelector(state => state.auth);
  const { type, msg } = useSelector(state => state.alerts);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const handleSubmit = e => {
    e.preventDefault();
    if (hours.length <= 0 || description.length <= 0) {
      dispatch(setAlert({ msg: 'Please fill all required fields', type: 'danger' }));
    } else {
      const newHour = {
        description,
        hours,
        date
      };

      dispatch(addHour(newHour))
    }
  }

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers
  }

  const inputStyle = {
    backgroundColor: colors.background,
    border: colors.border
  }

  return (
    <div>
      <Topbar backButton={true} />
      {type === 'success' && msg === 'Added successfully!' && <Redirect to='/' />}
      {!isLoading && !token &&!isAuth && <Redirect to='/signin' />}
      <div style={containerStyle} className='container'>
        {hoursState.isLoading && <Spinner />}
        {!hoursState.isLoading &&
        <Fragment>
          <h1>Add Hours</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Description</label>
              <input style={inputStyle} className='form-control' type='text' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className='flex-form-group'>
              <div className='form-group flex-group'>
                <label>Date</label>
                <div>
                  <input style={inputStyle} className='form-control' value={date} type='date' onChange={e => setDate(e.target.value)} />
                </div>
                {/* <DatePicker id='date-picker' style={inputStyle}  className='form-control' selected={date} onSelect={handleSelect} /> */}
              </div>
              <div className='form-group flex-group'>
                <label>Hours</label>
                <input style={inputStyle} className='form-control' type='number' value={hours} onChange={e => setHours(e.target.value)} />
              </div>
            </div>
            <button type='submit' className='btn btn-primary' >Submit</button>
          </form>
        </Fragment>}
      </div>
    </div>
  )
}
