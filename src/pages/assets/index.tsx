import {
  OrderedListOutlined, PieChartOutlined
} from '@ant-design/icons';
import { Button, Layout, message, Select, Table, Tabs, Tag } from 'antd';
import "antd/dist/antd.css";
import { GetStaticProps } from "next";
import Head from 'next/head';
import Link from 'next/link';
import HealthScoreBarChart from '../../components/Charts/HealthscoreBarChart';
import MaxTemperatureBarChart from '../../components/Charts/MaxTemperatureBarChart';
import ModelPieChart from '../../components/Charts/ModelPieChart';
import StatusPieChart from '../../components/Charts/StatusPieChart';
import TotalUptimeBarChart from '../../components/Charts/TotalUptimeBarChart';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { api } from '../../services/api';
import styles from '../../styles/Assets.module.scss';
import { AssetType, CompanyType, UnitType, UserType } from '../../types/types';

const { Option } = Select;
const { TabPane } = Tabs;

type AssetsTableData = {
  id: number;
  model: string;
  status: string;
  name: string;
}

interface AssetsProps {
  assetsTableData: AssetsTableData[];
  assetsList: AssetType[];
  usersList: UserType[];
  companiesList: CompanyType[],
  unitsList: UnitType[],
}

export default function Assets({ assetsTableData, assetsList, companiesList, unitsList, usersList }: AssetsProps) {
  const tableData = assetsTableData;


  const updateAsset = (id: string | number) => {
    setTimeout(() => {
      message.success('Asset updated!');
    }, 1500);
  };
  
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  
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
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = ''
        switch (status) {
          case 'Alert':
            color = 'warning'
            break;
          case 'Downtime':
            color = 'error'
            break;
          case 'Operation':
            color = 'processing'
            break;
          default:
            color = 'default'
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        )
      }
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (unit) => 
        <Select style={{ width: 150 }} placeholder="Select user" defaultValue={unit} onChange={handleChange}>
          {unitsList.map(unit => (
            <Option key={unit.id} value={unit.name}>{unit.name}</Option>
          ))}
        </Select>,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company) => 
        <Select style={{ width: 150 }} placeholder="Select user" defaultValue={company} onChange={handleChange}>
          {companiesList.map(company => (
            <Option key={company.id} value={company.name}>{company.name}</Option>
          ))}
        </Select>,
    },
    {
      title: 'User in charge',
      dataIndex: 'userincharge',
      key: 'userincharge',
      render: () => 
        <Select style={{ width: 150 }} placeholder="Select user" onChange={handleChange}>
          {usersList.map(user => (
            <Option key={user.id} value={user.name}>{user.name}</Option>
          ))}
        </Select>,
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: (_, record: { id: React.Key }) => <Link href={`/assets/${record.id}`}>Details</Link>,
    },
    {
      title: '',
      dataIndex: 'Save',
      key: 'save',
      render: (_, record: { id: React.Key }) => <Button onClick={() => updateAsset(record.id)} >Save</Button>,
    },
  ];

  return (
    <>
      <Head>
        <title>Assets | Tractian Challenge</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar defaultKey="1" />
        <Layout className={styles.siteLayout}>
          <Header title="Assets" />
          <Tabs defaultActiveKey="1" type="card" style={{ padding: '16px 32px' }}>
            <TabPane
              tab={
                <span>
                  <OrderedListOutlined />
                  List
                </span>
              }
              key="1"
            >
              <Table dataSource={tableData} columns={columns} rowKey="id" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <PieChartOutlined />
                  Charts
                </span>
              }
              key="2"
            >
              <>
                <div style={{display: 'flex', marginBottom: 60, justifyContent: 'space-evenly'}}>
                  <ModelPieChart chartData={assetsList} />
                  <StatusPieChart chartData={assetsList} />
                </div>
                <div style={{display: 'flex', marginBottom: 60, justifyContent: 'space-evenly'}}>
                  <HealthScoreBarChart chartData={assetsList} />
                  <TotalUptimeBarChart chartData={assetsList} />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <MaxTemperatureBarChart chartData={assetsList} />
                </div>
              </>
            </TabPane>
          </Tabs>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const assetsResponse = await api.get('/assets');
  const usersResponse = await api.get('/users');
  const companiesResponse = await api.get('/companies');
  const unitsResponse = await api.get('/units');

  const assetsTableData = assetsResponse.data.map((asset: AssetType) => {
    const { id, model, status, name } = asset;
    const company = companiesResponse.data.filter((company: CompanyType) => company.id === asset.companyId);
    const unit = unitsResponse.data.filter((unit: UnitType)=> unit.id === asset.unitId);

    const formattedModel = model.charAt(0).toUpperCase() + model.slice(1);
    const formattedStatus = status.replace('in', '');

    return {
      id,
      unit: unit[0].name,
      company: company[0].name,
      model: formattedModel,
      status: formattedStatus,
      name,
    }
  });

  return {
    props: {
      assetsTableData,
      assetsList: assetsResponse.data,
      usersList: usersResponse.data,
      companiesList: companiesResponse.data,
      unitsList: unitsResponse.data,
    },
    revalidate: 60 * 60 * 24, // seconds * minutes * hours = 24h in seconds 
  }
}