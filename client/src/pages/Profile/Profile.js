import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect, useHistory } from 'react-router-dom';

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, isAuth, isLoading } = useSelector(state => state.auth)

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {!isLoading &&
      <Fragment>
        <button className='btn' onClick={() => history.goBack()}>Back</button>
        <h1>Profile</h1>
        <button className='btn' onClick={() => dispatch(logout())}>Log Out</button>
      </Fragment>}
    </div>
  )
}

