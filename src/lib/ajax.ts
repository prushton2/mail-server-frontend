import axios, { AxiosRequestConfig } from "axios";
import { senderAddress } from "./models/senderAddress";
import { Email } from "./models/email";

export const fetchData = {
    fetchMail: async(authToken: string, count: number, page: number, address: string): Promise<{emails: Array<Email>}> => {
        const config: AxiosRequestConfig = {headers: {"Authorization": authToken}} as AxiosRequestConfig;
        const url = `https://api.eastarcti.ca/mail/v1/fetchMail?count=${count}&page=${page}&address=${address}`;
        const response = await axios.get(url, config);
        return response.data;
    },

    fetchAddresses: async(authToken: string): Promise<{ addresses: Array<senderAddress>}> => {
        const config: AxiosRequestConfig = {headers: {"Authorization": authToken}} as AxiosRequestConfig;
        const url = `https://api.eastarcti.ca/mail/v1/fetchAddresses`;
        const response = await axios.get(url, config);
        return response.data;
    }
}

export const Mail = {
    registerEmail: async(address: string, authToken: string): Promise<{success: boolean}> => {
        const config: AxiosRequestConfig = {headers: {"Authorization": authToken}} as AxiosRequestConfig;
        const url = "https://api.eastarcti.ca/mail/v1/registerAddress";
        const response = await axios.post(url, {address: address}, config);
        return response.data;
    }
}