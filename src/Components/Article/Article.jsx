import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import uniqid from "uniqid";
import heart from "../../assets/heart.svg";
import { format } from "date-fns";
import BlogApi from "../blogApi/BlogApi";


const Article = ({slug}) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  const {getOneArticle} = new BlogApi();

  useEffect(() => {
    getOneArticle(slug)
      .then(res => {
        setArticle(res.data.article);
        setLoading(false);
        console.log(res.data.article);
      })
      .catch(() => setLoading(false))
  }, [slug, getOneArticle])

  const {title, description, body, favoritesCount, createdAt, author, tagList} = article;

  const date = (createdAt && format(new Date(createdAt), 'MMMM d, y'));

  return (
    <>
      {loading && <Spin size={"large"}/>}
      {!loading &&
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
        <div className='article__body'>
          <p>{body}</p>
        </div>
      </div>
      }
    </>
  );
}

export default Article;
