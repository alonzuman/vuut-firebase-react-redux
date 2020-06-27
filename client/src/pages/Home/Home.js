import React, { useEffect, Fragment } from 'react';
import './Home.css'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import Hour from './components/Hour';
import Topbar from '../../components/Topbar/Topbar';

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuth, token, user, isLoading } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;
  const hours = useSelector(state => state.hours)
  // const { myHours } = hours;

  useEffect(() => { dispatch(loadUser()) }, [])

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
      <Topbar avatar={true} backButton={false} themeToggle={true} />
      {!auth.isLoading && !isAuth && !token && <Redirect to='/signin' />}
      {hours &&
      <Fragment>
        <h1 className='home-title'>Home</h1>
        <ul className='stats-list box-background' style={boxStyle}>
          {isLoading && <Spinner padding={false} />}
          {!isLoading  &&
          <Fragment>
            <li className='stats-item'>
              <h1>{user.total ? user.total : '0'} / 100</h1>
              <p className='stats-label'>Total Hours</p>
            </li>
            <li className='stats-item'>
              <h1>{user.pending ? user.pending : '0'}</h1>
              <p className='stats-label'>Pending</p>
            </li>
          </Fragment>}
        </ul>
        <div className='category-title'><h2>My Hours</h2><Link to='/my-hours'><button className='secondary-button'>View All</button></Link></div>
        <ul className='box-background' style={boxStyle}>
          {isLoading && <Spinner padding={true}/>}
          {!isLoading && <Fragment>
            <li className='menu-item' style={menuItemStyle}>
              <Link className='menu-bar' style={linkColor} to='/my-hours'><div><i className="green button-icon fas fa-check"></i>total </div><span>{user.total ? user.total : '0'}</span></Link>
            </li>
            <li className='menu-item' style={menuItemStyle}>
              <Link className='menu-bar' style={linkColor} to='/my-hours'><div><i className="orange button-icon fas fa-hourglass"></i>Pending </div><span>{user.pending ? user.pending : '0'}</span></Link>
            </li>
          </Fragment>}
        </ul>
        {/* <div className='category-title'><h2>Recent</h2></div> */}
        {/* TODO add latest volunteering */}
        {/* <ul>
          {isLoading && <div style={boxStyle} className='box-background'><Spinner padding={true}/></div>}
          {!isLoading && !myHours[0] && <div style={boxStyle} className='box-background'><p style={{ padding: '1rem' }}>No hours yet, <Link to='/add'>list your first hours</Link></p></div>}
          {!isLoading && myHours[0] && <Hour hour={myHours[0]} />}
        </ul> */}
      </Fragment>}
    </div>
  )
}
