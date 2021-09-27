import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import uniqid from 'uniqid';

import FormInput from "../FormInput/FormInput";

import './NewArticle.scss'
import Button from "../Button/Button";
import Tag from "../Tag/Tag";

const NewArticle = () => {
  const {control, handleSubmit, watch, formState: {errors}} = useForm();
  const [tagList, setTagList] = useState([{value: '', id: uniqid()}]);

  const onSubmit = data => {
    console.log(data);
  }

  const addNewTag = () => {
    const newTag = {value: '', id: uniqid() }
    setTagList( prev => [...prev, newTag])
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
                <textarea {...field}
                          value={watch("text")}
                          placeholder="Text"
                />
              }
            />
          </div>
          <div className="tags">
            <label htmlFor="">Tags</label>
            { tagList.map(({id}) => <Tag key={id} id={id} onAdd={addNewTag} onDelete={deleteTag} />)}
          </div>
          <Button type="submit" children={"Send"}/>
        </form>
      </div>

    </div>
  );
};

export default NewArticle;
