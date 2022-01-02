import React, { useState, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  // const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(
      loginRequestAction({
        email,
        password,
      })
    );
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          value={email}
          type="email"
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
