import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom"

import { message , Form , Button , Input } from "antd";

import "./HomePage.scss"
import useAuth from "../../zustand/auth";
import { NavLink } from "react-router-dom";

const HomePage = () => {

  const [form] = Form.useForm()

  const [registerForm] = Form.useForm()

  const {login , register } = useAuth()


  // window.addEventListener("load", () => {
  //   setLoading(false)
  // });

  useEffect(()=>{
    message.success("Rzzzy saytiga hush kelibsiz !")
  } , [])

  const location = useLocation()

  const {pathname : page} = location

  type LoginType = {
    username?: string;
    password?: string;
  };

  type RegisterType ={
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }
    
  return (
    <Fragment>
      <section id="home">
        <div className="home">
        </div>
        <div className="three-pages">
          <div className="container">
              {
                page === "/" ? <div className="home-page" >
                  <h1>
                    Welcome to Rzzzy! Register or Login to use the site!
                  </h1>
                  <div className="reg-log">
                    <NavLink to="login">Login</NavLink>
                    <NavLink to="register">Register</NavLink>
                  </div>
                </div> : <></>
              }
              {
                page === "/login" ? <div className="login-page">
                  <h1>Login</h1>
                  <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={()=>login(form)}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item<LoginType>
                      label="Username"
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<LoginType>
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 24}}>
                      <Button type="primary" htmlType="submit">
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div> : <></>
              }{
                page === "/register" ? <div className="register-page" >
                  <h1>Register</h1>
                  <Form
                    name="basic"
                    form={registerForm}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={()=>register(registerForm)}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item<RegisterType>
                      label="Firstname"
                      name="firstName"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<RegisterType>
                      label="Lastname"
                      name="lastName"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<RegisterType>
                      label="Username"
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<RegisterType>
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item<RegisterType>
                      label="Confirm password"
                      name="confirmPassword"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 24}}>
                      <Button type="primary" htmlType="submit">
                        Register
                      </Button>
                    </Form.Item>
                  </Form>
                </div> : <></>
              }
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default HomePage