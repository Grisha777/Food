import { ref } from 'vue';

export const activeIcon = ref(0);
export const setActiveIcon = (index) => activeIcon.value = index;