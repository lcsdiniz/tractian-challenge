import {
  DashboardOutlined,
  GoldOutlined,


  LogoutOutlined, ShopOutlined, TeamOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface SideBarProps {
  defaultKey: string;
}

const { Sider } = Layout;

export default function SideBar({ defaultKey }: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>
      <Link href="/main">
        <a>
          <img className="logo"src="https://imgix.tractian.com/images/Logo-Tractian.svg" alt="Logo" />
        </a>
      </Link>
        </div>
      <Menu theme="dark" defaultSelectedKeys={[defaultKey]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link href="/assets">
            Assets
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <Link href="/users">
            Users
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<GoldOutlined />}>
          <Link href="/units">
            Unidades
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ShopOutlined />}>
          <Link href="/companies">
            Companies
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          <Link href="/">
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
