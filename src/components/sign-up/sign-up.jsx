import React, { useState } from 'react';
import { Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ApiService from '../../services/api-service';
import './sign-up.scss';

const SignUp = () => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const [signupErrors, setSignupErrors] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    apiService.createUser({ user: userData }).then((res) => {
      setSignupErrors({});
      if (res.errors) {
        setSignupErrors({ ...res.errors });
      } else {
        navigate('/sign-in');
      }
    });
  };

  const errorList = Object.keys(signupErrors).map((key) => {
    return (
      <div key={key}>
        <p className="sign-up-form__error">{`${key} ${signupErrors[key]}`}</p>
      </div>
    );
  });

  return (
    <Flex vertical className="sign-up-form">
      <Flex vertical className="sign-up-form__container">
        <div className="sign-up-form__header">Sign Up</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="sign-up-form__field">
            <div className="sign-up-form__label">Username</div>
            <input
              placeholder="Username"
              className={`sign-up-form__input ${errors?.username && 'input-error'}`}
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
            <div>{errors?.username && <p className="sign-up-form__error">{errors.username.message}</p>}</div>
          </label>
          <label className="sign-up-form__field">
            <div className="sign-up-form__label">Email address</div>
            <input
              placeholder="Email address"
              className={`sign-up-form__input ${errors?.email && 'input-error'}`}
              {...register('email', {
                required: 'Email cant be empty',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <div>{errors?.email && <p className="sign-up-form__error">{errors.email.message}</p>}</div>
          </label>
          <label className="sign-up-form__field">
            <div className="sign-up-form__label">Password</div>
            <input
              type="password"
              placeholder="Password"
              className={`sign-up-form__input ${errors?.password && 'input-error'}`}
              {...register('password', {
                required: 'Password cant be empty',
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Your password must be a maximum 40 characters',
                },
              })}
            />
            <div>{errors?.password && <p className="sign-up-form__error">{errors.password.message}</p>}</div>
          </label>
          <label className="sign-up-form__field">
            <div className="sign-up-form__label">Repeat Password</div>
            <input
              type="password"
              placeholder="Password"
              className={`sign-up-form__input ${errors?.repeat && 'input-error'}`}
              {...register('repeat', {
                required: 'Password cant be empty',
                validate: (val) => {
                  if (watch('password') != val) {
                    return 'Passwords must match';
                  }
                },
              })}
            />
            <div>{errors?.repeat && <p className="sign-up-form__error">{errors.repeat.message}</p>}</div>
          </label>
          <label className="sign-up-form__field ">
            <div className="sign-up-form__checkbox">
              <input
                type="checkbox"
                {...register('agreement', {
                  required: 'The checkbox must be checked',
                })}
              />
              <span></span>
              <span>I agree to the processing of my personal information</span>
            </div>
            <div>{errors?.agreement && <p className="sign-up-form__error">{errors.agreement.message}</p>}</div>
          </label>
          {errorList}
          <input type="submit" value="Create" className="sign-up-form__submit" />
        </form>
        <div className="sign-up-form__footer">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </div>
      </Flex>
    </Flex>
  );
};
export default SignUp;
