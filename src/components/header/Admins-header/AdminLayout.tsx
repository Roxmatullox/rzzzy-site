import { useState , useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex, Modal, Spin } from 'antd';

import "./AdminLayout.css"
import { NavLink } from 'react-router-dom';
import useAccount from '../../../zustand/account';
import { useForm } from 'antd/es/form/Form';
import useAuth from '../../../zustand/auth';
import useMessage from '../../../zustand/message';
import useNoClientUsers from '../../../zustand/noClients';

const { Header, Sider, Content } = Layout;

const AdminsLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  const {getMessages , total} = useMessage()

  const {getData , loading , data , total : noClientsTotal , active , setActive , isModalOpen , showModal , handleCancel , totalPaginate } = useNoClientUsers()

  const {photo , updateRole , refetch , getUserDatas} = useAccount()

  useEffect(()=>{
    getMessages()
    getData()
  } , [getMessages , getData , refetch])
  

  const {logout} = useAuth()

  const [form] = useForm()

  useEffect(()=>{
    getUserDatas(form)    
  } , [getUserDatas , form])

  return (
    <Layout className='admin-layout'>
      <Sider className='admin-aside' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" >{collapsed ? <h1>#R</h1> : <h1>#Rzzzy</h1>}</div>
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
            {
              key: '/admin-users',
              icon: <UserOutlined />,
              label: <NavLink to="/admin-users">Users</NavLink>,
            },
            {
              key: '/admin-portfolios',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/admin-portfolios">Portfolios</NavLink>,
            },
            {
              key: '/admin-experiences',
              icon: <UploadOutlined />,
              label: <NavLink to="/admin-experiences">Experiences</NavLink>,
            },
            {
              key: '',
              style:{
                marginTop:"150%",
                backgroundColor:"red"
              },
              icon: <UploadOutlined />,
              label: <button onClick={logout} style={{
                backgroundColor:"red",
                textAlign:"start",
                border:"none",
                width:"100%"
              }}>Logout</button>,
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
            <div>
            <a style={{
                marginRight:"20px",
                color:"white"
              }} onClick={()=>showModal(form)} >Users ({noClientsTotal})</a>
              <NavLink style={{
                marginRight:"20px",
                color:"white"
              }} to="messages">Messages ({total})</NavLink>
              <NavLink to="my-account">            
                <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
                }}
                style={{
                width:"50px",
                height:"50px",
                objectFit:"cover",
                borderRadius:"50%"
              }}  src={`https://ap-portfolio-backend.up.railway.app/upload/${photo}`} alt="UserLogo" /></NavLink>
            </div>
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
        <Modal
            open={isModalOpen}
            title={`Not clients (${noClientsTotal})`}
            onCancel={handleCancel}
            footer={(_, { CancelBtn }) => (
              <>
                <CancelBtn />
              </>
            )}
          >
            <Spin spinning={loading}>
            {
              data.map((el)=>{
                return <div style={{
                  padding:'7px',
                  marginBottom:"5px",
                  border:"1px solid black",
                  borderRadius:"5px",
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center"
                }}>
                  <p>{el.username}</p>
                  <Button onClick={()=>updateRole(el._id)} type='primary'>Client</Button>
                </div>
              })
            }
            </Spin>
            {
            totalPaginate > 1 ? <section id="pagination">
            <div className="container">
              <div className="pagination-btns">
                <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button>
                <span style={{
                  color:"black"
                }}>{active}</span>
                <button disabled={totalPaginate === active ? true : false} onClick={()=>{setActive(active+1)}}>{">"}</button>
              </div>
            </div>
          </section> : null
          }
          </Modal>
    </Layout>
  );
};

export default AdminsLayout;
