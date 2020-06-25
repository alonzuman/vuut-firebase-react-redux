import React, { useEffect, Fragment } from 'react';
import './Home.css'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyHours } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import Hour from './components/Hour';
import Topbar from '../../components/Topbar/Topbar';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuth, isLoading, token } = useSelector(state => state.auth);
  const hours = useSelector(state => state.hours)

  useEffect(() => { dispatch(getMyHours()) }, [])

  return (
    <div>
      <Topbar backButton={false} themeToggle={true} />
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {hours &&
      <Fragment>
        <h1 className='home-title'>Home</h1>
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
        <div className='category-title'><h2>My Hours</h2><Link to='/my-hours'>View All</Link></div>
        <ul className='box-background'>
          <li className='menu-item'>
            <Link to='/my-hours'><i className="green button-icon fas fa-check-square"></i>Approved</Link>
          </li>
          <li className='menu-item'>
            <Link to='/my-hours'><i className="orange button-icon fas fa-times-circle"></i>Pending</Link>
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
