<script setup>
    import { ref, onMounted } from 'vue'
    import { Recipes } from '@/services'
    import Layout from '@/layouts/Layout.vue'
    import Button from '@/components/Button.vue'

    const recipes = ref()

    const fetch = async () => {
        try {
            recipes.value = await Recipes.getData()
        } catch {
            console.log('Данные не пришли')
        }
    }
    onMounted(fetch)
</script>

<template>
    <Layout>
        <Button/>
        <template #recipes>{{ recipes }}</template>
    </Layout>
</template>

<style scoped></style>