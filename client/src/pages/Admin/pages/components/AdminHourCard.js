import React, { Fragment, useState } from 'react';
import './AdminHourCard.css';
import { useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner/Spinner';

export default function AdminHourCard({ details }) {
  const [isApproved, setIsApproved] = useState(details.approved)
  const { colors } = useSelector(state => state.theme)

  const avatarStyle = {
    border: colors.border
  }

  const boxStyle = {
    backgroundColor: colors.boxBackground
  }

  return (
    <Fragment>
      {details ?
      <div style={boxStyle} className='admin-card-container box-background'>
        <div className='admin-card-header'>
          <div className='name-and-avatar'>
            <img className='avatar' style={avatarStyle} src={details.user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU'} />
            <div><small>{details.user.firstName} {details.user.lastName}</small></div>
          </div>
          <small>{details.date}</small>
        </div>
        <div className='hours-and-description'>
          <p><b>Hours: </b>{details.hours}</p>
          <p><b>Description: </b>{details.description}</p>
        </div>
        <div className='admin-card-footer'>
          {!isApproved ?
          <button className='btn btn-primary' onClick={() => setIsApproved(!isApproved)}>Approve</button >:
          <button style={{width: '100%', margin: '.5rem 0'}} className='btn secondary-button' onClick={() => setIsApproved(!isApproved)}>Decline</button>}
        </div>
      </div>: <Spinner padding={true} />}
    </Fragment>
  )
}
