import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getMyHours } from '../../actions';
import Hour from '../Home/components/Hour';
import Spinner from '../../components/Spinner/Spinner';
import BackButton from '../../components/BackButton';
import Topbar from '../../components/Topbar/Topbar';

export default function MyHours() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { myHours, isLoading } = useSelector(state => state.hours);

  useEffect(() => { dispatch(getMyHours()) }, [])

  return (
    <div>
      <Topbar backButton={true} />
      <h1>My Hours</h1>
      {(myHours && !isLoading) ?
      <ul>{myHours.map(hour => <Hour hour={hour} key={Math.random()} />)}</ul>:
      <Spinner />}
    </div>
  )
}
