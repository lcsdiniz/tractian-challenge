import { Layout, Typography } from 'antd';
import "antd/dist/antd.css";
import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import styles from '../styles/Assets.module.scss';

const { Content } = Layout;
const { Text } = Typography;

export default function Users() {
  return (
    <>
      <Head>
        <title>Main | Tractian Challenge</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar defaultKey="-" />
        <Layout className={styles.siteLayout}>
          <Header title="Main" />
          <Content
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 32,
              // backgroundColor: '#FFF',
              width: 800,
              maxHeight: 260,
              margin: 'auto',
            }}
          >
            <Text style={{ fontSize: 32 }}>Welcome Test Tractian!</Text>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}