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

  const hourStyle = {
    backgroundColor: colors.boxBackground,
    direction
  }

  const detailsStyle = {
    margin: direction === 'rtl' ? '0 0 0 1rem' : '0 1rem 0 0'
  }

  const iconStyle = {
    fontSize: '1.5rem',
    margin: 0
  }

  return (
    <Fragment>
      {!hour && <Spinner />}
      {hour.data && <div style={hourStyle} className='card-container box-background hour-card'>
        {isDeleting && <ApprovalPopup approve={() => dispatch(deleteHour({id: hour.id, hours: hour.data.hours}))} cancel={() => setIsDeleting(false)} />}
          <div className='hour-card-desc-dates'>
            <div style={detailsStyle} className='hour-card-dates'>
              <p><b>{translation.startTime}</b></p>
              <p>Something</p>
              <p><b>{translation.endTime}</b></p>
              <p>Something</p>
            </div>
          <div style={detailsStyle} className='hour-card-desc'>
              <p><b>{translation.description}</b></p>
              <p>{hour.data.description}</p>
            </div>
          </div>
          {isEditing ?
            <i onClick={() => setIsDeleting(true)} style={{ color: 'rgb(255, 69, 58)', fontSize: '1.3rem'}} className="fas fa-trash"></i>:
          !hour.data.approved ? <i style={iconStyle} className="orange button-icon fas fa-hourglass"></i> : <i style={iconStyle} className="green button-icon fas fa-check"></i>}
        </div>}
    </Fragment>
  )
}
