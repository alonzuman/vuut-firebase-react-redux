import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Notifications from './pages/Notifications/Notifications';
import Admin from './pages/Admin/Admin';
import MyHours from './pages/MyHours/MyHours';
import AllHours from './pages/Admin/pages/AllHours';
import AllUsers from './pages/Admin/pages/AllUsers';

// Components
import Alert from './components/Alert/Alert';

// Redux
import Profile from './pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, switchTheme, loadTheme } from './actions';

function App() {
  const dispatch = useDispatch();
  const { isOn, type, msg } = useSelector(state => state.alerts)
  const theme = useSelector(state => state.theme);
  const { colors } = theme;

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'dark');
      dispatch(switchTheme('dark'))
    } else {
      dispatch(loadTheme())
    };
  }, [])

  return (
      <Router>
        {isOn && <Alert type={type} msg={msg} />}
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/add' component={Add} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/admin/all-hours' component={AllHours} />
            <Route exact path='/admin/all-users' component={AllUsers} />
            <Route path='/notifications' component={Notifications} />
            <Route path='/my-hours' component={MyHours} />
            <Route path='/profile' component={Profile} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>
  );
}

export default App;
