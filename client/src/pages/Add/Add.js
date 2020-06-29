import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHour, setAlert } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import './Add.css'

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Topbar from '../../components/Topbar/Topbar';

export default function Add() {
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endHour, setEndHour] = useState('');
  const dispatch = useDispatch();
  const hoursState = useSelector(state => state.hours);
  const { token, isAuth, isLoading } = useSelector(state => state.auth);
  const { direction, translation } = useSelector(state => state.locale);
  const { type, msg } = useSelector(state => state.alerts);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const handleSubmit = e => {
    e.preventDefault();
    if (startDate.length <= 0 || description.length <= 0) {
      dispatch(setAlert({ msg: 'Please fill all required fields', type: 'danger' }));
    } else {
      const newHour = {
        description,
        startDate,
        startHour,
        endDate,
        endHour
      };

      dispatch(addHour(newHour))
    }
  }

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    direction
  }

  const inputStyle = {
    backgroundColor: colors.background,
    border: colors.border
  }

  const flexStyle = {
    margin: direction === 'rtl' ? '0 0 0 1rem' : '0 1rem 0 0'
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
          <h1>{translation.addHours}</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>{translation.description}</label>
              <input style={inputStyle} className='form-control' type='text' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className='flex-form-group'>
              <div style={flexStyle} className='form-group flex-group'>
                <label>{translation.startTime}</label>
                <div>
                  <input style={inputStyle} className='form-control' value={startDate} type='date' onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                  <input style={inputStyle} className='form-control' value={startHour} type='time' onChange={e => setStartHour(e.target.value)} />
                </div>
              </div>
              <div style={flexStyle} className='form-group flex-group'>
                <label>{translation.endTime}</label>
                <div>
                  <input style={inputStyle} className='form-control' value={endDate} type='date' onChange={e => setEndDate(e.target.value)} />
                </div>
                <div>
                  <input style={inputStyle} className='form-control' value={endHour} type='time' onChange={e => setEndHour(e.target.value)} />
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>{translation.add}</button>
          </form>
        </Fragment>}
      </div>
    </div>
  )
}
