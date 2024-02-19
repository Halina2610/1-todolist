import axios from "axios";

export const commonTs = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "bdcfda08-91c6-49eb-9714-5d59d1951986",
  },
});