import React from 'react';

import Post from "../Post/Post";

import './Posts.css'

const Posts = () => {
  return (
    <div className="posts__container">
      <div className="posts">
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  );
};

export default Posts;
