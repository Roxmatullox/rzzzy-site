import { create } from "zustand";
import request from "../server";
import { FormInstance, message } from "antd";

function getData<T>(url : string){
  interface DataInterface {
    data : T[],
    total : number ,
    photo : string | null ,
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
    SerachSkills : (e : React.ChangeEvent<HTMLInputElement>)=>void,
    handlePhoto : ( file : FormData | undefined )=>void,
  }
  return create<DataInterface>()((set , get) => ({
    data : [],
    total : 0 ,
    photo : null ,
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
        set((state)=>({...state , data :data.data , total : data.pagination.total , totalPaginate : Math.ceil(data.pagination.total / 12) }))
      } catch (err) {
        message.error("Server bilan hatolik !")
      } finally {
        set((state)=>({...state , loading : false}))
      }
    } ,
    handleOk : async (form)=>{
      const {selected , getData} = get()
      const oldValues = await form.validateFields()
      const values = get().photo ? {...oldValues , photo : get().photo} : {...oldValues}
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
      const values = data.endDate ? {...data , endDate:data.endDate.split("T")[0] , startDate:data.startDate.split("T")[0]} : {...data}
      set((state)=>({...state , photo : values.photo}))
      form.setFieldsValue(values)
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
      set((state)=>({...state , selected : null , photo : null , isModalOpen : true}))
    },
    handleCancel : ()=>{
      set((state)=>({...state , isModalOpen : false , selected : null}))
    },
    SerachSkills : (e)=>{      
      set((state)=>({...state , search : e.target.value}))
      get().getData()
    },
    handlePhoto : async (file)=>{
      const {data : photo} = await request.post("upload" , file)
      const userPhoto = `${photo._id}.${photo.name.split(".")[1]}`      
      // const {data} = get()
      // const values = {
      //   ...data , photo : userPhoto
      // }
      set((state)=>({...state , photo : userPhoto}))
    },
  }))
}

export default getData
