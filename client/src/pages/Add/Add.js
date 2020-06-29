import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHour, setAlert } from '../../actions';
import { calculateHours, setDateString } from '../../utils/calculateHours';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import './Add.css'

// Date picker
import DateTime from 'react-datetime';
import './DateTime.css';

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Topbar from '../../components/Topbar/Topbar';
import Navbar from '../../components/Navbar/Navbar';

export default function Add() {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const hoursState = useSelector(state => state.hours);
  const { token, isAuth, isLoading } = useSelector(state => state.auth);
  const { direction, translation } = useSelector(state => state.locale);
  const { type, msg } = useSelector(state => state.alerts);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const handleSubmit = e => {
    e.preventDefault();
    const hours = calculateHours(endDate - startDate);
    const newHour = {
      description,
      startDate: setDateString(startDate),
      endDate: setDateString(endDate),
      hours
    };
    if (hours <= 0) {
      dispatch(setAlert({ msg: translation.pleaseFillAllRequiredFields, type: 'danger' }));
    } else {
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
      <Navbar />
      {type === 'success' && msg === 'Added successfully!' && <Redirect to='/' />}
      {!isLoading && !token &&!isAuth && <Redirect to='/signin' />}
      <div style={containerStyle} className='container'>
        {hoursState.isLoading && <Spinner />}
        {!hoursState.isLoading &&
        <Fragment>
          <h1 className='page-title'>{translation.addHours}</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>{translation.description}</label>
              <textarea maxlength='120' rows='5' style={inputStyle} className='form-control' type='text' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className='flex-form-group'>
              <div style={flexStyle} className='form-group flex-group'>
                <label>{translation.startTime}</label>
                <div className='rdtContainer'>
                  <DateTime value={startDate} onChange={e => setStartDate(e._d)} />
                </div>
              </div>
              <div style={flexStyle} className='form-group flex-group'>
                <label>{translation.endTime}</label>
                <DateTime value={endDate} onChange={e => setEndDate(e._d)} />
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>{translation.add}</button>
          </form>
        </Fragment>}
      </div>
    </div>
  )
}
