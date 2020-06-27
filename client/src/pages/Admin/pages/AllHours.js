import React, { useEffect, Fragment } from 'react';
import AdminHourCard from './components/AdminHourCard';
import Topbar from '../../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHours } from '../../../actions';
import Spinner from '../../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

export default function AllHours() {
  const { allHours, isLoading } = useSelector(state => state.admin)
  const auth = useSelector(state => state.auth);
  const { isAuth, isAdmin } = auth;
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getAllHours()) }, [])

  return (
    <div>
      <Topbar avatar={true}  backButton={true} />
      {!auth.isLoading && !isAdmin && <Redirect to='/signin' />}
      <h1>All Hours</h1>
      <ul className='hours-grid' style={{marginTop: '1rem'}}>
        {isLoading && <Spinner />}
        {!isLoading && <Fragment>
          {allHours ? allHours.map(hour => <AdminHourCard details={hour.details} id={hour.id} key={hour.id} />) : <Spinner padding={true}/>}
        </Fragment>}
      </ul>
    </div>
  )
}
