import { useState , useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex } from 'antd';

import "./AdminLayout.css"
import { NavLink } from 'react-router-dom';
import useAccount from '../../../zustand/account';
import { useForm } from 'antd/es/form/Form';

const { Header, Sider, Content } = Layout;

const AdminsLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  const {photo , getUserDatas} = useAccount()

  const [form] = useForm()

  useEffect(()=>{
    getUserDatas(form)    
  } , [getUserDatas , form])

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
          <Flex justify='space-between' align='center' style={{
            padding:"0 20px"
          }} >
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
            <NavLink to="my-account">            
              <img style={{
              width:"50px",
              height:"50px",
              objectFit:"cover",
              borderRadius:"50%"
            }}  src={`https://ap-portfolio-backend.up.railway.app/upload/${photo}`} alt="UserLogo" /></NavLink>
          </Flex>
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
