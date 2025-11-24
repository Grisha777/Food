<template>
    <transition appear>
        <div class="load">
            Загрузка...
        </div>
    </transition>
</template>

<style scoped> 
    .load {
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgb(128, 128, 128, 0.2);
    }
</style>