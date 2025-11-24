<script setup>
    import { ref, onMounted } from 'vue'
    import { Recipes } from '@/services'
    import Layout from '@/layouts/Layout.vue'
    import Button from '@/components/Button.vue'
    import Loader from '@/components/Loader.vue'

    const recipes = ref([])
    const isLoading = ref(false)

    const fetch = async () => {
        try {
            isLoading.value = true
            const data = await Recipes.getData()
            recipes.value = data.meals || []
            isLoading.value = false
        } catch (error) {
            console.log('Данные не пришли', error)
            recipes.value = []
        }
    }

    const getPath = (id) => {
        return `/recipe/${id}`
    }

    onMounted(fetch)
</script>

<template>
    <Layout>
        <template #title>Блюда</template>
        <template #controls>
            <RouterLink :to="getPath('new')">
                <Button text="Добавить"/>
            </RouterLink>
        </template>
        <template #recipes>
            <Loader v-if="isLoading"/>
            <div v-else class="table-container">
                <table v-if="recipes.length > 0" class="recipes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Картинка</th>
                            <th>Название</th>
                            <th>Регион</th>
                            <th>Категория</th>
                            <th>Таги</th>
                            <th>Инструкция</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="recipe in recipes" :key="recipe.idMeal">
                            <td>{{ recipe.idMeal }}</td>
                            <td>
                                <RouterLink :to="getPath(recipe.idMeal)">
                                    <img :src="recipe.strMealThumb" class="image">
                                </RouterLink>
                            </td>
                            <td>{{ recipe.strMeal }}</td>
                            <td>{{ recipe.strArea }}</td>
                            <td>{{ recipe.strCategory }}</td>
                            <td>{{ recipe.strTags }}</td>
                            <td>{{ recipe.strInstructions }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>Загрузка...</p>
            </div>
        </template>
    </Layout>
</template>

<style scoped>
    .image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        transition: transform 0.2s ease;
    }

    .image:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
</style>