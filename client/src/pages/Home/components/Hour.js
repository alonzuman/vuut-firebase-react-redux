import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHour } from '../../../actions';
import ApprovalPopup from '../../../components/ApprovalPopup/ApprovalPopup';
import './Hour.css';
import Spinner from '../../../components/Spinner/Spinner';

export default function Hour({ hour, isEditing }) {
  const theme = useSelector(state => state.theme);
  const { colors } = theme;
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const hourStyle = {
    backgroundColor: colors.boxBackground
  }

  return (
    <Fragment>
      {!hour && <Spinner />}
      {hour.data && <div style={hourStyle} className='hour-container box-background'>
        {isDeleting && <ApprovalPopup approve={() => dispatch(deleteHour(hour.id))} cancel={() => setIsDeleting(false)} />}
        <div style={{ direction: 'ltr' }} className='hour-header'>
          <h1>{hour.data.description}</h1>
          <small>{hour.data.date}</small>
        </div>
        <div className='hour-footer'>
          <p>Total: {hour.data.hours}</p>
          {isEditing ?
            <i onClick={() => setIsDeleting(true)} style={{ color: 'rgb(255, 69, 58)', fontSize: '1.3rem'}} className="fas fa-trash"></i>:
          !hour.data.approved ? <i className="orange button-icon fas fa-hourglass"></i> : <i className="green button-icon fas fa-check"></i>}
        </div>
      </div>}
    </Fragment>
  )
}
