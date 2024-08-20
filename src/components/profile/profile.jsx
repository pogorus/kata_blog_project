import React, { useState } from 'react';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ApiService from '../../services/api-service';
import './profile.scss';

const Profile = ({ user: { token, image }, setUser }) => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const [updateErrors, setUpdateErrors] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      image: data.avatar ? data.avatar : image,
      bio: '',
    };
    apiService.updateUser(token, { user: userData }).then((res) => {
      setUpdateErrors({});
      if (res.errors) {
        setUpdateErrors({ ...res.errors });
      } else {
        setUser({
          ...res.user,
        });

        navigate('/articles');
      }
    });
  };

  const errorList = Object.keys(updateErrors).map((key) => {
    return (
      <div key={key}>
        <p className="profile-form__error">{`${key} ${updateErrors[key]}`}</p>
      </div>
    );
  });

  return (
    <Flex vertical className="profile-form">
      <Flex vertical className="profile-form__container">
        <div className="profile-form__header">Edit Profile</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="profile-form__field">
            <div className="profile-form__label">Username</div>
            <input
              placeholder="Username"
              className={`profile-form__input ${errors?.username && 'input-error'}`}
              {...register('username', {
                required: 'Username cant be empty',
                minLength: {
                  value: 3,
                  message: 'Your username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Your username must be a maximum 20 characters',
                },
              })}
            />
            <div>{errors?.username && <p className="profile-form__error">{errors.username.message}</p>}</div>
          </label>
          <label className="profile-form__field">
            <div className="profile-form__label">Email address</div>
            <input
              placeholder="Email address"
              className={`profile-form__input ${errors?.email && 'input-error'}`}
              {...register('email', {
                required: 'Email cant be empty',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <div>{errors?.email && <p className="profile-form__error">{errors.email.message}</p>}</div>
          </label>
          <label className="profile-form__field">
            <div className="profile-form__label">Avatar image (url)</div>
            <input
              placeholder="Avatar image"
              className={`profile-form__input ${errors?.avatar && 'input-error'}`}
              {...register('avatar', {
                pattern: {
                  value:
                    // eslint-disable-next-line
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                  message: 'Invalid URL',
                },
              })}
            />
            <div>{errors?.avatar && <p className="profile-form__error">{errors.avatar.message}</p>}</div>
          </label>
          {errorList}
          <input type="submit" value="Save" className="profile-form__submit" />
        </form>
      </Flex>
    </Flex>
  );
};

export default Profile;
