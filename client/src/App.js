import React, { useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Notifications from './pages/Notifications/Notifications';

// Components
import Navbar from './components/Navbar/Navbar';

// Redux
import Profile from './pages/Profile/Profile';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  return (
      <Router>
        <Navbar />
        <Switch>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/add' component={Add} />
            <Route path='/notifications' component={Notifications} />
            <Route path='/profile' component={Profile} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </div>
        </Switch>
      </Router>
  );
}

export default App;
