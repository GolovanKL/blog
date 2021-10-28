import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { Spin } from "antd";

import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

import './NewArticle.scss';

import { makeNewArticle, editArticle } from "../../Reducer/api.actions";

const NewArticle = ({article = null}) => {

    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);

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
      name: "tag",
    });

    const watchFieldArray = watch("tag");
    const controlledFields = fields.map((field, index) => (
        {
          ...field,
          ...watchFieldArray[index]
        }
      )
    );

    const dispatch = useDispatch();
    const history = useHistory();

    const errorHandle = err => {
      if (err.response.status === 422) {
        setServerError(err.response.data.errors);
      }
    }

    const handleArticleSubmit = (title, description, body, tag) => article ?
      dispatch(editArticle(article.slug, title, description, body, tag)) :
      dispatch(makeNewArticle(title, description, body, tag))

    const onSubmit = ({title, description, body, tag}) => {
      setServerError(null);
      setLoading(true);
      let error = false;

      handleArticleSubmit(title, description, body, tag)
        .catch(err => {
          errorHandle(err);
          error = true;
        })
        .then(() => {
          setLoading(false);
          if (!error) {
            history.push('/articles')}
        })
    }

    return (
      <div className="new-article _block">
        <div className="new-article_body">
          <div className="new-article__title">
            {loading ? <Spin size='large'/> : <h5>{article ? 'Edit Article' : 'Create new article'}</h5>}
          </div>
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
                             error={errors.title || serverError}
                  />
                }
              />
              {serverError && <span className="form__error">Article with this title already exist.</span>}
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
              {controlledFields.map((field, index) => (
                <div key={field.id} className="tags__input">
                  <Controller
                    name={`tag.${index}`}
                    control={control}
                    render={({field}) =>
                      <FormInput {...field}
                                 name={`tag.${index}.tagInput`}
                                 placeholder="Tag"
                                 error={errors[`tag.${index}`]}
                                 required
                      />
                    }
                  />
                  <button className="button button__red" type="button" onClick={() => remove(index)}>Delete</button>
                  {index === fields.length - 1 &&
                  <button className="button tags__add" onClick={() => append({})} type="button">Add tag</button>}
                </div>

              ))}
            </div>
            <Button type="submit">Send</Button>
          </form>
        </div>

      </div>
    );
  }
;


export default NewArticle;

NewArticle.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tag: PropTypes.arrayOf(PropTypes.string)
  })
}

NewArticle.defaultProps = {
  article: null
}