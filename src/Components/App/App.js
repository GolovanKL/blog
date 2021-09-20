import React, { useEffect, useState } from "react";
import {Spin} from 'antd';

import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://conduit.productionready.io/api/articles?limit=5')
      .then(res => res.json()).then(res => {
      setLoading(false);
      console.log(res)
    })
      .catch(err => {
        setLoading(false);
        setError(err);
        console.log(err.message)
      })
  }, [])

  return (
    <div className='wrapper'>
      <Header/>
      {loading && <Spin size='large' /> }
      {!loading && error}
      {!loading && !error && (
      <main className="main">
        <Posts/>
      </main>)}
    </div>
  );
}

export default App;
