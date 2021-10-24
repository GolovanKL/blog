import React from 'react';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

import './NewArticle.scss';

import { makeNewArticle, editArticle } from "../../Reducer/api.actions";

const NewArticle = ({article = null}) => {

  const defaultValues = article ? {
    title: article.title,
    description: article.description,
    body: article.body,
    tag: article.tagList
  } : {
    title: '',
    description: '',
    body: '',
    tag: []
  }

  const {control, handleSubmit, watch, formState: {errors}} = useForm({defaultValues: {...defaultValues}});

  const {fields, append, remove} = useFieldArray({
    control,
    name: "tag"
  });

  const watchFieldArray = watch("tag");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = ({title, description, body, tag}) => {
    if (article) dispatch(editArticle(article.slug, title, description, body, tag))
    else dispatch(makeNewArticle(title, description, body, tag))
    history.push('./');
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
            {!controlledFields.length &&
            <button className="tags__add" onClick={() => append({})} type="button">Add tag</button>}
            {controlledFields.map((field, index) => {
              return (
                <div key={field.id} className="tags__input">
                  <Controller
                    name={`tag.${index}`}
                    control={control}
                    rules={{required: false}}
                    render={({field}) =>
                      <FormInput {...field}
                                 name={`tag.${index}.tagInput`}
                                 placeholder="Tag"
                      />
                    }
                  />
                  <button className="button button__red" type="button" onClick={() => remove(index)}>Delete</button>
                  {index === fields.length - 1 &&
                  <button className="button tags__add" onClick={() => append({})} type="button">Add tag</button>}
                </div>

              )
            })
            }
          </div>
          <Button type="submit" children={"Send"}/>
        </form>
      </div>

    </div>
  );
};


export default NewArticle;
