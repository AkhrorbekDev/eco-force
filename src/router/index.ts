import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue';
import HomeAuthPage from '@/pages/HomeAuthPage.vue';
import StakingPage from '@/pages/StakingPage.vue';
import ReferralProgramPage from '@/pages/ReferralProgramPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import ApiPage from '@/pages/ApiPage.vue';
import OrderPage from '@/pages/OrderPage.vue';

const routes = [
  { 
    path: '/', 
    component: HomePage
  },
  { 
    path: '/homeAuth', 
    component: HomeAuthPage
  },
  { 
    path: '/staking', 
    component: StakingPage
  },
  { 
    path: '/referralProgram',
    component: ReferralProgramPage
  },
  { 
    path: '/api',
    component: ApiPage
  },
  { 
    path: '/faq',
    component: FaqPage
  },
  {
    path: '/about',
    component: AboutPage 
  },
  {
    path: '/order',
    component: OrderPage 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router