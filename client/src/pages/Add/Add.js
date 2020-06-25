import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHour } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';

export default function Add() {
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const hoursState = useSelector(state => state.hours);
  const { token, isAuth, isLoading } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();
    const newHour = {
      description, hours, date
    }
    dispatch(addHour(newHour))
  }

  return (
    <div>
      {hoursState.isLoading && <Spinner />}
      {isLoading && <Spinner />}
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {!isLoading  &&
      <Fragment>
        <h1>Add Hours</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Description</label>
            <input className='form-control' type='text' value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className='form-group'>
            <label>Date</label>
            <input className='form-control' type='date' value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className='form-group'>
            <label>Hours</label>
            <input className='form-control' type='number' value={hours} onChange={e => setHours(e.target.value)} />
          </div>
          <button className='btn btn-primary' >Submit</button>
        </form>
      </Fragment>}
    </div>
  )
}
