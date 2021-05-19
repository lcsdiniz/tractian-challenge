import { Layout, Table } from 'antd';
import "antd/dist/antd.css";
import { GetStaticProps } from "next";
import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { api } from '../services/api';
import styles from '../styles/Assets.module.scss';
import { CompanyType, UnitType, UserType } from '../types/types';

const { Content } = Layout;

type UsersTableData = {
  id: number,
  email: string,
  name: string,
  unitId: number,
  companyId: number
}

interface UsersProps {
  usersTableData: UsersTableData[];
}


export default function Users({ usersTableData }: UsersProps) {

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id', 
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
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
        <title>Users | Tractian Challenge</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar defaultKey="2" />
        <Layout className={styles.siteLayout}>
          <Header title="Users" />
          <Content style={{ padding: "0 32px" }}>
            <div className={styles.siteLayoutBackground} style={{ marginTop: 16, minHeight: 360 }}>
              <Table dataSource={usersTableData} columns={columns} rowKey="id" />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const usersResponse = await api.get('/users');
  const companiesResponse = await api.get('/companies');
  const unitsResponse = await api.get('/units');

  const usersTableData = usersResponse.data.map((user: UserType) => {
    const company = companiesResponse.data.filter((company: CompanyType) => company.id === user.companyId);
    const unit = unitsResponse.data.filter((unit: UnitType) => unit.id === user.unitId);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      unit: unit[0].name,
      company: company[0].name,
    }
  })

  return {
    props: {
      usersTableData,
    }
  }
}