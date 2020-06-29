import React, { useState } from 'react';
import './UserCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { approveUser, unapproveUser } from '../../../../actions';
import StatsBox from '../../../../components/Stats/StatsBox';

export default function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(user.isApproved);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.theme);
  const { translation } = useSelector(state => state.locale);

  const handleClick = () => {
    setIsApproved(!isApproved);
    isApproved ?
    dispatch(unapproveUser(user.userId)):
    dispatch(approveUser(user.userId))
  }

  const cardStyle = {
    backgroundColor: colors.background
  }

  const stat1 = {
    stat: user.total,
    label: translation.total
  }

  const stat2 = {
    stat: user.pending,
    label: translation.pendingApproval
  }

  const stats = [stat1, stat2]

  return (
    <div style={cardStyle} className='user-card'>
      <div className='user-card-header'>
        <div className='avatar-and-name'>
          <img className='avatar' src={user.avatar ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZQskwLv2d6lQtlyiij1TJo9AKcNQFM3juig&usqp=CAU'} />
          <div><small><b>{user.firstName}</b></small></div>
          <div><small><b>{user.lastName}</b></small></div>
        </div>
        <StatsBox stats={stats} />
      </div>
      <div className='user-card-footer'>
        {isOpen &&
        <div>
          {isApproved && !isAdmin && <button className='btn btn-primary'>Make Admin</button>}
          {isApproved ?
            <button style={{ margin: '2px 0' }} className='btn btn-secondary' onClick={handleClick}>Unapprove</button> :
            <button className='btn btn-primary' onClick={handleClick}>Approve</button>}
        </div>}
        <div className='user-card-footer'>
          {isOpen ? <button onClick={() => setIsOpen(!isOpen)} className='btn' style={{ marginTop: '1rem' }}><i class="fas fa-chevron-up"></i></button> : <button onClick={() => setIsOpen(!isOpen)} className='btn' style={{ marginTop: '1rem' }}><i className="fas fa-chevron-down"></i></button>}
        </div>
      </div>
    </div>
  )
}
