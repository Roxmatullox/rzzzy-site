import userInteface from "../types/auth";
import getData from "./data";

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

const useExperiences = getData<Experiences>("experiences")

export default useExperiences