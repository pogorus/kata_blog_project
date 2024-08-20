import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import './header.scss';

function Header({ user: { token, username, image }, onLogout }) {
  const navigate = useNavigate();

  const unloggedHeader = !token ? (
    <div className="header__unlogged-buttons">
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
      <button onClick={() => navigate('/sign-up')}>Sign Up</button>
    </div>
  ) : null;

  const loggedHeader = token ? (
    <div className="header__logged-buttons">
      <button
        onClick={() => {
          navigate('/new-article');
        }}
      >
        Create article
      </button>
      <button className="header__profile-button" onClick={() => navigate('/profile')}>
        <span className="header__username">{username}</span>
        <img src={image} alt="avatar" className="header__avatar" />
      </button>
      <button onClick={onLogout}>Logout</button>
    </div>
  ) : null;

  return (
    <Flex className="header">
      <button
        onClick={() => {
          navigate('/articles');
        }}
      >
        Realworld Blog
      </button>
      {unloggedHeader}
      {loggedHeader}
    </Flex>
  );
}

export default Header;
