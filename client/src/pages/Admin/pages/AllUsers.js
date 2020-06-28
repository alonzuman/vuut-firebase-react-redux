import React, { useEffect, Fragment } from 'react';
import UnapprovedUserCard from './components/UnapprovedUserCard';
import Topbar from '../../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUnapprovedUsers } from '../../../actions'
import Spinner from '../../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

export default function AllHours() {
  const { unapprovedUsers, isLoading } = useSelector(state => state.admin)
  const auth = useSelector(state => state.auth);
  const { colors } = useSelector(state => state.theme);
  const { token, isAuth, isAdmin } = auth;
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers
  }

  useEffect(() => { dispatch(getAllUnapprovedUsers()) }, [])

  return (
    <div>
      {!auth.isLoading && !isAdmin && !isAuth && !token && <Redirect to='/signin' />}
      <Navbar />
      <Topbar avatar={true}  backButton={true} />
      <div style={containerStyle} className='container'>
        <h1>New Users</h1>
        {isLoading && <Spinner />}
        {!isLoading &&
        <ul className='hours-grid'>
          {unapprovedUsers.map(x => <UnapprovedUserCard user={x.user} key={x.id} id={x.id}/>)}
          {unapprovedUsers.length === 0 && <p>No new users to approve</p>}
        </ul>}
      </div>
    </div>
  )
}
