import { message , FormInstance } from "antd";

import Cookies from "js-cookie"

import { create } from 'zustand'
import request from "../server";
interface AuthInterface {
  isLogin : boolean,
  role : string | null,
  login :(form : FormInstance)=>void,
  register :(form : FormInstance)=>void,
  logout : ()=>void
}

const useAuth = create<AuthInterface>()((set , get) => ({
  isLogin : Boolean(Cookies.get("isLogin")),
  role : `${Cookies.get("userData")}` ,
  login: async (form)=>{
    try {
      const values = await form.validateFields()
      const {data} = await request.post("auth/login" , values)
      set((state)=>({...state , isLogin : true , role : data.user.role}))      
      Cookies.set("isLogin" , data.token)
      Cookies.set("userData" , data.user.role)
      if (get().role === "admin") {
        window.location.replace("/admin-dashboard")
      } else{
        window.location.replace("/client-dashboard")
      }
    } catch (err) {      
      message.error("Hatolik ! Qayta urining !")
    }
  },

  register : async (form)=>{
    try {
      const values = await form.validateFields()
      if (values.confirmPassword === values.password) {
        const {data} = await request.post("auth/register" , values)
        set((state)=>({...state , isLogin : true , role : data.user.role}))      
        Cookies.set("isLogin" , data.token)
        Cookies.set("userData" , data.user.role)
        if (get().role === "admin") {
          window.location.replace("/admin-dashboard")
        } else{
          window.location.replace("/client-dashboard")
        }
      } else {
        message.error("Parollarni qayta tekshiring !")
      }
    } catch (err) {
      message.error("Hatolik ! Qayta urining !")
    }
  },
  logout : ()=>{
      const logoutConfirm = confirm("Akkountdan chiqasizmi ?")
      if (logoutConfirm) {
        Cookies.remove("isLogin")
        Cookies.remove("userData")
        window.location.replace("/")
      } else{
        window.location.replace("/")
      }
  }
}))


export default useAuth