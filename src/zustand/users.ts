import getData from "./data";

interface User {
  role: string;
  fields: never[];
  client: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  __v: number;
  photo: string;
}


const useUsers = getData<User>("users")

export default useUsers