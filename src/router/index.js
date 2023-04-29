import { createRouter, createWebHistory } from 'vue-router'
import FoodPage from '@/components/views/food/FoodPage.vue';

const routes = [
  {
    path: '/foods',
    name: 'foods',
    component: FoodPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router