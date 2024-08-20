import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './app.scss';
import Header from '../header';
import ArticleDetails from '../article-details/article-details';
import Profile from '../profile';
import SignIn from '../sign-in';
import SignUp from '../sign-up';
import MainView from '../main-view';
import CreateArticle from '../create-article/create-article';
import PrivateRoute from '../private-route';
import UpdateArticle from '../update-article';

function App() {
  const navigate = useNavigate();

  const unloggedUser = {
    token: '',
    username: '',
    email: '',
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    bio: '',
  };

  const loggedUser = JSON.parse(window.localStorage.getItem('user'));

  const [user, setUser] = useState(loggedUser ? loggedUser : unloggedUser);

  const onLogin = (userData) => {
    setUser(userData);
    window.localStorage.setItem('user', JSON.stringify(userData));
  };

  const onLogout = () => {
    navigate('/articles');
    setUser({
      token: '',
      username: '',
      email: '',
      image: '',
      bio: '',
    });
    window.localStorage.removeItem('user');
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <Routes>
        <Route index element={<MainView user={user} />} />
        <Route path="/articles" element={<MainView user={user} />} />
        <Route path="/articles/page/:page/" element={<MainView user={user} />} />
        <Route path="/articles/:slug/" element={<ArticleDetails user={user} />} />
        <Route path="/sign-in" element={<SignIn onLogin={onLogin} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/new-article" element={<PrivateRoute Component={CreateArticle} user={user} />} />
        <Route path="/articles/:slug/edit" element={<PrivateRoute Component={UpdateArticle} user={user} />} />
      </Routes>
    </>
  );
}

export default App;
