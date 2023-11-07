import userInteface from "../../types/auth";
import getData from ".././data";
import Cookies from "js-cookie";


interface Experiences {
  _id: string;
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  user : null | userInteface ;
  __v: number;
}


const useClientExperiences = getData<Experiences>(`experiences?user=${Cookies.get("MyId")}`)

export default useClientExperiences