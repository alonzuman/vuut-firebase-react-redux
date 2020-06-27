import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveUser, unapproveUser } from '../../../../actions/admin';

export default function UnapprovedUserCard({ user, id }) {
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState(false);
  const { firstName, lastName, avatar } = user;

  const handleApprove = () => {
    // setIsApproved(true);
    dispatch(approveUser(id));
  }

  const handleUnapprove = () => {
    dispatch(unapproveUser(id));
  }

  return (
    <div>
      <img className='avatar' src={avatar ? avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU'} />
      {firstName}
      {lastName}
      {isApproved ? <button className='btn secondary-button' onClick={handleUnapprove}>Unapprove</button> : <button className='btn btn-primary' onClick={handleApprove}>Approve</button>}
    </div>
  )
}
