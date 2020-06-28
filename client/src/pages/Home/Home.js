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

  useEffect(() => { dispatch(loadUser()) }, [])

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
  }

  const option1 = {
    icon: 'green button-icon fas fa-check',
    label: 'total',
    link: '/my-hours',
    stat: user.total,
    border: true
  }

  const option2 = {
    icon: 'orange button-icon fas fa-hourglass',
    label: 'pending',
    link: '/my-hours',
    stat: user.pending,
    border: false
  }

  const options = [
    option1,
    option2
  ]

  const stat1 = {
    stat: `${user.total} / 100`,
    label: 'Total'
  }

  const stat2 = {
    stat: user.pending,
    label: 'Pending Approval'
  }

  const stats = [stat1, stat2]

  return (
    <div>
      <Topbar avatar={true} backButton={false} themeToggle={true} />
      <Navbar />
      {!auth.isLoading && !isAuth && !token && <Redirect to='/signin' />}
      <div style={containerStyle} className='container'>
        <h1 className='home-title'>Home</h1>
        <StatsBox stats={stats} isLoading={isLoading} />
        <div className='category-title'><h2>My Hours</h2><Link to='/my-hours'><button className='secondary-button'>View All</button></Link></div>
        <Menu isLoading={isLoading} options={options} />
      </div>
    </div>
  )
}
