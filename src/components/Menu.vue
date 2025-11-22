<script setup>
    // import logo  from '@/assets/javascript.svg';
    import { ref } from 'vue';

    const sidebarItems = [
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },
        { src: 'javascript.svg', alt: 'иконка' },

    ];

    const activeIcon = ref(2);
    const setActive = (index) => activeIcon.value = index;
    const goBack = () => alert('Назад!');

</script>

<template>
    <div class="menu">
        <div class="logo">
            <img src="/vue.svg" alt="Логотип">
        </div>
        <!-- <nav class="navigate">
            <div class="navItem">
                123
            </div>
        </nav> -->
        <div class="divider"></div>

        <div
            v-for="(item, index) in sidebarItems"
            :key="index"
            class="menu-item"
            :class="{ 'active': activeIcon === index }"
            @click="setActive(index)"
            >
            <img :src="item.src" :alt="item.alt" class="icon" />
        </div>

        <div class="divider"></div>

    <div class="menu-item back-button" @click="goBack">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </div>
    </div>
</template>

<style scoped>
    .menu {
        width: 60px;
        background-color: #14e293;
        border-right: 1px solid #e0e0e0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        gap: 20px;
        height: 100vh;
    }

    .menu-item {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
        color: #666;
    }

    .menu-item:hover {
        background-color: #f5f5f5;
    }

    .menu-item.active {
        background-color: #000;
        color: white;
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    .divider {
        width: 24px;
        height: 1px;
        background-color: #ddd;
        margin: 10px 0;
    }

    .back-button {
        color: #666;
    }

    .back-button:hover {
        background-color: #f5f5f5;
    }
</style>
