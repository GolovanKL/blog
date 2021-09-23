import React, { useEffect, useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import { Spin, Alert, Pagination } from 'antd';

import Post from "../Post/Post";

import './Posts.css'

function Posts() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsTotal, setPostsTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setError('');
    setLoading(true);
    axios(`https://conduit.productionready.io/api/articles?limit=5&offset=${currentPage * 5 - 5}`)
      .then(res => res.data)
      .then(res => {
        setLoading(false);
        setPosts(res.articles);
        setPostsTotal(res.articlesCount);
      })
      .catch(err => {
        setLoading(false);
        setError('Не удалось загрузить данные');
        console.log(err);
      })

  }, [currentPage])

  console.log(posts);

  return (
    <div className="posts__container">
      {loading && <Spin size="large"/>}
      {error && <Alert type="error" message={error}/>}
      {!loading && !error && (<>
        <div className="posts">
          {posts.map(post => <Post key={uniqid()} post={post}/>)}
        </div>
        <Pagination
          size="small"
          current={currentPage}
          showSizeChanger={false}
          total={postsTotal}
          pageSize={5}
          onChange={(num) => setCurrentPage(num)}
        />
      </>)}
    </div>
  );
}

export default Posts;
