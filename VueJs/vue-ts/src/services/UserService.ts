import axios from 'axios';

export interface User{
  id:number;
  login:string;
}

export interface IUserService {
  getUsers(): Promise<User[]>;
}

export default class UserService implements IUserService{
  public async getUsers(): promise<User[]>{
    const res = await axios.get('https://api.github.com/users')
    return res.data;
  }
}