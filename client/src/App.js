import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
import MyHours from './pages/MyHours/MyHours';

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
            <Route path='/my-hours' component={MyHours} />
            <Route path='/profile' component={Profile} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </div>
        </Switch>
      </Router>
  );
}

export default App;
