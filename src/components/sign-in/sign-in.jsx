import React, { useState } from 'react';
import { Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ApiService from '../../services/api-service';
import './sign-in.scss';

const SignIn = ({ onLogin }) => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const [signinErrors, setSigninErrors] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    apiService.login({ user: data }).then((res) => {
      setSigninErrors({});
      if (res.errors) {
        setSigninErrors({ ...res.errors });
      } else {
        onLogin(res.user);
        navigate('/articles');
      }
    });
  };

  const errorList = Object.keys(signinErrors).map((key) => {
    return (
      <div key={key}>
        <p className="sign-in-form__error">{`${key} ${signinErrors[key]}`}</p>
      </div>
    );
  });

  return (
    <Flex vertical className="sign-in-form">
      <Flex vertical className="sign-in-form__container">
        <div className="sign-in-form__header">Sign In</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="sign-in-form__field">
            <div className="sign-in-form__label">Email address</div>
            <input
              placeholder="Email address"
              className={`sign-in-form__input ${errors?.email && 'input-error'}`}
              {...register('email', {
                required: 'Email cant be empty',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <div>{errors?.email && <p className="sign-in-form__error">{errors.email.message}</p>}</div>
          </label>
          <label className="sign-in-form__field">
            <div className="sign-in-form__label">Password</div>
            <input
              type="password"
              placeholder="Password"
              className={`sign-in-form__input ${errors?.password && 'input-error'}`}
              {...register('password', {
                required: true,
              })}
            />
            <div>{errors?.password && <p className="sign-in-form__error">Password cant be empty</p>}</div>
          </label>
          {errorList}
          <input type="submit" value="Login" className="sign-in-form__submit" />
        </form>
        <div className="sign-in-form__footer">
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </div>
      </Flex>
    </Flex>
  );
};
export default SignIn;
