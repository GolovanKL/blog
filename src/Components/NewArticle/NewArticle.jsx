import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

import './NewArticle.scss';

import {makeNewArticle, editArticle} from "../../Reducer/api.actions";

const NewArticle = ({article = null}) => {

  const defaultValues = article ? {
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList
  } : {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  const {control, handleSubmit, watch, formState: {errors}} = useForm({defaultValues: {...defaultValues}});

  const [tagList, setTagList] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = ({title, description, body, ...tags}) => {
    const tagList = Object.values(tags).slice(0, -1);
    console.log(tags);
    if (article) {
      dispatch(editArticle(article.slug, title, description, body, tagList))
        .then(() => history.push('/'))
    } else {
      dispatch(makeNewArticle(title, description, body, tagList))
        .then(() => history.push('/'))
    }

  }

  const addNewTag = () => {
    const newTag = '';
    setTagList(prev => [...prev, newTag])
  }

  const deleteTag = (id) => {
    setTagList(prev => prev.filter(elem => elem.id !== id))
  }

  return (

    <div className="new-article _block">
      <div className="new-article_body">
        <div className="new-article__title"><h5>Create new article</h5></div>
        <form onSubmit={handleSubmit(onSubmit)} className="new-article__form">
          <div className="controller">
            <Controller
              name="title"
              control={control}
              rules={{required: true, minLength: 3}}
              render={({field}) =>
                <FormInput {...field}
                           value={watch("title")}
                           label="Title"
                           error={errors.title}
                />
              }
            />
          </div>
          <div className="controller">
            <Controller
              name="description"
              control={control}
              rules={{required: true, minLength: 3}}
              render={({field}) =>
                <FormInput {...field}
                           value={watch("description")}
                           label="Short description"
                           error={errors.description}
                />
              }
            />
          </div>
          <div className="controller">
            <Controller
              name="body"
              control={control}
              rules={{required: true, minLength: 3}}
              render={({field}) =>
                <div className="group">
                  <textarea {...field}
                            className="form-input"
                            value={watch("body")}
                  />
                  <label className={`${watch("body") ? 'shrink' : ''} form-input-label`}>Text</label>

                </div>
              }
            />
          </div>
          <div className="tags">
            <label htmlFor="">Tags:</label>
            {!tagList.length && <button className="tags__add" onClick={addNewTag} type="button">Add tag</button>}
            {tagList.map((elem, id) => {
              return (
                <div key={id} className="tags__input">
                  <Controller
                    name={id}
                    control={control}
                    rules={{required: false}}
                    render={({field}) =>
                      <FormInput {...field}
                                 value={watch(id)}
                                 placeholder="Tag"
                                 error={errors[id]}
                      />
                    }
                  />
                  <button className="button button__red" type="button" onClick={() => deleteTag(elem.id)}>Delete</button>
                  {id === tagList.length - 1 &&
                  <button className="button tags__add" onClick={() => addNewTag()} type="button">Add tag</button>}
                </div>
              )
            })}
          </div>
          <Button type="submit" children={"Send"}/>
        </form>
      </div>

    </div>
  );
};


export default NewArticle;
