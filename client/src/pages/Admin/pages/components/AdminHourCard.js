import React, { Fragment, useState } from 'react';
import './AdminHourCard.css';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../../../components/Spinner/Spinner';
import { approveHour, unapproveHour } from '../../../../actions/admin';

export default function AdminHourCard({ details, id }) {
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState(details.approved)
  const { colors } = useSelector(state => state.theme);
  const { direction, translation } = useSelector(state => state.locale);

  const avatarStyle = {
    border: colors.border
  }

  const boxStyle = {
    backgroundColor: colors.boxBackground,
    direction: 'ltr'
  }

  const handleApprove = () => {
    setIsApproved(true);
    dispatch(approveHour(id, details.hours))
  }

  const handleUnapprove = () => {
    setIsApproved(false);
    dispatch(unapproveHour(id, details.hours))
  }

  return (
    <div style={boxStyle} className='admin-card-container box-background'>
      {!details && <Spinner />}
      {details && <Fragment>
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
          <button className='btn btn-primary' onClick={handleApprove}>Approve</button >:
          <button style={{width: '100%', margin: '.5rem 0', height: '34px'}} className='btn secondary-button' onClick={handleUnapprove}>Decline</button>}
        </div>
      </Fragment>}
    </div>
  )
}
