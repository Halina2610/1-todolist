import axios from "axios";

const token = 'd26c1105-920d-4265-95b7-37814656f4a6';

export const commonTs = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "bdcfda08-91c6-49eb-9714-5d59d1951986",
    "Authorization": `Bearer ${token}`
  },
});