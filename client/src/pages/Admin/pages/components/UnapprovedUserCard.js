import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveUser, unapproveUser } from '../../../../actions/admin';

export default function UnapprovedUserCard({ user, id }) {
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState(false);
  const { firstName, lastName, avatar, dateCreated } = user;
  const { colors } = useSelector(state => state.theme);

  const handleApprove = () => {
    dispatch(approveUser(id));
  }

  const handleUnapprove = () => {
    dispatch(unapproveUser(id));
  }

  const boxStyle = {
    backgroundColor: colors.boxBackground
  }

  return (
    <div style={boxStyle} className='card-container box-background'>
      <div style={{marginBottom: 0}} className='card-header'>
        <div className='name-and-avatar'>
          <img className='avatar medium' src={avatar ? avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU'} />
          <p>{firstName} {lastName}</p>
        </div>
        <div><small>{dateCreated}</small></div>
      </div>
      {isApproved ? <button style={{margin: 0}} className='btn secondary-button' onClick={handleUnapprove}>Unapprove</button> : <button style={{margin: 0}} className='btn btn-primary' onClick={handleApprove}>Approve</button>}
    </div>
  )
}
