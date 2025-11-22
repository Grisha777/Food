import axios from "axios";
import { BASE_URL, BASE_URL_ID } from '@/constants/api';

export const getData = async () => {
    const response = await axios.get(BASE_URL);
    return response.data
}

export const getId = async (id) => {
    const response = await axios.get(`${BASE_URL_ID}${id}`);
    return response.data;
};