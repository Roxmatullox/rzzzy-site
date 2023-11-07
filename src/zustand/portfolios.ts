import userInteface from "../types/auth";
import getData from "./data";


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


const usePortfolios = getData<Portfolio>("portfolios")

export default usePortfolios