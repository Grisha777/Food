<script setup>
    import { ref, onMounted } from 'vue'
    import { Recipes } from '@/services'
    import Layout from '@/layouts/Layout.vue'
    import Button from '@/components/Button.vue'
    import { useRoute } from 'vue-router'

    const route = useRoute();
    const recipeId = route?.params.id
    const recipe = ref(Recipes.getEmpryRecipe())
    const recipeUpdated = ref(Recipes.getEmpryRecipe())
    const nameRecipe = ref(true)

    const fetchId = async () => {
        try {
            const data = await Recipes.getId(recipeId)
            recipe.value = data.meals[0]
            recipeUpdated.value = data.meals[0]
            nameRecipe.value = false
            // recipe.value = data.meals || []
        } catch (error) {
            console.log('Данные не пришли', error)
            // recipes.value = []
        }
    }
    onMounted(() => {
        if(parseInt(recipeId)) {
            fetchId()
        }
    })
</script>

<template>
    <Layout>
        <template #title>{{ nameRecipe ? 'Новый рецепт': recipeUpdated.strMeal }}</template>
        <template #controls>
            <Button text="Сохранить"/>
        </template>
        <template #recipes>
            {{ recipeUpdated }}
        </template>
    </Layout>
</template>