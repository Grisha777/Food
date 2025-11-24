<script setup>
    import Menu from '@/components/Menu.vue'
</script>

<template>
    <div class="container">
        <Menu/>
        <main class="main">
            <div class="header">
                <div class="title">
                    <slot name="title"></slot>
                </div>
                <div class="controls">
                    <slot name="controls"></slot>
                </div>
            </div>
            <div class="recipes">
                <slot name="recipes"></slot>
            </div>
        </main>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        min-height: 100vh;
        background-color: #f9fafb
    }

    .main {
        flex: 1;
        padding: 24px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0 24px;
        margin-bottom: 24px;
        border-bottom: 1px solid #e5e7eb;
    }

    .title {
        margin: 0;
        font-size: 28px;
        color: #1f2937;
        line-height: 1.2;
    }

    .controls {
        display: flex;
        gap: 12px;
    }

    .recipes {
        min-height: 400px;
    }
</style>