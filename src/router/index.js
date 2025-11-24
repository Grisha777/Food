import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Pages/Home.vue'
import Category from '@/Pages/Category.vue';
import Recipe from '@/Pages/Recipe.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: Recipe,
    },
  ],
});

export default router