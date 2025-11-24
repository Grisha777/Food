import axios from "axios";
import { BASE_URL_AREAS, BASE_URL_CATEGORIES, BASE_URL_INDREDIENTS } from '@/api/api';

export const getAreas = async () => {
    const response = await axios.get(BASE_URL_AREAS)
    return response.data.meals
}

export const getCategories = async () => {
    const response = await axios.get(BASE_URL_CATEGORIES)
    return response.data.meals
};

export const getIngredients = async () => {
    const response = await axios.get(BASE_URL_INDREDIENTS)
    return response.data
};