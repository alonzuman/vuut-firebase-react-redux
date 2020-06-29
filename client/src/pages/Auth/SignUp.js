import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/auth';
import Spinner from '../../components/Spinner/Spinner';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch()
  const { direction, translation } = useSelector(state => state.locale);
  const { isLoading, isAuth } = useSelector(state => state.auth)
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const handleSignin = async e => {
    e.preventDefault()
    const newUser = { email, password, confirmPassword, firstName, lastName }
    dispatch(signup(newUser));
  }

  const inputStyle = {
    backgroundColor: colors.background,
    border: colors.border
  }


  const containerStyle = {
    backgroundColor: colors.backgroundDark,
    color: colors.headers,
    direction
  }

  return (
    <div style={containerStyle} className='container'>
      {isAuth && <Redirect to='/' />}
      {isLoading && <Spinner />}
      {!isLoading &&
      <Fragment>
        <form onSubmit={handleSignin}>
        <h1 style={{marginBottom: '1rem'}}>{translation.signUp}</h1>
        <div className='form-group'>
          <label>{translation.emailAddress}</label>
          <input style={inputStyle} required placeholder='johndoe@gmail.com' className='form-control' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>{translation.firstName}</label>
          <input style={inputStyle} required placeholder='John' className='form-control' type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>{translation.lastName}</label>
          <input style={inputStyle} required placeholder='Doe' className='form-control' type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>{translation.password}</label>
          <input style={inputStyle} required placeholder='••••••' className='form-control' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>{translation.confirmPassword}</label>
          <input style={inputStyle} required placeholder='••••••' className='form-control' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <button className='btn btn-primary'>{translation.signUp}</button>
        <p style={{marginTop: '1rem'}}>{translation.alreadyHaveAnAccount}? <Link to='/signin'>{translation.signIn}</Link></p>
        </form>
      </Fragment>}
    </div>
  )
}
