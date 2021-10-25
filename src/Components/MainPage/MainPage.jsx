import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Spin, Alert, Pagination } from 'antd';
import PropTypes from 'prop-types';

import {getAllArticles} from "../../Reducer/api.actions";

import Post from "../Post/Post";

import './MainPage.css'

function MainPage({articles, user, postsTotal, getAllArticles}) {
  MainPage.propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      token: PropTypes.string,
    }).isRequired,
    getAllArticles: PropTypes.func.isRequired,
    articles: PropTypes.array.isRequired,
    postsTotal: PropTypes.number.isRequired
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user.username) {
      setError('');
      setLoading(true);
      getAllArticles(currentPage)
        .then(() => setLoading(false))
        .catch(err => {
          setLoading(false);
          setError('Не удалось загрузить данные');
          console.dir(err);
        })
    }

  }, [currentPage, getAllArticles, user])

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

const mapDispatchToProps = { getAllArticles };

const mapStateToProps = ({articles, user, postsTotal}) => ({
  articles,
  user,
  postsTotal
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
