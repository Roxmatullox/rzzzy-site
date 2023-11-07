import { create } from 'zustand'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { message } from 'antd';
import request from '../server';
import Cookies from 'js-cookie';

interface Message {
  answer: string;
  show: boolean;
  _id: string;
  title: string;
  user: string;
  message: string;
  whom: {
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
  };
  __v: number;
}


interface message {
  message:string,
  total : number ,
  loading : boolean ,
  totalPaginate : number,
  active:number,
  messages : null | Message[] ,
  getMessages:()=>void,
  handleMessage : (e : React.ChangeEvent<HTMLInputElement>)=>void,
  handleOk : ()=>void,
  setActive:(active : number)=>void,
  updateMessage:(id:string)=>void
}

const useMessage = create<message>()((set , get)=>({
  message : "",
  loading:false,
  messages : null ,
  total : 0 ,
  totalPaginate : 1 ,
  active : 1 ,
  getMessages : async ()=>{
    const params ={
      whom:"6540ec19ad767e0018d609de",
      show:true,
      page:get().active,
      limit:10
    }
    try {
      set({loading:true})
      const {data} = await request.get("messages" , {params})
      set({messages : data.data , total : data.pagination.total , totalPaginate : Math.ceil(data.pagination.total / 10) , loading:false})
    } catch (err) {
      message.error("Server bilan hatolik !")
    }
  },
  handleMessage :(e)=>{
    set({message : e.target.value})
  },
  handleOk : async ()=>{
    const message1 = {
      title : "New user !",
      message : get().message,
      whom : "6540ec19ad767e0018d609de",
      user : `${Cookies.get("MyId")}`
    }
    try {
      await request.post("messages" , message1)
      message.success("Habar jonatildi !")
      set({message : ""})
    } catch (err) {
      message.error("Hatolik , qayta jonating !")
    }
  },
  setActive : (active)=>{
    set((state)=>({...state , active}))
    get().getMessages()
  },
  updateMessage: async(id)=>{
    const values ={
      show : "false"
    }
    try {
      await request.put(`messages/${id}` , values)
      get().getMessages()
    } catch (err) {
      message.error("Hatolik ! Birozdan keyin urining !")
    }
  }
}))

export default useMessage