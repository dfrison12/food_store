import { Rol } from "./rol";

export interface IUser {
  email: string;
  password: string;
  loggedIn: boolean;
  role: Rol;
}
