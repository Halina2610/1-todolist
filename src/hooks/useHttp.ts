import axios, { AxiosResponse } from "axios";

type useHttpReturnValues = {
    get: (url: string) => any,
    post: (url: string, body: any) => any
}
export const useHttp = (): useHttpReturnValues => {
    const get = async (url: string) => {
        const data = await axios.get(url)
        return data.data
    }

    const post = async (url: string, body: any) => {
        const data = await axios.post(url, body)
        return data.data

    }


    return {
        get,
        post
    }

}
