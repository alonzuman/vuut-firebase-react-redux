import React, { useEffect, Fragment } from 'react';
import './Home.css'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyHours } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import Hour from './components/Hour';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuth, isLoading, token } = useSelector(state => state.auth);
  const hours = useSelector(state => state.hours)

  useEffect(() => { dispatch(getMyHours()) }, [])

  return (
    <div>
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      <Link to='/profile'><img alt='user-avatar' className='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU' /></Link>
      {hours &&
      <Fragment>
        <h1>Home</h1>
        <ul className='stats-list box-background'>
          <li className='stats-item'>
            <h1>28</h1>
            <p>Total Hours</p>
          </li>
          <li className='stats-item'>
            <h1>28</h1>
            <p>Pending</p>
          </li>
          <li className='stats-item'>
            <h1>28</h1>
            <p>Approved</p>
          </li>
        </ul>
        <div className='category-title'><h2>My Hours</h2><Link to='/my-hours'>All</Link></div>
        <ul className='box-background'>
          <li className='menu-item'>
            <Link to='/my-hours'>Pending</Link>
          </li>
          <li className='menu-item'>
            <Link to='/my-hours'>Approved</Link>
          </li>
        </ul>
        <div className='category-title'><h2>Recent</h2></div>
        <ul>
          {!hours.myHours[0] ? <Spinner /> : <Hour hour={hours.myHours[0]} />}
        </ul>
      </Fragment>}
    </div>
  )
}
