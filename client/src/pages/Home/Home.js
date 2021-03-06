import React, { useEffect, Fragment } from 'react';
import './Home.css'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../actions';
import Topbar from '../../components/Topbar/Topbar';
import Navbar from '../../components/Navbar/Navbar';
import StatsBox from '../../components/Stats/StatsBox';
import Menu from '../../components/Menu/Menu';

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuth, token, user, isLoading } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;
  const { direction, translation } = useSelector(state => state.locale);

  useEffect(() => { dispatch(loadUser()) }, [])

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    direction
  }

  const option1 = {
    icon: 'green button-icon fas fa-check',
    label: translation.total,
    link: '/my-hours',
    stat: user.total,
    isFirst: true
  }

  const option2 = {
    icon: 'orange button-icon fas fa-hourglass',
    label: translation.pendingApproval,
    link: '/my-hours',
    stat: user.pending,
    isLast: true
  }

  const options = [
    option1,
    option2
  ]

  const stat1 = {
    stat: `${user.total} / 100`,
    label: translation.total
  }

  const stat2 = {
    stat: user.pending,
    label: translation.pendingApproval
  }

  const stats = [stat1, stat2]

  return (
    <div>
      <Topbar avatar={true} backButton={false} themeToggle={true} />
      <Navbar />
      {!auth.isLoading && !isAuth && !token && <Redirect to='/signin' />}
      <div style={containerStyle} className='container'>
        <h1 className='page-title'>{translation.home}</h1>
        <StatsBox stats={stats} isLoading={isLoading} />
        <div className='category-title'><h2>{translation.myHours}</h2><Link to='/my-hours'><button className='btn-secondary'>{translation.viewAll}</button></Link></div>
        <Menu isLoading={isLoading} options={options} />
      </div>
    </div>
  )
}
