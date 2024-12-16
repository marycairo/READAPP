import axios from 'axios'
import { LoginProps } from '../domain/types'
import { REST_SERVER_URL, USER_KEY_STORAGE } from './config'

const UserService = () => {
  const login = async (props: LoginProps): Promise<void> => {
    try {
      console.log(REST_SERVER_URL)
      const response = await axios.post(`${REST_SERVER_URL}/usuario/login`, props)
      const userID = response.data.userLogedID.toString()
      sessionStorage.setItem(USER_KEY_STORAGE, userID)
    } catch (error) {
      console.error('Error during login:', error)
      throw error 
    }
  }

  return {
    login,
  }
}

export const userService = UserService()