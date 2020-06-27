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
  const theme = useSelector(state => state.theme);
  const { colors } = theme;
  const hours = useSelector(state => state.hours)

  useEffect(() => { dispatch(getMyHours()) }, [])

  const boxStyle = {
    backgroundColor: colors.boxBackground
  }

  const menuItemStyle = {
    backgroundColor: colors.boxBackground,
    color: colors.text,
    borderBottom: colors.border
  }

  const linkColor = {
    color: colors.text
  }

  return (
    <div>
      <Topbar backButton={false} themeToggle={true} />
      {!isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {hours &&
      <Fragment>
        <h1 className='home-title'>Home</h1>
        <ul className='stats-list box-background' style={boxStyle}>
          {isLoading && <Spinner padding={false} />}
          {!isLoading &&
          <Fragment>
            <li className='stats-item'>
              <h1>{hours.total}</h1>
              <p className='stats-label'>Total Hours</p>
            </li>
            <li className='stats-item'>
              <h1>{hours.pending}</h1>
              <p className='stats-label'>Pending</p>
            </li>
            <li className='stats-item'>
              <h1>{hours.approved}</h1>
              <p className='stats-label'>Approved</p>
            </li>
          </Fragment>}
        </ul>
        <div className='category-title'><h2>My Hours</h2><Link to='/my-hours'><button className='secondary-button'>View All</button></Link></div>
        <ul className='box-background' style={boxStyle}>
          <li className='menu-item' style={menuItemStyle}>
            <Link style={linkColor} to='/my-hours'><i className="green button-icon fas fa-check"></i>Approved</Link>
          </li>
          <li className='menu-item' style={menuItemStyle}>
            <Link style={linkColor} to='/my-hours'><i className="orange button-icon fas fa-hourglass"></i>Pending</Link>
          </li>
        </ul>
        <div className='category-title'><h2>Recent</h2></div>
        <ul>
          {!hours.myHours[0] ? <div style={boxStyle} className='box-background'><Spinner padding={true} /></div> : <Hour hour={hours.myHours[0]} />}
        </ul>
      </Fragment>}
    </div>
  )
}
