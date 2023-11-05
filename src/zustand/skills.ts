// import { create } from "zustand";
// import request from "../server";
// import { FormInstance, message } from "antd";
import getData from "./data";

interface Skill {
    _id: string;
    name: string;
    percent: number;
    user: null;
    __v: number;
}

// interface SkillsInterface {
//   skills : Skill[],
//   total : number ,
//   selected : string | null ,
//   search : string ,
//   loading : boolean,
//   totalPaginate : number ,
//   active : number ,
//   isModalOpen : boolean ,
//   getSKills : ()=> void ,
//   handleOk : (form : FormInstance)=>void,
//   editData : ( id : string , form : FormInstance)=>void,
//   deleteData : ( id : string)=>void,
//   setActive : ( active : number)=>void,
//   showModal : (form : FormInstance)=>void,
//   handleCancel : ()=>void,
//   SerachSkills : (e : React.ChangeEvent<HTMLInputElement>)=>void
// }


// const useData = create<SkillsInterface>()((set , get) => ({
//   skills : [],
//   total : 0 ,
//   selected : null ,
//   search : "" ,
//   loading : false,
//   totalPaginate : 1 ,
//   active : 1 ,
//   isModalOpen : false ,
//   getSKills : async ()=> {
//     const {search , active} = get()
//     const params = {
//       search : search ,
//       page : active ,
//       limit : 12,
//     }
//     try {
//       set((state)=>({...state , loading : true}))
//       const {data} = await request.get("skills" ,{params})
//       set((state)=>({...state , skills :data.data , total : data.pagination.total , totalPaginate : Math.ceil(data.pagination.total / 12) }))
//     } catch (err) {
//       message.error("Server bilan hatolik !")
//     } finally {
//       set((state)=>({...state , loading : false}))
//     }
//   } ,
//   handleOk : async (form)=>{
//     const {selected , getSKills} = get()
//     const values = await form.validateFields()
//     try {
//       if (selected === null) {
//         await request.post("skills" , values)
//         getSKills()
//         set((state)=>({...state , isModalOpen : false}))
//       } else {
//         await request.put(`skills/${selected}` , values)
//         getSKills()
//         set((state)=>({...state , isModalOpen : false}))
//       }
//     } catch (err) {
//       message.error("Malumot jonatishda hatolik !")
//     }
//   },
//   editData : async (id , form)=>{
//     const {data} = await request.get(`skills/${id}`)
//     form.setFieldsValue(data)
//     set((state)=>({...state , selected : id , isModalOpen : true}))
//   },
//   deleteData : async (id)=>{
//     const deleteConfirm = confirm("Bu skill ochirilsinmi?")
//     if (deleteConfirm) {
//       await request.delete(`skills/${id}`)
//       get().getSKills()
//     }
//   },
//   setActive : (active)=>{
//     set((state)=>({...state , active}))
//     get().getSKills()
//   },
//   showModal : (form)=>{
//     form.resetFields()
//     set((state)=>({...state , isModalOpen : true}))
//   },
//   handleCancel : ()=>{
//     set((state)=>({...state , isModalOpen : false}))
//   },
//   SerachSkills : (e)=>{
//     set((state)=>({...state , search : e.target.value}))
//     get().getSKills()
//   }
// }))

const useData = getData<Skill>("skills")

export default useData