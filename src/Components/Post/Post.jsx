import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import uniqid from 'uniqid';
import heart from '../../assets/heart.svg'

import './Post.css'

const Post = ({post}) => {
  Post.propTypes = {
    post: PropTypes.shape({
      author: PropTypes.object,
      body: PropTypes.string,
      createdAt: PropTypes.string,
      favoritesCount: PropTypes.number,
      title: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
  }

  const {title, author, body, createdAt, favoritesCount, tagList} = post;

  const date = format(new Date(createdAt), 'MMMM d, y');

  return (
    <div className="post">
      <article className="post__article">
        <div className="post__title">
          <h5>{title}</h5>
          <div className="post__likes likes">
            <img alt="heart" src={heart}/>
            <div className="likes__count">{favoritesCount}</div>
          </div>
        </div>
        <div className="tags">
          {tagList.map(tag => <div key={uniqid()} className="tag">{tag}</div>)}
        </div>
        <div className="article__text">
          <p>{body}</p>
        </div>
      </article>
      <div className="post__user user">
        <div className="user__text">
          <div className="user__name">{author.username}</div>
          <div className="user__date">{date}</div>
        </div>
        <div className="user__avatar">
          <img alt="user avatar" src={author.image}/>
        </div>
      </div>
    </div>
  );
};

export default Post;
