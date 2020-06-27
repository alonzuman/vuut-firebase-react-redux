import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link, Redirect } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHours } from '../../actions';

export default function Admin() {
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.theme)
  const { isAdmin } = useSelector(state => state.auth)
  const { total, isLoading , pending, allHours } = useSelector(state => state.admin)

  const boxStyle = {
    backgroundColor: colors.boxBackground,
  }

  useEffect(() => {
    dispatch(getAllHours());
  }, [])

  return (
    <div>
      <Topbar themeToggle={true}/>
      <h1 className='home-title'>Admin Page</h1>
      {!isLoading && !isAdmin && !allHours && <Redirect to='/' />}
      <Fragment>
        <ul className='stats-list box-background' style={boxStyle}>
            {!total && !pending && <Spinner />}
            {total && pending && <Fragment>
              <li className='stats-item'>
                <h1>{total}</h1>
                <p className='stats-label'>Total Hours</p>
              </li>
              <li className='stats-item'>
                <h1>{pending}</h1>
                <p className='stats-label'>Pending</p>
              </li>
            </Fragment>}
        </ul>
        <div className='category-title'><h2>All Hours</h2><Link to='/admin/all-hours'><button className='secondary-button'>View All</button></Link></div>
      </Fragment>
    </div>
  )
}
