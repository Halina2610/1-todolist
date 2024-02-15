import { LoginParamsType, ResponseType } from "./todolistApi";
import { instance } from "api/utils/instance";

export const authApi = {
  me() {
    return instance.get<AuthResponseType>("auth/me");
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
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
