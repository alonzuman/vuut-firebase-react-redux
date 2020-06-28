import React, { Fragment } from 'react';
import './StatsBox.css'
import Spinner from '../Spinner/Spinner';
import { useSelector } from 'react-redux';
import StatItem from './StatItem';

export default function StatsBox({ stats, isLoading }) {
  const { colors } = useSelector(state => state.theme)

  const style = {
    backgroundColor: colors.boxBackground,
  }

  return (
    <ul className='stats-list box-background' style={style}>
      {isLoading && <Spinner padding={false} />}
      {!isLoading &&
        <Fragment>
          {stats.map(stat => <StatItem stat={stat.stat} label={stat.label} key={stat.label} />)}
        </Fragment>}
    </ul>
  )
}
