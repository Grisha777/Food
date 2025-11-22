<script setup>
    import { ref, onMounted } from 'vue'
    import { Recipes } from '@/services'
    import Layout from '@/layouts/Layout.vue'
    import Button from '@/components/Button.vue'

    const recipes = ref([])

    const fetch = async () => {
        try {
            const data = await Recipes.getData()
            recipes.value = data.meals || []
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
            <div class="table-container">
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
    
    width: 70px;
    height: 70px;
} 

.table-container {
  width: 100%;
  overflow-x: auto;
}

.recipes-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 1rem;
}

.recipes-table th,
.recipes-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.recipes-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.recipes-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.recipes-table tr:hover {
  background-color: #f1f1f1;
}
</style>