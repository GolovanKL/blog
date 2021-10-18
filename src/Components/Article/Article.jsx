import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import uniqid from "uniqid";
import heart from "../../assets/heart.svg";
import favor from '../../assets/favor.png';
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import BlogApi from "../../blogApi/BlogApi";

import './Article.css';

const {getOneArticle, favoriteArticle, unFavoriteArticle} = new BlogApi();

const Article = ({slug}) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOneArticle(slug)
      .then(res => {
        console.log('server post',res.data.article);
        setArticle(res.data.article);
        setLoading(false);
      })
      .catch(() => setLoading(false))
  }, [slug])

  const {title, description, body, favoritesCount, createdAt, author, tagList} = article;


  const date = (createdAt && format(new Date(createdAt), 'MMMM d, y'));

  const onFavorite = () => favoritesCount ? unFavoriteArticle(slug) : favoriteArticle(slug)

  return (
    <>
      {loading && <Spin size={"large"}/>}
      {!loading &&
      <div className="post">
        <article className="post__article">
          <div className="post__title">
            <h5>{title}</h5>
            <div className="post__likes likes">
              <button
                className="post__favorite"
                title="Add to favorites"
                onClick={() => onFavorite().then(res => setArticle(res.data.article))}
              >
                <img alt="heart" src={ favoritesCount ? favor : heart}/>
              </button>
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
        <ReactMarkdown children={body} className='article__body' rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}/>
      </div>
      }
    </>
  );
}

export default Article;
