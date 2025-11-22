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
                    <slot name="title"></slot>
                </div>
                <slot name="controls"></slot>
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
        font-size: 40px;
        color: green;
    }
</style>