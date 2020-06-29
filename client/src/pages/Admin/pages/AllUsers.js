import React, { useEffect, Fragment, useState } from 'react';
import './AllUsers.css';
import Topbar from '../../../components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { queryUsers } from '../../../actions'
import Spinner from '../../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import UsersList from './components/UsersList';

export default function AllUsers() {
  const [tab, setTab] = useState('all');
  const { isLoading } = useSelector(state => state.admin)
  const auth = useSelector(state => state.auth);
  const { colors } = useSelector(state => state.theme);
  const { token, isAuth, isAdmin } = auth;
  const { direction, translation } = useSelector(state => state.locale);

  const dispatch = useDispatch();

  const handleChange = (newTab) => {
    setTab(newTab);
    dispatch(queryUsers(newTab));
  }


  useEffect(() => { dispatch(queryUsers(tab)) }, [])

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    direction
  }

  return (
    <div>
      {!auth.isLoading && !isAdmin && !isAuth && !token && <Redirect to='/signin' />}
      <Navbar />
      <Topbar avatar={true}  backButton={true} />
      <div style={containerStyle} className='container'>
        <h1>{translation.usersManagement}</h1>
        <button className={`tab`} onClick={() => handleChange('all')}>{translation.all}</button>
        <button className={`tab`} onClick={() => handleChange('unapproved')}>{translation.pendingApproval}</button>
        {isLoading && <Spinner />}
        {!isLoading && <UsersList type={tab} />}
      </div>
    </div>
  )
}
