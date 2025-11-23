<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { Recipes, General } from '@/services'
    import { useRootStore } from '@/store/root'
    import Layout from '@/layouts/Layout.vue'
    import Button from '@/components/Button.vue'
    
    const route = useRoute();
    const Store = useRootStore()
    const recipeId = route?.params.id
    const recipe = ref(Recipes.getEmpryRecipe())
    const recipeUpdated = ref(Recipes.getEmpryRecipe())
    const createRecipe = ref(true)
    const recipeIngredients = ref([General.getEmpryIngredient()])
    const areas = computed(() => Store.areas)
    const categories = computed(() => Store.categories)

    const fetchId = async () => {
        try {
            const data = await Recipes.getId(recipeId)
            recipe.value = data.meals[0]
            recipeUpdated.value = structuredClone(data.meals[0])
            createRecipe.value = false
            // recipe.value = data.meals || []
        } catch (error) {
            console.log('Данные не пришли', error)
            // recipes.value = []
        }
    }

    const ingredients = () => {
        const allIngredients = []
        for (let i = 1; i <= 20; i++ ) {
            if(recipe.value[`strIngredient${i}`]) {
                const dient = {
                    id: Math.random().toString(36).slice(2),
                    title: recipe.value[`strIngredient${i}`],
                    measure: recipe.value[`strMeasure${i}`]
                }
                allIngredients.push(dient)
            }

        }
        recipeIngredients.value = allIngredients
    }

    const addIngredient = () => {
        recipeIngredients.value.push(General.getEmpryIngredient())
    }

    const removeIngredient = (index) => {
        recipeIngredients.value.splice(index, 1)
    }

    onMounted(async () => {
        if(parseInt(recipeId)) {
            await fetchId()
            ingredients()
        }
        console.log('Areas:', Store.areas)
    })
</script>

<template>
    <Layout>
        <template #title>{{ nameRecipe ? 'Новый рецепт': recipeUpdated.strMeal }}</template>
        <template #controls>
            <Button text="Сохранить"/>
        </template>
        <template #recipes>
            <div class="container">
                <div class="ro">
                    <div class="col">
                        <div class="label">Title</div>
                        <input v-model="recipeUpdated.strMeal">
                    </div>
                    <div class="col">
                        <div class="label">Area</div>
                        <select v-model="recipeUpdated.strArea">
                            <option 
                            v-for="item in areas"
                            :key="item.strArea"
                            :value="item.strArea"
                            >
                            {{ item.strArea }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="ro">
                    <div class="col">
                        <div class="label">Category</div>
                        <select v-model="recipeUpdated.strCategory">
                            <option 
                            v-for="item in categories"
                            :key="item.strCategory"
                            :value="item.strCategory">
                            {{ item.strCategory }}
                            </option>
                        </select>
                    </div>
                </div>
                {{ recipeIngredients }}
                <div class="ingredients">
                    <div class="subtitle">
                        Ingredients
                    </div>
                    <div class="ro"
                    v-for="(ingredient, index) in recipeIngredients"
                    :key="`${ingredient.id}-${index}`">
                        <div class="col">
                            {{ index + 1 }}
                        </div>
                        <div class="col">
                        <div class="label">Measure</div>
                            <input v-model="recipeIngredients[index].measure">
                        </div>
                        <div class="label">Title</div>
                            <input v-model="recipeIngredients[index].title">
                    </div>
                    <div class="col">
                        <Button text="Удалить" @click="() => removeIngredient(index)"/>
                    </div>
                    <div>
                        <Button text="Добавить ингридиент" @click="addIngredient"/>
                    </div>
                </div>
                <div class="ro">
                    <div class="col">
                        <div class="label">Последовательность</div>
                        <textarea
                        v-model="recipeUpdated.strInstructions"
                        class="instructions-textarea"
                        rows="6">
                        </textarea>
                    </div>
                </div>
            </div>
            <!-- {{ recipeUpdated }} -->
        </template>
    </Layout>
</template>
<style scoped>
.instructions-textarea {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* resize: vertical; */
  min-height: 60px;
  max-height: 200px;
}
</style>