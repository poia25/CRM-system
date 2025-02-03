import axios from "axios"; 
import {UserRegistration, Token,AuthData} from "../types/user"

const url = 'https://easydev.club/api/v1'

export const userRegistr = async (userData: UserRegistration): Promise<Token> => {
    const response = await axios.post(`${url}/auth/signup`, userData);
  return response.data;
}
export const userSignIn = async (userLog: AuthData): Promise<Token> => {
    const response = await axios.post(`${url}/auth/signin`, userLog);
  return response.data;
}