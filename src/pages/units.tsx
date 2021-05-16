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

type UnitsTableData = {
  id: number,
  email: string,
  name: string,
  unitId: number,
  companyId: number
}

interface UnitsProps {
  unitsTableData: UnitsTableData[];
}


export default function Units({ unitsTableData }: UnitsProps) {
  const [dataSource, setDataSource] = useState(unitsTableData);

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
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
  ];

  return (
    <>
      <Head>
        <title>Units | Tractian Challenge</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar defaultKey="3" />
        <Layout className={styles.siteLayout}>
          <Header title="Units" />
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
  const unitsResponse = await api.get('/units');
  const companiesResponse = await api.get('/companies');

  const unitsTableData = unitsResponse.data.map(user => {
    const company = companiesResponse.data.filter(company => company.id === user.companyId);

    return {
      id: user.id,
      name: user.name.replace('Unidade', ''),
      company: company[0].name.replace('Empresa', ''),
    }
  })

  return {
    props: {
      unitsTableData,
    },
    revalidate: 60 * 60 * 24, // seconds * minutes * hours = 24h in seconds 
  }
}