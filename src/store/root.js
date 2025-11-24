import { ref } from 'vue'
import { defineStore } from 'pinia'
import { General } from '@/services'

export const useRootStore = defineStore('root', () => {
    const areas = ref(null)
    const categories = ref(null)
    const ingredients = ref(null)

    async function getAreas() {
        const data = await General.getAreas()
        areas.value = data
    }

    async function getCategories() {
        try {
            const data = await General.getCategories();
            categories.value = data;
            console.log('Данные в store:', data);
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
        }
    }

    async function getIngredients() {
        const data = await General.getIngredients();
        ingredients.value = data;
    }

    return { areas, categories, ingredients, getAreas, getCategories, getIngredients}
})