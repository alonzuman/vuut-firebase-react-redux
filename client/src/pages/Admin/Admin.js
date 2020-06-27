import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link, Redirect } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHours } from '../../actions';

export default function Admin() {
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.theme)
  const { isAdmin, token } = useSelector(state => state.auth)
  const { total, isLoading , pending, allHours } = useSelector(state => state.admin)

  const boxStyle = {
    backgroundColor: colors.boxBackground,
  }

  useEffect(() => {
    dispatch(getAllHours());
  }, [])

  return (
    <div>
      <Topbar avatar={true}  themeToggle={true}/>
      <h1 className='home-title'>Admin Page</h1>
      {!token && <Redirect to='/signin' />}
      {!isLoading && !isAdmin && !allHours && <Redirect to='/' />}
      <Fragment>
        <div className='category-title'><h2>Hours</h2><Link to='/admin/all-hours'><button className='secondary-button'>View All</button></Link></div>
        <ul className='stats-list box-background' style={boxStyle}>
            {isLoading &&  <Spinner />}
            {!isLoading && <Fragment>
              <li className='stats-item'>
                <h1>{total}</h1>
                <p className='stats-label'>Total</p>
              </li>
              <li className='stats-item'>
                <h1>{pending}</h1>
                <p className='stats-label'>Pending Approval</p>
              </li>
            </Fragment>}
        </ul>
        <div className='category-title'><h2>Users</h2><Link to='/admin/all-users'><button className='secondary-button'>View All</button></Link></div>
        <ul className='stats-list box-background' style={boxStyle}>
          <li className='stats-item'>
            <h1>237</h1>
            <p className='stats-label'>Total</p>
          </li>
          <li className='stats-item'>
            <h1>540</h1>
            <p className='stats-label'>Pending Approval</p>
          </li>
        </ul>
      </Fragment>
    </div>
  )
}
