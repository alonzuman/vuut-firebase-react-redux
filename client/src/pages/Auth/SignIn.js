import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Link, Redirect } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const { isAuth, isLoading } = useSelector(state => state.auth);

  const handleSignin = async () => {
    const user = { email, password }
    dispatch(signin(user))
  }

  return (
    <div>
      {isAuth && <Redirect to='/' />}
      {isLoading && <Spinner />}
      <h1>Sign In</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input placeholder='johndoe@gmail.com' className='form-control' type='email' value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input placeholder='••••••••' className='form-control' type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className='btn btn-primary' onClick={handleSignin}>Sign In</button>
      <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
    </div>
  )
}
