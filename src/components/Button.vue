<script setup>
    const props = defineProps({
        text: {
            default: ''
        },
    });
</script>

<template>
    <button>{{ text }}</button>
</template>

<style scoped></style>