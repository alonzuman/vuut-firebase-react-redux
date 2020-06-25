import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/auth';
import Spinner from '../../components/Spinner/Spinner';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch()
  const { isLoading, isAuth } = useSelector(state => state.auth)

  const handleSignin = async e => {
    e.preventDefault()
    const newUser = { email, password, confirmPassword }
    dispatch(signup(newUser));
  }

  return (
    <div>
      {isAuth && <Redirect to='/' />}
      {isLoading && <Spinner />}
      {!isLoading &&
      <Fragment>
        <form onSubmit={handleSignin}>
        <h1 style={{marginBottom: '1rem'}}>Sign Up</h1>
        <div className='form-group'>
          <label>Email Address</label>
          <input required placeholder='johndoe@gmail.com' className='form-control' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input required placeholder='••••••••' className='form-control' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <input required placeholder='••••••••' className='form-control' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <button className='btn btn-primary'>Sign In</button>
        <p style={{marginTop: '1rem'}}>Already have an account? <Link to='/signin'>Sign in</Link></p>
        </form>
      </Fragment>}
    </div>
  )
}
