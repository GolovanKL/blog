import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import {withRouter} from 'react-router-dom'

import uniqid from 'uniqid';


import BlogApi from "../../blogApi/BlogApi";
import FormInput from "../FormInput/FormInput";

import './NewArticle.scss'
import Button from "../Button/Button";

const {makeNewArticle} = new BlogApi();

const NewArticle = ({history}) => {
  const {control, handleSubmit, watch, formState: {errors}} = useForm();
  const [tagList, setTagList] = useState([{value: '', id: uniqid()}]);

  const onSubmit = ({title, description, text}) => {
    makeNewArticle(title, description, text)
      .then(res => console.log(res))
      .catch(err => console.dir(err))
      .then(() => history.push('/'))

    console.log(title, description, text);
  }

  const addNewTag = () => {
    const newTag = {value: '', id: uniqid()}
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
              name="text"
              control={control}
              rules={{required: true, minLength: 3}}
              render={({field}) =>
                <div className="group">
                  <textarea {...field}
                            className="form-input"
                            value={watch("text")}
                  />
                  <label className={`${watch("text") ? 'shrink' : ''} form-input-label`}>Text</label>

                </div>
              }
            />
          </div>
          <div className="tags">
            <label htmlFor="">Tags:</label>
            {!tagList.length && <button className="tags__add" onClick={addNewTag} type="button">Add tag</button>}
            {tagList.map((elem, id) => {
              const key = `tag-${elem.id}`;
              return (
                <div key={key} className="tags__input">
                  <Controller
                    name={key}
                    control={control}
                    rules={{required: true}}
                    render={({field}) =>
                      <FormInput {...field}
                                 value={watch(key)}
                                 placeholder="Tag"
                                 error={errors[key]}
                      />
                    }
                  />
                  <button className="tags__delete" type="button" onClick={() => deleteTag(elem.id)}>Delete</button>
                  {id === tagList.length - 1 &&
                  <button className="tags__add" onClick={addNewTag} type="button">Add tag</button>}
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

export default withRouter(NewArticle);
