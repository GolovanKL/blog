import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { format } from 'date-fns'
import heart from '../../assets/heart.svg'

import './Post.scss'

const Post = ({post, history}) => {

  const {title, author, description, createdAt, favoritesCount, tagList, slug} = post;

  const date = format(new Date(createdAt), 'MMMM d, y');

  const onPostClick = () => history.push(`/articles/${slug}`);

  return (
    <div className="post" >
      <article className="post__article">
        <div className="post__title">
          <h5 onClick={onPostClick}>{title}</h5>
          <div className="post__likes likes">
            <img alt="heart" src={heart}/>
            <div className="likes__count">{favoritesCount}</div>
          </div>
        </div>
        <div className="tags">
          {tagList.map(tag => <div key={uniqid()} className="tag">{tag}</div>)}
        </div>
        <div className="article__text">
          <p>{description}</p>
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

export default withRouter(Post);

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.object,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    favoritesCount: PropTypes.number,
    title: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
  }).isRequired,
}
