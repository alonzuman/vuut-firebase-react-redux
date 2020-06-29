import React, { Fragment } from 'react';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';

export default function UsersList() {
  const { isLoading, users } = useSelector(state => state.admin);

  return (
      <Fragment>
        {!isLoading &&
          <ul className='hours-grid'>
            {users.map(user => <UserCard user={user.details} key={user.id} />)}
          </ul>}
      </Fragment>
  )
}
