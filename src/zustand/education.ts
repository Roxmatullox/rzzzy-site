import getData from "./data";

interface education {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  user: null;
  __v: number;
}

const useEducation = getData<education>("education")

export default useEducation