<script setup>
    // import logo  from '@/assets/javascript.svg';
    import { useRouter } from 'vue-router';
    import { activeIcon, setActiveIcon } from '@/store/activeIcon'

    const router = useRouter()

    const sidebarItems = [
        { src: 'javascript.svg', alt: 'иконка1' },
        { src: 'javascript.svg', alt: 'иконка2' },
        { src: 'javascript.svg', alt: 'иконка3' },
        { src: 'javascript.svg', alt: 'иконка4' },
        { src: 'javascript.svg', alt: 'иконка5' },
    ];
    
    const handleSetActive = (index) => {
        setActiveIcon(index)
        if (index === 0) {
            router.push({ name: 'home' });
        }else if (index === 1) {
            router.push({ name: 'category' });
        } else if (index === 2) {
            router.push({ name: 'recip' });
        }else if (index === 3) {
            router.push({ name: 'eg' });
        } else if (index === 4) {
            router.push({ name: 'gory' });
        }
    };
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
            @click="handleSetActive(index)"
            >
            <img :src="item.src" :alt="item.alt" class="icon"/>
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
        width: 35px;
        height: 1px;
        background-color: #ddd;
    }

    .back-button {
        color: #666;
    }

    .back-button:hover {
        background-color: #f5f5f5;
    }
</style>