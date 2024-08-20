import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ApiService from '../../services/api-service';
import './update-article.scss';

const UpdateArticle = ({ user: { token } }) => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [tagList, setTagList] = useState({});
  const [tagId, setTagId] = useState(100);
  const [updateErrors, setUpdateErrors] = useState({});

  let tags = [];

  useEffect(() => {
    apiService.getArticle(slug).then((res) => {
      setTagList(res.article.tagList);
      setValue('title', res.article.title);
      setValue('description', res.article.description);
      setValue('text', res.article.body);
    });
  }, []);

  for (const tag in tagList) {
    tags.push(
      <Flex key={tag}>
        <div className="tag-list">{tagList[tag]}</div>
        <button
          data-tag-id={tag}
          className="tag-button del-tag"
          onClick={(e) => {
            const delId = e.target.getAttribute('data-tag-id');
            console.log(e.target);
            setTagList((tagList) => {
              // eslint-disable-next-line
              let { [delId]: deleted, ...rest } = { ...tagList };
              return rest;
            });
          }}
        >
          Delete
        </button>
      </Flex>
    );
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  const addTag = () => {
    const tag = document.querySelector('.tag-form').value;
    if (!tag) {
      setError('tag', { type: 'custom', message: 'Tag cant be empty' });
    } else if (Object.values(tagList).includes(tag)) {
      setError('tag', { type: 'custom', message: 'Tag is already used' });
    } else {
      setTagList((tagList) => {
        return { ...tagList, [tagId]: tag };
      });
      setTagId((tagId) => tagId + 1);
      document.querySelector('.tag-form').value = '';
      clearErrors('tag');
    }
  };

  const onSubmit = (data) => {
    const articleData = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: Object.values(tagList),
    };
    apiService.updateArticle(slug, token, { article: articleData }).then((res) => {
      setUpdateErrors({});
      if (res.errors) {
        setUpdateErrors({ ...res.errors });
      } else {
        navigate(`/articles/${slug}`);
      }
    });
  };

  const errorList = Object.keys(updateErrors).map((key) => {
    return (
      <div key={key}>
        <p className="update-article-form">{`${key} ${updateErrors[key]}`}</p>
      </div>
    );
  });

  return (
    <Flex vertical className="update-article-form">
      <Flex vertical className="update-article-form__container">
        <div className="update-article-form__header">Edit article</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="update-article-form__field">
            <div className="update-article-form__label">Title</div>
            <input
              placeholder="Title"
              className={`update-article-form__input ${errors?.title && 'input-error'}`}
              {...register('title', {
                required: 'Title cant be empty',
              })}
            />
            <div>{errors?.title && <p className="update-article-form__error">{errors.title.message}</p>}</div>
          </label>
          <label className="update-article-form__field">
            <div className="update-article-form__label">Description</div>
            <input
              placeholder="Description"
              className={`update-article-form__input ${errors?.description && 'input-error'}`}
              {...register('description', {
                required: 'Description cant be empty',
              })}
            />
            <div>
              {errors?.description && <p className="update-article-form__error">{errors.description.message}</p>}
            </div>
          </label>
          <label className="update-article-form__field">
            <div className="update-article-form__label">Text</div>
            <textarea
              placeholder="Text"
              className={`update-article-form__input text-input ${errors?.text && 'input-error'}`}
              {...register('text', {
                required: 'Text cant be empty',
              })}
            />
            <div>{errors?.text && <p className="update-article-form__error">{errors.text.message}</p>}</div>
          </label>
          <div className="update-article-form__label">Tags</div>
          {tags}
          <label className="update-article-form__field">
            <input
              placeholder="Tag"
              className={`update-article-form__input tag-form ${errors?.tag && 'input-error'}`}
            />
            <button type="button" className="tag-button add-tag" onClick={addTag}>
              Add tag
            </button>
            <div>{errors?.tag && <p className="update-article-form__error">{errors.tag.message}</p>}</div>
          </label>
          {errorList}
          <input type="submit" value="Send" className="update-article-form__submit" />
        </form>
      </Flex>
    </Flex>
  );
};
export default UpdateArticle;
