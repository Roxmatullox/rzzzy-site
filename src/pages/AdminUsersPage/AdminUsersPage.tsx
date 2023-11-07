import { Fragment , useEffect } from "react"
import { Button, Flex, Form, Image, Input, Modal, Space, Table, Upload, UploadFile } from "antd"
import { useForm } from "antd/es/form/Form"
import useUsers from "../../zustand/users"

const AdminUsersPage = () => {
  
  const {total , photo , selected , loading , isModalOpen , active , totalPaginate , data , handlePhoto , getData , editData , deleteData , SerachSkills , setActive , showModal , handleCancel , handleOk} = useUsers()

  const [form] = useForm()

  useEffect(()=>{
    getData()
  } , [getData])

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render : (data : string) => {
        return (<Space size="middle" >
            
          <Image style={{
            width:"50px",
            height:"50px",
            // objectFit:"cover",
            borderRadius:"50%"
          }}  src={`https://ap-portfolio-backend.up.railway.app/upload/${data}`}/>
        </Space>)
      }
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Firstname',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render : (data : string) => {
        return (<Space size="middle" >
          <Button onClick={()=>editData(data , form)} type="primary" >Edit</Button>
          <Button onClick={()=>deleteData(data)} type="primary" style={{
            backgroundColor:"red"
          }} >Delete</Button>
        </Space>)
      }
    },
  ];

  const getImgFile = (file :UploadFile)=>{
    const formData = new FormData()
    if (file.originFileObj) {
      formData.append("file"  , file.originFileObj)
      return formData
    }
  }

  return (
    <Fragment>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={(e)=>SerachSkills(e)} type="text" placeholder="Search..." />
            <button className="modal-open" onClick={()=>showModal(form)}>Create user</button>
          </div>
        </div>
      </section>            
      <Table loading={loading} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Users ({total})</h2>
        </Flex>
      )} pagination={false} dataSource={data} columns={columns} />
      {
            totalPaginate > 1 ? <section id="pagination">
            <div className="container">
              <div className="pagination-btns">
                <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button>
                <span>{active}</span>
                <button disabled={totalPaginate === active ? true : false} onClick={()=>{setActive(active+1)}}>{">"}</button>
              </div>
            </div>
          </section> : null
          }
          <Modal
            open={isModalOpen}
            title="Title"
            onCancel={handleCancel}
            footer={(_, { CancelBtn }) => (
              <>
                <CancelBtn />
              </>
            )}
          >
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
                        }}
                      />
                    ) : (
                      <p>Upload</p>
                    )}
                  </Upload>

                    <Form.Item
                      label="Firstname"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input workname name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Lastname"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input companyName description!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Info"
                      name="info"
                      rules={[
                        {
                          required: true,
                          message: 'Please input description description!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Please input startDate description!',
                        },
                      ]}
                    >
                      <Input/>
                    </Form.Item>

                    {
                      selected !== null ? <></> : <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input endDate description!',
                        },
                      ]}
                    >
                      <Input/>
                    </Form.Item>
                    }

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button
                      style={{
                        width:"100%"
                      }} type="primary" htmlType="submit">
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
          </Modal>
    </Fragment>
  )
}

export default AdminUsersPage