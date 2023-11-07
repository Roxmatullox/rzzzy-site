import { create } from 'zustand'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { FormInstance, message } from 'antd';
import request from '../server';
import userInteface from '../types/auth';
import Cookies from 'js-cookie';


interface AccountInterface {
  userDatas : null | userInteface,
  photo : null | string,
  refetch : boolean ,
  getUserDatas : (form : FormInstance)=> void,
  handlePhoto : (file : FormData | undefined)=>void,
  handleOk : (form : FormInstance)=>void,
  updateRole:(id : string)=>void
}

const useAccount = create<AccountInterface>()((set , get)=>({
  userDatas : null,
  photo : null,
  refetch : false ,
  getUserDatas : async (form)=>{
    try {
      const {data} = await request.get("auth/me")
      const values = {...data , birthday : data?.birthday?.split("T")[0]}
      form.setFieldsValue(values)
      Cookies.set("userData" , values?.role)
      set((state)=>({...state , userDatas : data , photo : data?.photo}))
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
  },
  updateRole: async(id)=>{
    const values = {
      role : "client"
    }
    try {
      await request.put(`users/${id}` , values)
      set({refetch : !get().refetch})
    } catch (arr) {
      message.error("Hatolik ! , Birozdan keyin qayta urining !")
    }
  }
}))

export default useAccount
