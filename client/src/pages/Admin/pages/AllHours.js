import React, { useEffect, Fragment } from 'react';
import AdminHourCard from './components/AdminHourCard';
import Topbar from '../../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUnapprovedHours } from '../../../actions';
import Spinner from '../../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

export default function AllHours() {
  const { allHours, isLoading } = useSelector(state => state.admin)
  const auth = useSelector(state => state.auth);
  const { token, isAuth, isAdmin } = auth;
  const { colors } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers
  }

  useEffect(() => { dispatch(getAllUnapprovedHours()) }, [])

  return (
    <div>
      <Topbar avatar={true}  backButton={true} />
      <Navbar />
      {!auth.isLoading && !isAdmin && !isAuth && !token && <Redirect to='/signin' />}
      <div style={containerStyle} className='container'>
        <h1>All Hours</h1>
        <ul className='hours-grid' style={{marginTop: '1rem'}}>
          {isLoading && <Spinner />}
          {!isLoading && <Fragment>
            {allHours ? allHours.map(hour => <AdminHourCard details={hour.details} id={hour.id} key={hour.id} />) : <Spinner padding={true}/>}
            {allHours.length === 0 && <p>No hours submitted yet</p>}
          </Fragment>}
        </ul>
      </div>
    </div>
  )
}
