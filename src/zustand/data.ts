import { create } from "zustand";
import request from "../server";
import { FormInstance, message } from "antd";

interface Skill {
    _id: string;
    name: string;
    percent: number;
    user: null;
    __v: number;
}

function getData<T>(url : string){
  interface DataInterface {
    skills : T[],
    total : number ,
    selected : string | null ,
    search : string ,
    loading : boolean,
    totalPaginate : number ,
    active : number ,
    isModalOpen : boolean ,
    getData : ()=> void ,
    handleOk : (form : FormInstance)=>void,
    editData : ( id : string , form : FormInstance)=>void,
    deleteData : ( id : string)=>void,
    setActive : ( active : number)=>void,
    showModal : (form : FormInstance)=>void,
    handleCancel : ()=>void,
    SerachSkills : (e : React.ChangeEvent<HTMLInputElement>)=>void
  }
  return create<DataInterface>()((set , get) => ({
    skills : [],
    total : 0 ,
    selected : null ,
    search : "" ,
    loading : false,
    totalPaginate : 1 ,
    active : 1 ,
    isModalOpen : false ,
    getData : async ()=> {
      const {search , active} = get()
      const params = {
        search : search ,
        page : active ,
        limit : 12,
      }
      try {
        set((state)=>({...state , loading : true}))
        const {data} = await request.get(url ,{params})
        set((state)=>({...state , skills :data.data , total : data.pagination.total , totalPaginate : Math.ceil(data.pagination.total / 12) }))
      } catch (err) {
        message.error("Server bilan hatolik !")
      } finally {
        set((state)=>({...state , loading : false}))
      }
    } ,
    handleOk : async (form)=>{
      const {selected , getData} = get()
      const values = await form.validateFields()
      try {
        if (selected === null) {
          await request.post(url , values)
          getData()
          set((state)=>({...state , isModalOpen : false}))
        } else {
          await request.put(`${url}/${selected}` , values)
          getData()
          set((state)=>({...state , isModalOpen : false}))
        }
      } catch (err) {
        message.error("Malumot jonatishda hatolik !")
      }
    },
    editData : async (id , form)=>{
      const {data} = await request.get(`${url}/${id}`)
      form.setFieldsValue(data)
      set((state)=>({...state , selected : id , isModalOpen : true}))
    },
    deleteData : async (id)=>{
      const deleteConfirm = confirm("Bu skill ochirilsinmi?")
      if (deleteConfirm) {
        await request.delete(`${url}/${id}`)
        get().getData()
      }
    },
    setActive : (active)=>{
      set((state)=>({...state , active}))
      get().getData()
    },
    showModal : (form)=>{
      form.resetFields()
      set((state)=>({...state , isModalOpen : true}))
    },
    handleCancel : ()=>{
      set((state)=>({...state , isModalOpen : false}))
    },
    SerachSkills : (e)=>{      
      set((state)=>({...state , search : e.target.value}))
      get().getData()
    }
  }))
}

export default getData

getData<Skill>("skills")