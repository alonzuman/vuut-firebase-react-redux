import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHour } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

export default function Add() {
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.hours);
  const { token } = useSelector(state => state.auth);

  const handleSubmit = () => {
    const newHour = {
      description, hours, date
    }
    dispatch(addHour(newHour))
  }

  return (
    <div>
      {isLoading && <Spinner />}
      {!token && <Redirect to='/' />}
      {!isLoading && <Fragment>
        <h1>Add Hours</h1>
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
        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
      </Fragment>}
    </div>
  )
}
