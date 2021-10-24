import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import uniqid from "uniqid";
import { connect } from "react-redux";

import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import {getOneArticle, favoriteArticle, unFavoriteArticle} from "../../Reducer/api.actions";

import heart from "../../assets/heart.svg";
import favor from '../../assets/favor.png';

import './Article.scss';
import NewArticle from "../NewArticle/NewArticle";
import ModalDelete from "../ModalDelete/ModalDelete";

const Article = ({slug, getOneArticle, favoriteArticle, unFavoriteArticle}) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);


  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    getOneArticle(slug)
      .then(res => {
        setArticle(res.data.article);
        setLoading(false);
      })
      .catch(() => setLoading(false))
  }, [slug, getOneArticle])

  const {title, description, body, favoritesCount, createdAt, author, tagList, favorited} = article;

  const date = (createdAt && format(new Date(createdAt), 'MMMM d, y'));

  const onFavorite = () => favorited ? unFavoriteArticle(slug) : favoriteArticle(slug)

  const onDelete = () => {
    setIsDelete(true);
  }

  const onEdit = () => {
    setEdit(true);
  }

  if (edit) {
    return (
      <NewArticle article={article}/>
    )
  }

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
                <img alt="heart" src={favorited ? favor : heart}/>
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
        <div>
          <div className="post__user user">
            <div className="user__text">
              <div className="user__name">{author.username}</div>
              <div className="user__date">{date}</div>
            </div>
            <div className="user__avatar">
              <img alt="user avatar" src={author.image}/>
            </div>
          </div>
          <div className="post__buttons">
            { isDelete && <ModalDelete slug={slug} setIsDelete={setIsDelete}/>}
            <button className="button button__red" onClick={onDelete}>
              Delete
            </button>
            <button className="button button__green" onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>
        <ReactMarkdown children={body} className='article__body' rehypePlugins={[rehypeRaw]}
                       remarkPlugins={[remarkGfm]}/>
      </div>
      }
    </>
  )
}

const mapDispatchToProps = {getOneArticle,favoriteArticle, unFavoriteArticle}

export default connect(null, mapDispatchToProps)(Article);
