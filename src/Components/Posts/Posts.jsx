import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Spin, Alert, Pagination } from 'antd';

import BlogApi from "../../blogApi/BlogApi";
import {setArticles, setUser} from "../../Reducer/store.actions";

import Post from "../Post/Post";

import './Posts.css'

const {getAllArticles} = new BlogApi();

function Posts({setArticles, articles, user: {token} }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [postsTotal, setPostsTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setError('');
    setLoading(true);
    getAllArticles(currentPage).then(res => {
        setLoading(false);
        setArticles(res.articles);
        setPostsTotal(res.articlesCount);
      })
      .catch(err => {
        setLoading(false);
        setError('Не удалось загрузить данные');
        console.log(err);
      })

  }, [currentPage, setArticles])

  return (
    <div className="posts__container">
      {loading && <Spin size="large"/>}
      {error && <Alert type="error" message={error}/>}
      {!loading && !error && (<>
        <div className="posts">
          {articles.map(post => <Post key={uniqid()} post={post}/>)}
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

const mapDispatchToProps = { setArticles, setUser };

const mapStateToProps = ({articles, user}) => ({
  articles,
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
