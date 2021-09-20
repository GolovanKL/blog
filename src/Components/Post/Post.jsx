import React from 'react';

import avatar from '../../assets/user.png';
import heart from '../../assets/heart.svg';
import './Post.css'

const Post = () => {


  return (
      <div className="post">
        <article className="post__article">
          <div className="post__title">
            <h5>Some article title</h5>
            <div className="post__likes likes">
              <img alt="heart" src={heart}/>
                <div className="likes__count">12</div>
            </div>
          </div>
          <div className="tags">
            <div className="tag">Tag 1</div>
            <div className="tag">Tag 2</div>
          </div>
          <div className="article__text">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut blanditiis, cum
              eveniet harum inventore ipsa iste iusto libero modi molestiae nam nesciunt, odit
              possimus quaerat, repudiandae saepe sit voluptate.</p>
          </div>
        </article>
        <div className="post__user user">
          <div className="user__text">
            <div className="user__name">John Doe</div>
            <div className="user__date">March 5, 2020</div>
          </div>
          <div className="user__avatar">
            <img alt="user avatar" src={avatar}/>
          </div>
        </div>
      </div>
);
};

export default Post;
