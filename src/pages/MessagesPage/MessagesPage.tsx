import {useEffect} from 'react'
import useMessage from '../../zustand/message'
import { Button, Spin } from 'antd'

const MessagesPage = () => {

  const { messages , loading , getMessages , total , setActive , totalPaginate , active , updateMessage } = useMessage()

  useEffect(()=>{
    getMessages()
  } , [getMessages])

  return (
    <Spin spinning={loading}>
      <div className="messages">
        <h1 style={{
          color:"white"
        }}>Messages ({total})</h1>
        <div className="all-messages">
          {
            messages?.map((el)=>{
              return <div className="message" style={{
                width:"100%",
                padding:"20px",
                backgroundColor:"white",
                borderRadius:"10px",
                marginBottom:"10px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
              }}>
                <div>
                  <h2>{el.title}</h2>
                  <h4>{el.message}</h4>
                </div>
                <div>
                  <Button type="primary" onClick={()=>updateMessage(el._id)}>Show</Button>
                </div>
              </div>
            })
          }
        </div>
      </div>
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
    </Spin>
  )
}

export default MessagesPage