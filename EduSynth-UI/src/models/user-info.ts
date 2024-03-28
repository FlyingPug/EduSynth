export class UserInfo {
  username: string | null;
  token: string | null;
  email: string | null;
  role : string | null;


  constructor(username: string | null, password: string | null, token: string | null, email: string | null, role: string | null) {
    this.username = username;
    this.token = token;
    this.email = email;
    this.role = role;
  }
}
