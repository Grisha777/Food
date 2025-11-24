<script setup>
    // import logo  from '@/assets/javascript.svg';
    import { useRouter } from 'vue-router';
    import { activeIcon, setActiveIcon } from '@/store/activeIcon'

    const router = useRouter()

    const sidebarItems = [
        { src: '/food.svg', alt: 'Блюда' },
        { src: '/category.svg', alt: 'Категории' },
    ];
    
    const handleSetActive = (index) => {
        setActiveIcon(index)
        index === 0 ? router.push({ name: 'home' }) : router.push({ name: 'category' })
    };

    const goBack = (index) => {
        router.push('/')
        index = 0
        setActiveIcon(index)
    }

</script>

<template>
    <div class="menu">
        <div>
            <img src="/vue.svg" alt="Логотип">
        </div>
        <div class="divider"></div>
        <nav
            v-for="(item, index) in sidebarItems"
            :key="index"
            class="menu-navigate"
            :class="{ 'active': activeIcon === index }"
            @click="handleSetActive(index)">
            <img :src="item.src" :alt="item.alt" class="icon"/>
        </nav>
        <div class="divider"></div>
        <div class="menu-navigate back-button" @click="goBack">
            <img src="/back.svg" alt="Логотип">
        </div>
    </div>
</template>

<style scoped>
    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        gap: 20px;
        width: 80px;
        background-color: #ffffff;
        border-right: 2px solid #e5e7eb;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        flex-shrink: 0;
    }

    .menu-navigate {
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

    .menu-navigate:hover {
        background-color: #f5f5f5;
    }

    .menu-navigate.active {
        background-color: #a1a0a0;
    }

    .icon {
        width: 30px;
        height: 30px;
    }

    .divider {
        width: 35px;
        height: 1px;
        background-color: #eee;
    }

    .back-button {
        background-color: #000;
    }
</style>