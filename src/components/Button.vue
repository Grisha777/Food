<script setup>
    const props = defineProps({
        text: {
            default: ''
        },
    });
</script>

<template>
    <button class="btn">{{ text }}</button>
</template>

<style scoped>
    .btn {
        padding: 10px 20px;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        color: #000;
        background-color: #46e5e5;
        border: none;  
        border-radius: 8px;
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease-in-out;
    }

    .btn:hover {
        background-color: #4338ca;
    }
</style>