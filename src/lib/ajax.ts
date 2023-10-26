import axios, { AxiosRequestConfig } from "axios";
import { senderAddress } from "./models/senderAddress";

export const fetchData = {
    // fetchMail: async(authToken, count, page, address) => {
    //     const headers = {"Authorization": authToken};
    //     const url = `https://api.eastarcti.ca/mail/v1/fetchMail?count=${count}&page=${page}&address=${address}`; //idfk yet
    //     const response = await axios.get(url, {}, headers);
    //     return response.data;
    // },

    fetchAddresses: async(authToken: string): Promise<{ addresses: Array<senderAddress>}> => {
        const config: AxiosRequestConfig = {headers: {"Authorization": authToken}} as AxiosRequestConfig;
        const url = `https://api.eastarcti.ca/mail/v1/fetchAddresses`;
        const response = await axios.get(url, config);
        return response.data;
    }
}