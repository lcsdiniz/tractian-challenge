import { Badge, Descriptions, Image, Layout, Typography } from 'antd';
import "antd/dist/antd.css";
import { GetServerSideProps } from "next";
import Head from 'next/head';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { api } from '../../services/api';
import styles from '../../styles/Assets.module.scss';

type Specifications = {
  maxTemp: number,
  power?: number,
  rpm?: number
}

type Metrics = {
  totalCollectsUptime: number;
  totalUptime: number;
  lastUptimeAt: string;
};

interface AssetDetailsData {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: 70;
  name: string;
  image: string;
  specifications: Specifications;
  metrics: Metrics;
  unit: string;
  company: string;
}

interface AssetDetailsProps {
  assetDetails: AssetDetailsData;
  statusColor: "default" | "success" | "processing" | "error" | "warning";
}

const { Content } = Layout;
const { Title } = Typography;

export default function AssetDetails({ assetDetails, statusColor }: AssetDetailsProps) {

  return (
    <>
      <Head>
        <title>{assetDetails.name} | Tractian Challenge</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar defaultKey="2" />
        <Layout className={styles.siteLayout}>
          <Header title="Assets Details" />
          <Content style={{ margin: 32, padding: 32, backgroundColor: "#FFF" }} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Title level={3}>{assetDetails.name}</Title>
              <Image
                width={350}
                src={assetDetails.image}
              />
            </div>
            <Descriptions
              title="Asset Info"
              bordered
              size='small'
            >
              <Descriptions.Item label="Model" span={2}>{assetDetails.model}</Descriptions.Item>
              <Descriptions.Item label="Company" span={2}>{assetDetails.company}</Descriptions.Item>
              <Descriptions.Item label="Status" span={2}>
                <Badge status={statusColor} text={assetDetails.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Healtscore" span={2}>{assetDetails.healthscore}</Descriptions.Item>
              <Descriptions.Item label="Metrics" span={2}>
                {Object.entries(assetDetails.metrics).map(metric => (
                  <>
                    {`${metric[0]}: ${metric[1]}`}<br />
                  </>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Specifications" span={2}>
                {Object.entries(assetDetails.specifications).map(specification => (
                  <>
                    {`${specification[0]}: ${specification[1]}`}<br />
                  </>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Sensors" span={2}>
                {assetDetails.sensors.map(sensor => (
                  <>
                    {sensor}
                    <br />
                  </>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Unit" span={2}>{assetDetails.unit}</Descriptions.Item>
            </Descriptions>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const assetResponse = await api.get(`/assets/${id}`);

  const companiesResponse = await api.get('/companies');
  const unitsResponse = await api.get('/units');

  const company = companiesResponse.data.filter(company => company.id === assetResponse.data.companyId);
  const unit = unitsResponse.data.filter(unit => unit.id === assetResponse.data.unitId);

  const assetDetails = {
    id: assetResponse.data.id,
    sensors: assetResponse.data.sensors,
    model: assetResponse.data.model.charAt(0).toUpperCase() + assetResponse.data.model.slice(1),
    status: assetResponse.data.status.replace('in', ''),
    healthscore: assetResponse.data.healthscore,
    name: assetResponse.data.name,
    image: assetResponse.data.image,
    specifications: assetResponse.data.specifications,
    metrics: assetResponse.data.metrics,
    unit: unit[0].name.replace('Unidade', ''),
    company: company[0].name.replace('Empresa', ''),
  };

  let statusColor = ''
  switch (assetDetails.status) {
    case 'Alert':
      statusColor = 'warning'
      break;
    case 'Downtime':
      statusColor = 'error'
      break;
    case 'Operation':
      statusColor = 'processing'
      break;
    default:
      statusColor = 'default'
  }

  return {
    props: {
      assetDetails,
      statusColor,
    }
  }
}