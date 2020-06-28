import React, { Fragment } from 'react'
import './Menu.css';
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import MenuItem from './MenuItem';

export default function Menu({ options, isLoading }) {
  const { colors } = useSelector(state => state.theme)

  const style = {
    backgroundColor: colors.boxBackground,
    padding: '1rem 0'
  }

  return (
    <ul className='box-background menu' style={style}>
      {isLoading && <Spinner padding={false} />}
      {!isLoading &&
      <Fragment>
        {options.map(option => <MenuItem option={option} key={option.icon} />)}
      </Fragment>}
    </ul>
  )
}
