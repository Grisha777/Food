<script setup>
    import { onMounted } from 'vue';
    import { useRootStore } from '@/store/root'
    import { RouterView } from 'vue-router'

    const Store = useRootStore()

    onMounted(() => {
        Store.getAreas()
        Store.getCategories()
        Store.getIngredients()
    })
</script>

<template>
    <RouterView/>
</template>

<style scoped></style>