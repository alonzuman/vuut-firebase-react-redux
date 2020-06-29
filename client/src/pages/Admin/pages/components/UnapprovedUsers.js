import React from 'react';
import UnapprovedUserCard from '../components/UnapprovedUserCard';
import { useSelector } from 'react-redux';

export default function UnapprovedUsers() {
  const { unapprovedUsers, isLoading } = useSelector(state => state.admin)

  return (
    <div>
      {!isLoading &&
        <ul className='hours-grid'>
          {unapprovedUsers.map(x => <UnapprovedUserCard user={x.user} key={x.id} id={x.id} />)}
          {unapprovedUsers.length === 0 && <p>No new users to approve</p>}
        </ul>}
    </div>
  )
}
