import {useEffect} from 'react'
import { Button, Form, Upload, UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { Fragment } from "react";
import useAccount from "../../zustand/account";

import "./AccountPage.scss"

const AccountPage = () => {

  const [form] = useForm()

  const {photo , getUserDatas , handlePhoto , handleOk} = useAccount()

  useEffect(()=>{
    getUserDatas(form)    
  } , [getUserDatas , form , handlePhoto])

  const getImgFile = (file :UploadFile)=>{
    const formData = new FormData()
    if (file.originFileObj) {
      formData.append("file"  , file.originFileObj)
      return formData
    }
  }

  return (
    <Fragment>
        <div className="container">
          <h1 className='account-title'>Account</h1>
            <div className="account-page">
              <div className="account-page-img">
              <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    onChange={(e)=>handlePhoto(getImgFile(e?.file))}
                  >
                    {photo ? (
                      <img
                        src={`https://ap-portfolio-backend.up.railway.app/upload/${photo}`}
                        alt="avatar"
                        style={{
                          width: '100%',
                          height:"100%",
                          objectFit:"cover"
                        }}
                      />
                    ) : (
                      <p>Upload</p>
                    )}
                  </Upload>
              </div>
              <div className="account-page-inputs">
                <Form
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={()=>handleOk(form)}
                  autoComplete="off"
                  form={form}
                >
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input required name="firstName" placeholder="Firstname" type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input required name="lastName" placeholder="Lastname" type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input required  name="username" placeholder="Username" type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Info"
                    name="info"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input name="info" placeholder="Info" type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Phone number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input name="phoneNumber" placeholder="Phone number" type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Birthday"
                    name="birthday"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input name="birthday" placeholder="Birthday" type="date" />
                  </Form.Item>
                  <Form.Item
                    label="Addres"
                    name="address"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input name="address" placeholder="Address" type="text" />  
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input name="email" placeholder="email" type="email" /> 
                  </Form.Item>
                  <Button htmlType="submit">Save</Button>
                </Form> 
              </div>
            {/* <Button type="primary" className="logout-btn">Logout</Button> */}
            </div>
          </div>
        </Fragment>
  )
}

export default AccountPage