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
  const { direction, translation } = useSelector(state => state.locale);

  useEffect(() => {
    dispatch(getMyHours());
  }, [])

  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    direction
  }

  return (
    <Fragment>
      <Topbar avatar={true}  backButton={true} />
      <Navbar />
      <div style={containerStyle} className='container'>
        <div className='page-header'>
          <h1>{translation.myHours}</h1>
          <button onClick={() => setIsEditing(!isEditing)} className='btn secondary-button'>{isEditing ? translation.close : translation.edit}</button>

        </div>
        {(myHours && !isLoading) ?
        <ul className='hours-grid'>{myHours.map(hour => <Hour isEditing={isEditing} hour={hour} key={Math.random()} />)}</ul>:
        <Spinner />}
        <br />
        {!isLoading && myHours.length === 0 && <p>{translation.noHoursYet}, <Link to='/add'>{translation.addYourHours}</Link></p>}
      </div>
    </Fragment>
  )
}
