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

  const handleSignin = async e => {
    e.preventDefault()
    const user = { email, password }
    localStorage.removeItem('token');
    dispatch(signin(user));
  }

  return (
    <form onSubmit={handleSignin}>
      {isAuth && <Redirect to='/' />}
      {isLoading && <Spinner />}
      <h1>Sign In</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input required placeholder='johndoe@gmail.com' className='form-control' type='email' value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input required placeholder='••••••••' className='form-control' type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className='btn btn-primary'>Sign In</button>
      <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
    </form>
  )
}
