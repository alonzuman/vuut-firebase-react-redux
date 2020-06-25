import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyHours } from '../../actions';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuth, isLoading, token } = useSelector(state => state.auth);

  useEffect(() => { dispatch(getMyHours()) }, [])

  return (
    <div>
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      <Link to='/profile'><img className='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU' /></Link>
      <h1>Home</h1>
      <h3>My Hours</h3>
      <ul>
        <li>Pending Hours</li>
        <li>Approved Hours</li>
        <li>Organization</li>
      </ul>
      <h3>Recent</h3>
      <ul>
        <li>Pending Hours</li>
        <li>Approved Hours</li>
        <li>Organization</li>
      </ul>
    </div>
  )
}
