import userInteface from "../../types/auth";
import getClientData from "./clientData";
import Cookies from "js-cookie";

interface education {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  user: null | userInteface;
  __v: number;
}

const useClientEducation = getClientData<education>(`education?user=${Cookies.get("MyId")}`)

export default useClientEducation