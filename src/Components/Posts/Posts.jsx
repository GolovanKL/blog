import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import Post from "../Post/Post";

import './Posts.css'

const Posts = ({posts}) => {
  Posts.propTypes ={
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  }


  return (
    <div className="posts__container">
      <div className="posts">
        {posts.map(post => <Post key={uniqid()} post={post} />)}
      </div>
    </div>
  );
};

export default Posts;
