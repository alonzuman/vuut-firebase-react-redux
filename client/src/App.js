import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const fetch = async () => {
    const res = await axios.get('https://europe-west3-vuut-react-redux.cloudfunctions.net/api/hours');
    console.log(res.data);
  }

  useEffect(() => { fetch() }, []);

  return (
    <div className="App">
      Hi
    </div>
  );
}

export default App;
