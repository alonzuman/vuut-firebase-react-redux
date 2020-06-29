import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUnapprovedHours } from '../../actions';
import Navbar from '../../components/Navbar/Navbar';
import StatsBox from '../../components/Stats/StatsBox';

export default function Admin() {
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.theme)
  const { isAdmin, token } = useSelector(state => state.auth)
  const { total, isLoading, pending, allHours } = useSelector(state => state.admin)
  const { direction, translation } = useSelector(state => state.locale);

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    direction
  }

  useEffect(() => {
    dispatch(getAllUnapprovedHours());
  }, [])

  const stat1 = {
    stat: total,
    label: translation.total
  }

  const stat2 = {
    stat: pending,
    label: translation.pendingApproval
  }

  const hoursStats = [
    stat1, stat2
  ]

  const stat3 = {
    stat: 220,
    label: translation.total
  }

  const stat4 = {
    // stat: users.length,
    stat: 238,
    label: translation.pendingApproval
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
      <h1 className='page-title'>{translation.adminPanel}</h1>
      {!token && <Redirect to='/signin' />}
      {!isLoading && !isAdmin && !allHours && <Redirect to='/' />}
      <div className='category-title'><h2>{translation.hours}</h2><Link to='/admin/all-hours'><button className='btn-secondary'>{translation.viewAll}</button></Link></div>
      <StatsBox stats={hoursStats} isLoading={isLoading} />
      <div className='category-title'><h2>{translation.users}</h2><Link to='/admin/all-users'><button className='btn-secondary'>{translation.viewAll}</button></Link></div>
      <StatsBox stats={userStats} isLoading={isLoading} />
    </div>
    </Fragment>
  )
}
