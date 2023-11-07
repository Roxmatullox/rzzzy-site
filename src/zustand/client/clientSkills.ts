import userInteface from "../../types/auth";
import getClientData from "./clientData";
import Cookies from "js-cookie";



interface Skill {
    _id: string;
    name: string;
    percent: number;
    user: null | userInteface;
    __v: number;
}

const useClientSkills = getClientData<Skill>(`skills?user=${Cookies.get("MyId")}`)

export default useClientSkills