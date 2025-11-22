import axios from "axios";
import { BASE_URL } from '@/constants/api';

export const getData = async () => {
    const data = await axios.get(BASE_URL);
    return data
}