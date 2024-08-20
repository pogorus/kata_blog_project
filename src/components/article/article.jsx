import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Tag, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { format } from 'date-fns';

import ApiService from '../../services/api-service';

import './article.scss';
import like from './like.svg';
import liked from './liked.svg';

function Article({
  slug,
  title,
  favorited,
  favoritesCount,
  tagList,
  description,
  author,
  createdAt,
  text = null,
  details = false,
  username,
  token,
  onLike,
  onDislike,
}) {
  const apiService = new ApiService();
  const navigate = useNavigate();

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    console.log(token);
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        apiService.deleteArticle(slug, token).then(() => {
          navigate('/articles');
        });
      },
    });
  };

  const likeArticle = () => {
    if (token) {
      apiService.likeArticle(slug, token).then(() => {
        onLike(slug);
      });
    }
  };

  const dislikeArticle = () => {
    if (token) {
      apiService.dislikeArticle(slug, token).then(() => {
        onDislike(slug);
      });
    }
  };

  return (
    <Flex className="article" vertical>
      <Flex>
        <Flex vertical gap="4px">
          <Flex className="article__header">
            <Link className="article__title" to={`/articles/${slug}`}>
              {title}
            </Link>
            {favorited ? (
              <button className="like-button" onClick={dislikeArticle}>
                <img src={liked} alt="liked" />
              </button>
            ) : (
              <button className="like-button" onClick={likeArticle}>
                <img src={like} alt="like" />
              </button>
            )}
            <span>{favoritesCount}</span>
          </Flex>
          <Flex vertical gap="4px">
            <Flex className="article__tags">
              {tagList.map((tag, index) => {
                if (tag) {
                  return (
                    <Tag key={`${tag}-${index}`} className="tag">
                      {tag}
                    </Tag>
                  );
                }
              })}
            </Flex>
            <div className="article__description">{description}</div>
          </Flex>
        </Flex>
        <Flex vertical>
          <Flex>
            <Flex vertical>
              <span className="author-name">{author.username}</span>
              <span className="created-at">{format(createdAt, 'MMMM d, y')}</span>
            </Flex>
            <img src={author.image} alt="avatar" className="user-avatar" />
          </Flex>
          {details && username === author.username ? (
            <Flex justify="flex-end">
              <button className="article__delete-button" onClick={showDeleteConfirm}>
                Delete
              </button>
              <button className="article__edit-button" onClick={() => navigate(`/articles/${slug}/edit`)}>
                Edit
              </button>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
      <div className="article__body">{text}</div>
    </Flex>
  );
}

export default Article;
