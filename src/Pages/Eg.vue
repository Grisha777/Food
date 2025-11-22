<script setup>
    import Layout from '@/layouts/Layout.vue'
    import Button from '@/components/Button.vue'
</script>

<template>
    <Layout>
        <template #title>Категории</template>
        <template #controls>
            <Button text="Добавить eg"/>
        </template>
        <template #recipes></template>
    </Layout>
</template>