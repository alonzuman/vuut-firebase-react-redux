import React, { useEffect, Fragment } from 'react';
import UnapprovedUserCard from './components/UnapprovedUserCard';
import Topbar from '../../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUnapprovedUsers } from '../../../actions'
import Spinner from '../../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

export default function AllHours() {
  const { unapprovedUsers, isLoading } = useSelector(state => state.admin)
  const auth = useSelector(state => state.auth);
  const { isAdmin } = auth;
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getAllUnapprovedUsers()) }, [])

  return (
    <div>
      {!auth.isLoading && !isAdmin && <Redirect to='/signin' />}
      <Topbar avatar={true}  backButton={true} />
      <h1>New Users</h1>
      {isLoading && <Spinner />}
      {!isLoading &&
      <ul className='hours-grid'>
        {unapprovedUsers.map(x => <UnapprovedUserCard user={x.user} key={x.id} id={x.id}/>)}
      </ul>}
    </div>
  )
}
