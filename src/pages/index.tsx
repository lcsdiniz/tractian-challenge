import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import "antd/dist/antd.css";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Logo } from '../components/Logo';
import styles from '../styles/Login.module.scss';

export default function Login() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();


  const onFinish = (values) => {
    setButtonLoading(true);
    const { username, password } = values;
    setTimeout(() => {
      if (username === 'test@tractian.com' && password === '123456') {
        router.push('/main');
      } else {
        message.error('Invalid credentials');
        setButtonLoading(false);
      }
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Login | Tractian Challenge</title>
      </Head>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Logo />
        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Username is required',
              },
              {
                type: 'email',
                message: 'Invalid e-mail',
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton} loading={buttonLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};