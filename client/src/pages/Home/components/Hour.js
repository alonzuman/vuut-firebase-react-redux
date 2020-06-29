import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHour } from '../../../actions';
import ApprovalPopup from '../../../components/ApprovalPopup/ApprovalPopup';
import './Hour.css';
import Spinner from '../../../components/Spinner/Spinner';

export default function Hour({ hour, isEditing }) {
  const theme = useSelector(state => state.theme);
  const { direction, translation } = useSelector(state => state.locale);
  const { colors } = theme;
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, id } = hour;

  const hourStyle = {
    backgroundColor: colors.boxBackground,
    margin: 0,
    direction
  }

  const iconStyle = {
    fontSize: '1.5rem',
    margin: 0
  }

  const infoStyle = {
    margin: direction === 'rtl' ? '0 0 1rem 1rem' : '0 1rem 1rem 0',
    textAlign: 'center'
  }

  return (
    <Fragment>
      {!hour && <Spinner />}
      {data && <div style={hourStyle} className='card-container box-background hour-card'>
        {isDeleting && <ApprovalPopup approve={() => dispatch(deleteHour({id, hours: data.hours}))} cancel={() => setIsDeleting(false)} />}
          <div>
            <div className='admin-card-column' style={{ direction }}>
              <div style={infoStyle}>
                <small><b>{translation.startTime}</b></small><br />
                <small>{data.startDate}</small>
              </div>
              <div style={infoStyle}>
                <small><b>{translation.hours}</b></small><br />
                <small>{data.hours}</small>
              </div>
            </div>
            <div className='admin-card-column' style={{ direction }}>
              <div style={infoStyle}>
                <small><b>{translation.description}</b></small>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
          {isEditing ?
            <i onClick={() => setIsDeleting(true)} style={{ color: 'rgb(255, 69, 58)', fontSize: '1.3rem'}} className="fas fa-trash"></i>:
          !data.approved ? <i style={iconStyle} className="orange button-icon fas fa-hourglass"></i> : <i style={iconStyle} className="green button-icon fas fa-check"></i>}
        </div>}
    </Fragment>
  )
}
