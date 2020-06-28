import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loadUser } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';

export default function Profile() {
  const dispatch = useDispatch();
  const { token, isAuth, isLoading, user } = useSelector(state => state.auth)
  const { colors } = useSelector(state => state.theme)

  useEffect(() => { loadUser() }, [])

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    textAlign: 'center'
  }

  return (
    <div style={containerStyle} className='container'>
      <Topbar avatar={false} backButton={true} />
      {isLoading && <Spinner />}
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {!isLoading &&
      <Fragment>
        <img className='avatar big' src={user.avatar ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU'} />
        <h1>Hi, {user.firstName}</h1>
        <button className='btn secondary-button' onClick={() => dispatch(logout())}>Log Out</button>
      </Fragment>}
    </div>
  )
}

