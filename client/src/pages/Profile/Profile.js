import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector(state => state.auth)

  return (
    <div>
      {!token && <Redirect to='/signin' />}
      {isLoading && <Spinner />}
      <h1>Profile</h1>
      <button className='btn' onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  )
}

