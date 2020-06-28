import React, { useEffect, useState, Fragment } from 'react'
import './MyHours.css'
import { useSelector, useDispatch } from 'react-redux';
import { getMyHours } from '../../actions';
import Hour from '../Home/components/Hour';
import Spinner from '../../components/Spinner/Spinner';
import Topbar from '../../components/Topbar/Topbar';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function MyHours() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { myHours, isLoading } = useSelector(state => state.hours);
  const { colors } = useSelector(state => state.theme);

  useEffect(() => {
    dispatch(getMyHours());
  }, [])

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers
  }

  return (
    <Fragment>
      <Topbar avatar={true}  backButton={true} />
      <Navbar />
      <div style={containerStyle} className='container'>
        <div className='page-header'>
          <h1>My Hours</h1>
          <button onClick={() => setIsEditing(!isEditing)} className='btn secondary-button'>{isEditing ? 'Close' : 'Edit'}</button>

        </div>
        {(myHours && !isLoading) ?
        <ul className='hours-grid'>{myHours.map(hour => <Hour isEditing={isEditing} hour={hour} key={Math.random()} />)}</ul>:
        <Spinner />}
        {!isLoading && myHours.length === 0 && <p>No hours yet, <Link to='/add'>add your first</Link></p>}
      </div>
    </Fragment>
  )
}
