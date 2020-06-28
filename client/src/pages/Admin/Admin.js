import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link, Redirect } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUnapprovedHours, getAllUnapprovedUsers } from '../../actions';
import Navbar from '../../components/Navbar/Navbar';
import StatsBox from '../../components/Stats/StatsBox';

export default function Admin() {
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.theme)
  const { isAdmin, token } = useSelector(state => state.auth)
  const { total, isLoading, pending, allHours, unapprovedUsers, approvedUsers } = useSelector(state => state.admin)

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
  }

  useEffect(() => {
    dispatch(getAllUnapprovedHours());
  }, [])

  const stat1 = {
    stat: total,
    label: 'Total'
  }

  const stat2 = {
    stat: pending,
    label: 'Pending'
  }

  const hoursStats = [
    stat1, stat2
  ]

  const stat3 = {
    stat: approvedUsers.length,
    label: 'Total'
  }

  const stat4 = {
    stat: unapprovedUsers.length,
    label: 'Pending'
  }

  const userStats = [
    stat3,
    stat4
  ]

  return (
    <Fragment>
      <Topbar avatar={true}  themeToggle={true}/>
      <Navbar />
    <div style={containerStyle} className='container'>
      <h1 className='home-title'>Admin Dashboard</h1>
      {!token && <Redirect to='/signin' />}
      {!isLoading && !isAdmin && !allHours && <Redirect to='/' />}
      <div className='category-title'><h2>Hours</h2><Link to='/admin/all-hours'><button className='secondary-button'>View All</button></Link></div>
      <StatsBox stats={hoursStats} isLoading={isLoading} />
      <div className='category-title'><h2>Users</h2><Link to='/admin/all-users'><button className='secondary-button'>View All</button></Link></div>
      <StatsBox stats={userStats} isLoading={isLoading} />
    </div>
    </Fragment>
  )
}
