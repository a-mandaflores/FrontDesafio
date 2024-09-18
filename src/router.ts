import { createRouter, createWebHistory } from 'vue-router';
import Airport from './components/views/Airport.vue';
import Flight from './components/views/Flight.vue';
import Register from './components/views/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Airport',
    component: Airport,
  },
  {
    path: '/flight',
    name: 'Flights',
    component: Flight,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;