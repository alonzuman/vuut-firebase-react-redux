import React, { useEffect, Fragment } from 'react';
import AdminHourCard from './components/AdminHourCard';
import Topbar from '../../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHours } from '../../../actions';
import Spinner from '../../../components/Spinner/Spinner';

export default function AllHours() {
  const { allHours } = useSelector(state => state.admin)
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getAllHours()) }, [])

  return (
    <div>
      <Topbar backButton={true} />
      <h1>All Hours</h1>
      <ul className='hours-grid' style={{marginTop: '1rem'}}>
        <Fragment>
          {allHours ? allHours.map(hour => <AdminHourCard details={hour.details} key={hour.id} />) : <Spinner padding={true}/>}
        </Fragment>
      </ul>
    </div>
  )
}
