// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

// Интерфейс пользователя
export interface BaseUser {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  phoneNumber: string;
  roles:Roles[];
  isAdmin: boolean
}
// Интерфейс метаинформации

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  "roles": Roles[]; // при вызове этой апи роли будут обновлены к тому массиву который будет передан
  // например если у вас была roles: \['ADMIN'\] а вы хотите добавить \['MODERATOR'\] то нужно передавать
  // старые + новые - roles: \['ADMIN', 'MODERATOR'\]
}

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}
// Интерфейс для обновления данных пользователя
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

export interface RefreshToken {
  refreshToken: string;
}

export type ProfileRequest = Partial<Pick<BaseUser, 'username' | 'email' | 'phoneNumber'>>

export interface PasswordRequest {
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
