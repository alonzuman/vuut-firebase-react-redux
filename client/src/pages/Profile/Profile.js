import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect, useHistory } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Topbar from '../../components/Topbar/Topbar';

export default function Profile() {
  const dispatch = useDispatch();
  const { token, isAuth, isLoading } = useSelector(state => state.auth)

  return (
    <div>
      <Topbar backButton={true} />
      {isLoading && <Spinner />}
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {!isLoading &&
      <Fragment>
        <h1>Profile</h1>
        <button className='btn secondary-button' onClick={() => dispatch(logout())}>Log Out</button>
      </Fragment>}
    </div>
  )
}

