import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin, loadUser } from '../../actions';
import Spinner from '../../components/Spinner/Spinner';
import { Link, Redirect } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const { isAuth, isLoading } = useSelector(state => state.auth);
  const { direction, translation } = useSelector(state => state.locale);
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  const handleSignin = async e => {
    e.preventDefault()
    const user = { email, password }
    localStorage.removeItem('token');
    dispatch(signin(user));
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
      {!isLoading && !isAuth &&
      <div>
        <form onSubmit={handleSignin}>
          <h1 style={{ marginBottom: '1rem' }}>{translation.signIn}</h1>
          <div className='form-group'>
            <label>{translation.emailAddress}</label>
            <input style={inputStyle} required placeholder='johndoe@gmail.com' className='form-control' type='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='form-group'>
            <label>{translation.password}</label>
            <input style={inputStyle} required placeholder='••••••••' className='form-control' type='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className='btn btn-primary'>{translation.signIn}</button>
          <p style={{marginTop: '1rem'}}>{translation.dontHaveAnAccount}? <Link to='/signup'>{translation.signUp}</Link></p>
        </form>
        </div>}
    </div>
  )
}
