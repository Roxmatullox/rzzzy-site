import { create } from "zustand";
import request from "../../server";
import { message } from "antd";


function getClientData<T>(url : string){
  interface DataInterface {
    data : T[],
    total : number ,
    search : string ,
    loading : boolean,
    totalPaginate : number ,
    active : number ,
    getData : ()=> void ,
    setActive : ( active : number)=>void,
    SerachSkills : (e : React.ChangeEvent<HTMLInputElement>)=>void,
    }
  return create<DataInterface>()((set , get) => ({
    data : [],
    total : 0 ,
    search : "" ,
    loading : false,
    totalPaginate : 1 ,
    active : 1 ,
    getData : async ()=> {
      const {search , active} = get()
      const params = {
        search : search ,
        page : active,
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
    setActive : (active)=>{
      set((state)=>({...state , active}))
      get().getData()
    },
    SerachSkills : (e)=>{      
      set((state)=>({...state , search : e.target.value}))
      get().getData()
    }
  }))
}

export default getClientData
