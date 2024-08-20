import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from 'antd';

import './article-details.scss';
import ApiService from '../../services/api-service';
import Article from '../article/';

function ArticleDetails({ user: { username, token } }) {
  const apiService = new ApiService();
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  const onLike = () => {
    setArticle((article) => {
      const newArticle = { ...article };
      newArticle.favorited = true;
      newArticle.favoritesCount += 1;
      return newArticle;
    });
  };

  const onDislike = () => {
    setArticle((article) => {
      const newArticle = { ...article };
      newArticle.favorited = false;
      newArticle.favoritesCount -= 1;
      return newArticle;
    });
  };

  useEffect(() => {
    apiService.getArticle(slug, token).then((res) => {
      setArticle(res.article);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <Flex className="article-list" vertical>
      <Article
        text={article.body}
        {...article}
        details={true}
        username={username}
        token={token}
        onLike={onLike}
        onDislike={onDislike}
      />
    </Flex>
  );
}

export default ArticleDetails;
