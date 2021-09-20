import React, { useEffect, useState } from "react";
import {Spin} from 'antd';

import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsTotal, setPostsTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('https://conduit.productionready.io/api/articles?limit=5')
      .then(res => res.json()).then(res => {
      setLoading(false);
      setPosts(res.articles);
      setPostsTotal(res.articlesCount);
    })
      .catch(err => {
        setLoading(false);
        setError('Не удалось загрузить данные');
        console.log(err);
      })
  }, [])

  console.log(posts, postsTotal);

  return (
    <div className='wrapper'>
      <Header/>
      {loading && <Spin size='large' /> }
      {!loading && error}
      {!loading && !error && (
      <main className="main">
        <Posts posts={posts}/>
      </main>)}
    </div>
  );
}

export default App;
