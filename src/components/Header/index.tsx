import React from 'react';
import { Layout, Typography, Avatar, Divider } from 'antd';
import "antd/dist/antd.css";
const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;
import {
  UserOutlined
} from '@ant-design/icons';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <AntHeader className="site-layout-background" style={{ display: 'flex', alignItems: 'center', padding: '0px 20px', background: '#FFF', justifyContent: 'space-between', }}>
      <Title level={3} style={{ margin: 0 }}>{title}</Title>
      <div>
        <Avatar icon={<UserOutlined />} />
        <Text style={{ marginLeft: 6 }}>Test Tractian</Text>
        <Divider type="vertical" />
        <Text>test@tractian.com</Text>
      </div>
    </AntHeader>
  );
}