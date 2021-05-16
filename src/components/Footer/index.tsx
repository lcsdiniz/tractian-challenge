import { Layout } from 'antd';
import "antd/dist/antd.css";

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', marginTop: 'auto' }}>Tractian Challenge ©2021 Created by Lucas Diniz</AntFooter>
  )
}