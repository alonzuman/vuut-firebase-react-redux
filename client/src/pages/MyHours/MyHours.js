import React, { useEffect, useState } from 'react'
import './MyHours.css'
import { useSelector, useDispatch } from 'react-redux';
import { getMyHours } from '../../actions';
import Hour from '../Home/components/Hour';
import Spinner from '../../components/Spinner/Spinner';
import Topbar from '../../components/Topbar/Topbar';

export default function MyHours() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { myHours, isLoading } = useSelector(state => state.hours);

  useEffect(() => { dispatch(getMyHours()) }, [])

  return (
    <div>
      <Topbar backButton={true} />
      <div className='page-header'>
        <h1>My Hours</h1>
        <button onClick={() => setIsEditing(!isEditing)} className='btn secondary-button'>{isEditing ? 'Close' : 'Edit'}</button>

      </div>
      {(myHours && !isLoading) ?
      <ul className='hours-grid'>{myHours.map(hour => <Hour isEditing={isEditing} hour={hour} key={Math.random()} />)}</ul>:
      <Spinner />}
    </div>
  )
}
