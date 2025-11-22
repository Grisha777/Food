<script setup>
    import Menu from '@/components/Menu.vue'
</script>

<template>
    <div class="container">
        <div class="menu">
            <Menu/>
        </div>
        <main class="main">
            <div class="header">
                <div class="title">
                    Первое
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
    }

    .menu {
        width: 100px;
    }

    .main {
        flex: 1;
        padding: 15px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: brown;
    }

    .title {
        color: green;
    }
</style>