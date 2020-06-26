import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHour, setAlert } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import './Add.css'

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function Add() {
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(Date.now());
  const dispatch = useDispatch();
  const hoursState = useSelector(state => state.hours);
  const { token, isAuth, isLoading } = useSelector(state => state.auth);
  const { type } = useSelector(state => state.alerts);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const handleSubmit = e => {
    e.preventDefault();
    if (hours.length <= 0 || description.length <= 0) {
      dispatch(setAlert({ msg: 'Please fill all required fields', type: 'danger' }));
    } else {
      const newHour = {
        description, hours, date
      }
      dispatch(addHour(newHour))
    }
  }

  // const handleSelect = e => {
  //   setDate(e)
  // }

  const inputStyle = {
    backgroundColor: colors.background,
    border: colors.border
  }

  return (
    <div>
      {type === 'success' && <Redirect to='/' />}
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {hoursState.isLoading ? <Spinner /> :
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
                  <input style={inputStyle} className='form-control' type='date' value={date} onChange={e => setDate(e.target.value)} />
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
  )
}
