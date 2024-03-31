export interface IUserInfo {
  username: string;
  token: string;
  email: string;
  role : string;
}


export class UserInfo implements  IUserInfo{
  username: string;
  token: string;
  email: string;
  role : string;


  constructor(username: string, password: string, token: string, email: string, role: string) {
    this.username = username;
    this.token = token;
    this.email = email;
    this.role = role;
  }
}
