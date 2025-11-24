<script setup>
    import { onMounted, computed } from 'vue'
    import { useRootStore } from '@/store/root'
    import Layout from '@/layouts/Layout.vue'

    const store = useRootStore()
    const categories = computed(() => store.categories)

    onMounted(() => {if (!store.categories) store.getCategories()})
</script>

<template>
    <Layout>
        <template #title>Категории</template>
            <template #recipes>
                <div class="table-container">
                    <table v-if="categories.length > 0" class="categories-table">
                        <thead>
                            <tr>
                                <th>Название</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in categories" :key="index">
                            <td>{{ category.strCategory }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>Загрузка...</p>
                </div>
            </template>
    </Layout>
</template>

<style scoped>
    .table-container {
        width: 20%;
    }
    
    .categories-table {
        width: 100%;
        min-width: 300px;
    }

</style>