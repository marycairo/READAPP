import { LoginProps } from "../domain/types";

export const formToJSON = (data: { userName: string; password: string }): LoginProps => {
  return {
    userName: data.userName,
    password: data.password
  };
};

