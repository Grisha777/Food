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
    const createdRecipe = ref(true)
    const recipeIngredients = ref([General.getEmpryIngredient()])
    const areas = computed(() => Store.areas)
    const categories = computed(() => Store.categories)

    const fetchId = async () => {
        try {
            const data = await Recipes.getId(recipeId)
            recipe.value = data.meals[0]
            recipeUpdated.value = structuredClone(data.meals[0])
            createdRecipe.value = false
            // recipe.value = data.meals || []
        } catch (error) {
            console.log('Данные не пришли', error)
            // recipes.value = []
        }
    }

    const baseIngredients = () => {
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

    const newIngredients = (recipe) => {
        for (let i=0; i <= 20; i++) {
            const ingredient = recipeIngredients.value[i-1]

            if (ingredient?.title && ingredient?.measure) {
                recipe[`strIngredient${i}`] = ingredient.title
                recipe[`strMeasure${i}`] = ingredient.measure
            } else {
                recipe[`strIngredient${i}`] = ""
                recipe[`strMeasure${i}`] = ""
            }
        }
    }

    const addIngredient = () => recipeIngredients.value.push(General.getEmpryIngredient())

    const removeIngredient = (index) => recipeIngredients.value.splice(index, 1)

    const createUpdate = () => createdRecipe.value ? createRecipe() : updateRecipe()

    const createRecipe = async () => {
        try {
            const params = { ...recipeUpdated.value }
            newIngredients(params)
            await Recipes.updateRecipe()
            setTimeout(() => {
                alert(`Рецепт ${params.strMeal} создан`)
            }, 500)
            console.log(params)
        } catch(error) {
            console.log(error)
        }
    }

    const updateRecipe = async () => {
        try {
            const params = { ...recipeUpdated.value }
            newIngredients(params)
            await Recipes.updateRecipe()
            setTimeout(() => {
                console.log(`Реепт ${params.strMeal} обновлен`)
            }, 500)
            console.log(params)
        } catch(error) {
            console.log(error)
        }
    }

    onMounted(async () => {
        if(parseInt(recipeId)) {
            await fetchId()
            baseIngredients()
        }
        console.log('Areas:', Store.areas)
    })
</script>

<template>
    <Layout>
        <template #title>{{ nameRecipe ? 'Новый рецепт': recipeUpdated.strMeal }}</template>
        <template #controls>
            <Button text="Сохранить" @click="createUpdate"/>
        </template>
        <template #recipes>
            <div class="wrapper">
                <div class="row">
                    <div class="field-group">
                        <label class="label">Title</label>
                        <input v-model="recipeUpdated.strMeal" class="input">
                    </div>
                    <div class="field-group">
                        <label class="label">Area</label>
                        <select v-model="recipeUpdated.strArea" class="input">
                            <option 
                            v-for="item in areas"
                            :key="item.strArea"
                            :value="item.strArea">
                                {{ item.strArea }}
                            </option>
                            </select>
                    </div>
                </div>
                <div class="row">
                    <div class="field-group">
                        <label class="label">Category</label>
                        <select v-model="recipeUpdated.strCategory" class="input">
                            <option 
                            v-for="item in categories"
                            :key="item.strCategory"
                            :value="item.strCategory">
                                {{ item.strCategory }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="section">
                    <h2 class="section-title">Ingredients</h2>
                        <div class="ingredients-list">
                            <div v-for="(ingredient, index) in recipeIngredients"
                            :key="`${ingredient.id}-${index}`" class="ingredient-row">
                                    <div class="ingredient-number">
                                        {{ index + 1 }}
                                    </div>
                                <div class="field-group small">
                                    <label class="label">Measure</label>
                                    <input
                                    v-model="recipeIngredients[index].measure"
                                    class="input"
                                    placeholder="200g"/>
                                </div>
                                <div class="field-group">
                                    <label class="label">Title</label>
                                    <input
                                    v-model="recipeIngredients[index].title"
                                    class="input"
                                    placeholder="Tomato"
                                    />
                                </div>
                                <div class="delete-ingredient">
                                    <Button
                                    text="Удалить"
                                    @click="() => removeIngredient(index)"/>
                                </div>
                            </div>
                        </div>
                        <div class="add-ingredient">
                            <Button text="Добавить ингредиент" @click="addIngredient"/>
                        </div>
                    </div>
                <div class="row">
                    <div class="field-group full">
                        <label class="label">Последовательность</label>
                        <textarea
                        v-model="recipeUpdated.strInstructions"
                        class="textarea"rows="6"></textarea>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<style scoped>
    .wrapper {
        padding: 20px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    }

    .label {
        display: block;
        margin: 10px 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: #334155;
    }

    .input,
    .textarea {
        width: 100%;
        padding: 10px 12px;
        font-size: 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        background: #fff;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .input:focus,
    .textarea:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    }

    .textarea {
        min-height: 160px;
        resize: vertical;
        line-height: 1.5;
    }

    .row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .field-group {
        flex: 1;
        min-width: 200px;
    }

    .field-group.small {
        min-width: 120px;
    }

    .field-group.full {
        flex: 100%;
    }

    .section {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e2e8f0;
    }

    .section-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 16px;
        color: #1e293b;
    }

    .ingredients-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-bottom: 16px;
    }

    .ingredient-row {
    display: grid;
    grid-template-columns: 40px 1fr 2fr auto;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: #f8fafc;
    border-radius: 8px;
    }

    .ingredient-number {
        font-weight: 600;
        color: #64748b;
        text-align: center;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .field-group.small {
        min-width: auto;
    }

    .field-group.small .input {
        width: 100%;
    }

    .ingredient-row .field-group {
        flex: 1;
        min-width: 150px;
    }

    .ingredient-row .field-group.small {
        min-width: 100px;
    }

    .delete-ingredient {
        margin-top: 30px;
    }

    .add-ingredient {
        margin-top: 15px;
    }
</style>