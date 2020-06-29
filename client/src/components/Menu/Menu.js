import React, { Fragment } from 'react'
import './Menu.css';
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import MenuItem from './MenuItem';

export default function Menu({ options, isLoading }) {
  const { colors } = useSelector(state => state.theme)

  return (
    <ul className='box-background menu'>
      {isLoading && <Spinner padding={false} />}
      {!isLoading &&
      <Fragment>
        {options.map(option => <MenuItem option={option} key={option.icon} />)}
      </Fragment>}
    </ul>
  )
}
