export interface UserRegistration {
  email: string;
  login: string;
  password: string;
  phoneNumber: string;
  username: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UserRegistration {
  email: string;
  login: string;
  password: string;
  phoneNumber: string;
  username: string;
}

export interface AuthData {
  login: string;
  password: string;
}
export interface PasswordRequest {
  password: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}

export type ProfileRequest = Partial<
  Pick<Profile, "username" | "email" | "phoneNumber">
>;

export interface PasswordRequest {
  password: string;
}
