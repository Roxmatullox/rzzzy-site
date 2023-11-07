import { useState , useEffect , Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex } from 'antd';

import Cookies from 'js-cookie';

import lock from "../../../assets/lock.png";

import "./ClientLayout.css"
import { NavLink } from 'react-router-dom';
import useAccount from '../../../zustand/account';
import { useForm } from 'antd/es/form/Form';
import useAuth from '../../../zustand/auth';
import useMessage from '../../../zustand/message';

const { Header, Sider, Content } = Layout;

const ClientLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  const {handleMessage , message , handleOk} = useMessage()

  const {photo , getUserDatas} = useAccount()

  const {logout} = useAuth()

  const [form] = useForm()

  useEffect(()=>{
    getUserDatas(form)    
  } , [getUserDatas , form])

  const role = Cookies.get("userData")
  

  return (
    <Layout className='admin-layout'>
      {
        role === "user" ? <Fragment>
          <div style={{
          position : "fixed" ,
          top:"0",
          bottom:"0",
          left:"0",
          right:"0",
          backgroundColor : "white",
          opacity:"0.8",
          zIndex:"1000000",
        }}></div>
        <div style={{
          position : "fixed" ,
          top:"0",
          bottom:"0",
          left:"0",
          right:"0",
          zIndex:"1000000",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
        }}>
            <img style={{
              width:"100px"
            }} src={lock} alt="Locked" />
            <h1 style={{
              maxWidth:"500px",
              textAlign:"center",
              marginTop:"20px"
            }}>These pages do not match your role. Request sent to admin just wait {")"}</h1>
            <input value={message} onChange={(e)=>handleMessage(e)} className='message-input' placeholder='Message(Optional)' type="text" />
            <button onClick={handleOk} style={{
                backgroundColor:"blue",
                color:"white",
                textAlign:"start",
                border:"none",
                padding:" 10px 20px",
                borderRadius:"10px"
              }}>Send</button>
            <button onClick={logout} style={{
                backgroundColor:"red",
                textAlign:"start",
                border:"none",
                marginTop:"100px",
                padding:" 10px 20px",
                borderRadius:"10px"
              }}>Logout</button>
        </div>
        </Fragment> : <div></div>
      }
      <Sider className='admin-aside' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" >{collapsed ? <h1>#R</h1> : <h1>#Rzzzy</h1>}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/client-dashboard',
              icon: <UserOutlined />,
              label: <NavLink to="/client-dashboard">Dashboard</NavLink>,
            },
            {
              key: '/client-skills',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/client-skills">Skills</NavLink>,
            },
            {
              key: '/client-education',
              icon: <UploadOutlined />,
              label: <NavLink to="/client-education">Educations</NavLink>,
            },
            {
              key: '/client-portfolios',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/client-portfolios">Portfolios</NavLink>,
            },
            {
              key: '/client-experiences',
              icon: <UploadOutlined />,
              label: <NavLink to="/client-experiences">Experiences</NavLink>,
            },
            {
              key: '',
              style:{
                marginTop:"170%",
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
            <NavLink style={{
              position:"relative",
              right:"50px",
              top:"-25px"
            }} to="my-account">            
              <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
              }}
               style={{
              width:"50px",
              height:"50px",
              objectFit:"cover",
              borderRadius:"50%",
              position:"absolute",
              zIndex:"122222222"
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

export default ClientLayout;
