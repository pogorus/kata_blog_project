import React from 'react';
import { Flex } from 'antd';

import './article-list.scss';
import Article from '../article';

function ArticleList({ articles, user: { username, token }, onLike, onDislike }) {
  const articleCards = articles.map((article) => {
    return (
      <Article
        key={article.slug}
        {...article}
        username={username}
        token={token}
        onLike={onLike}
        onDislike={onDislike}
      />
    );
  });

  return (
    <Flex vertical wrap gap="26px" justify="center" className="article-list">
      {articleCards}
    </Flex>
  );
}

export default ArticleList;
