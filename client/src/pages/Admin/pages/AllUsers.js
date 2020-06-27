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
      <h1>All Users</h1>
      <p>All users page</p>
    </div>
  )
}
