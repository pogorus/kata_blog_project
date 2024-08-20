import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './main-view.scss';
import ApiService from '../../services/api-service';
import ArticleList from '../article-list';
import PaginationBar from '../pagination-bar';

function MainView({ user }) {
  const apiService = new ApiService();
  let { page } = useParams();

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);

  const onLike = (slug) => {
    setArticles((articles) => {
      const articleIndex = articles.findIndex((el) => {
        return el.slug == slug;
      });
      const newArticles = [...articles];
      newArticles[articleIndex].favorited = true;
      newArticles[articleIndex].favoritesCount += 1;
      return newArticles;
    });
  };

  const onDislike = (slug) => {
    setArticles((articles) => {
      const articleIndex = articles.findIndex((el) => {
        return el.slug == slug;
      });
      const newArticles = [...articles];
      newArticles[articleIndex].favorited = false;
      newArticles[articleIndex].favoritesCount -= 1;
      return newArticles;
    });
  };

  useEffect(() => {
    apiService.getPage(page, user.token).then((res) => {
      setArticles(res.articles);
      setArticlesCount(res.articlesCount);
    });
  }, [page, user]);

  return (
    <>
      <ArticleList articles={articles} user={user} onLike={onLike} onDislike={onDislike} />
      <PaginationBar articlesCount={articlesCount} currentPage={page} />
    </>
  );
}

export default MainView;
