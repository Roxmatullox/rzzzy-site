import userInteface from "../../types/auth";
import getData from ".././data";
import Cookies from "js-cookie";


interface Portfolio {
  _id: string;
  name: string;
  description: string;
  photo: {
      _id: string;
      name: string;
      user: string;
      __v: number;
  };
  url: string;
  user: null | userInteface;
  __v: number;
}


const useClientPortfolios = getData<Portfolio>(`portfolios?user=${Cookies.get("MyId")}`)

export default useClientPortfolios