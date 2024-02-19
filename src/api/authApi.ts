import { LoginParamsType } from "./todolistApi";
import { commonTs } from "api/common.ts.";
import {ResponseType} from "types/common.types";

export const authApi = {
  me() {
    return commonTs.get<AuthResponseType>("auth/me");
  },
  login(data: LoginParamsType) {
    return commonTs.post<ResponseType<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return commonTs.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
};

type AuthResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    id: number;
    email: string;
    login: string;
  };
};
