import { Layout, Table } from 'antd';
import "antd/dist/antd.css";
import { GetStaticProps } from "next";
import Head from 'next/head';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { api } from '../services/api';
import styles from '../styles/Assets.module.scss';
const { Content } = Layout;

type CompaniesTableData = {
  id: number,
  name: string,
}

interface CompaniesProps {
  companiesTableData: CompaniesTableData[];
}


export default function Companies({ companiesTableData }: CompaniesProps) {
  const [dataSource, setDataSource] = useState(companiesTableData);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id', 
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <>
      <Head>
        <title>Companies | Tractian Challenge</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar defaultKey="4" />
        <Layout className={styles.siteLayout}>
          <Header title="Companies" />
          <Content style={{ padding: "0 32px" }}>
            
            <div className={styles.siteLayoutBackground} style={{ marginTop: 16, minHeight: 360 }}>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const companiesResponse = await api.get('/companies');

  return {
    props: {
      companiesTableData: companiesResponse.data,
    }
  }
}