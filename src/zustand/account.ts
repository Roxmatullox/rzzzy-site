import { create } from 'zustand'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { FormInstance, message } from 'antd';
import request from '../server';

interface userDatas {
   role: string;
    fields: string[];
    client: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    createdAt: string;
    __v: number;
    address: string;
    birthday: string;
    email: string;
    facebook: string ;
    github: string ; 
    info: string; 
    instagram: string ;
    phoneNumber: string;
    telegram: string ; 
    youtube: string  ;
    photo: string ;
}

interface AccountInterface {
  userDatas : null | userDatas,
  photo : null | string
  getUserDatas : (form : FormInstance)=> void,
  handlePhoto : (file : FormData | undefined)=>void,
  handleOk : (form : FormInstance)=>void
}

const useAccount = create<AccountInterface>()((set)=>({
  userDatas : null,
  photo : null,
  getUserDatas : async (form)=>{
    try {
      const {data} = await request.get("auth/me")
      const values = {...data , birthday : data.birthday.split("T")[0]}
      form.setFieldsValue(values)
      set((state)=>({...state , userDatas : data , photo : data.photo}))
    } catch (err) {
      message.error("Serverda hatolik !")
    }
  },
  handlePhoto : async(file)=>{
    try {
      const {data} = await request.post("auth/upload" , file)
      set((state)=>({...state , photo : data}))
    } catch (err) {
      message.error("Malumot jonatishda hatolik !")
    }
  },
  handleOk : async (form)=>{
    const values = await form.validateFields()
    try {
      await request.put("auth/updatedetails" , values)
    } catch (err) {
      message.error("Malumot jonatishda hatolik !")
    }
  }
}))

export default useAccount
