export interface UserBase {
  user: string;
  password: string;
}

export interface User extends UserBase {
  role: string;
}

export type Credentials = User; 

export type UserWithoutRole = UserBase; 
