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

  const infoStyle = {
    margin: direction === 'rtl' ? '0 0 1rem 1rem' : '0 1rem 1rem 0'
  }

  return (
    <div style={boxStyle} className='admin-card-container box-background'>
      {!details && <Spinner />}
      {details && <Fragment>
        <div className='admin-card-content'>
          <div className='name-and-avatar'>
            <img className='avatar' style={avatarStyle} src={details.user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU'} />
            <div><small>{details.user.firstName} {details.user.lastName}</small></div>
          </div>
          <div className='hours-and-description'>
            <div className='admin-card-column' style={{direction}}>
              <div style={infoStyle}>
                <small><b>{translation.startTime}</b></small>
                <p>{details.startDate}</p>
              </div>
              <div style={infoStyle}>
                <small><b>{translation.endTime}</b></small>
                <p>{details.endDate}</p>
              </div>
            </div>
            <div className='admin-card-column' style={{ direction }}>
              <div style={infoStyle}>
                <p><b>{translation.description}</b></p>
                <p>{details.description}</p>
              </div>
            </div>
          </div>
        </div>
        {!isApproved ?
        <button className='btn btn-primary' onClick={handleApprove}>{translation.approve}</button >:
          <button style={{ width: '100%', margin: '.5rem 0', height: '34px' }} className='btn btn-secondary' onClick={handleUnapprove}>{translation.decline}</button>}
      </Fragment>}
    </div>
  )
}
