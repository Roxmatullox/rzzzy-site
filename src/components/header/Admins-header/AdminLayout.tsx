import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import "./AdminLayout.css"
import { NavLink } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminsLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  return (
    <Layout className='admin-layout'>
      <Sider className='admin-aside' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/admin-dashboard',
              icon: <UserOutlined />,
              label: <NavLink to="/admin-dashboard">Dashboard</NavLink>,
            },
            {
              key: '/admin-skills',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/admin-skills">Skills</NavLink>,
            },
            {
              key: '/admin-education',
              icon: <UploadOutlined />,
              label: <NavLink to="/admin-education">Educations</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className='admin-main'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminsLayout;
