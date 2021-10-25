import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { format } from 'date-fns';

import heart from '../../assets/heart.svg';
import favor from '../../assets/favor.png';

import './Post.scss'

const Post = ({post}) => {

  const {title, author, description, createdAt, favoritesCount, tagList, slug, favorited} = post;

  const history = useHistory();

  const date = format(new Date(createdAt), 'MMMM d, y');

  const onPostClick = () => history.push(`/articles/${slug}`);

  return (
    <div className="post" >
      <article className="post__article">
        <div className="post__title">
          <h5 onClick={onPostClick}>{title}</h5>
          <div className="post__likes likes">
            <img alt="heart" src={ favorited ? favor : heart}/>
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

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.shape({
      "username": PropTypes.string,
      "bio": PropTypes.string,
      "image": PropTypes.string,
    }),
    body: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    favoritesCount: PropTypes.number,
    title: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
    favorited: PropTypes.bool.isRequired
  }).isRequired,
}
