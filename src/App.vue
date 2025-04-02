<template>
  <HeaderMain/>
  <router-view/>
  <FooterMain/>
</template>

<script lang="ts" setup>
import {defineComponent} from 'vue';
import HeaderMain from './components/HeaderMain/HeaderMain.vue';
import FooterMain from './components/FooterMain/FooterMain.vue';
import {ref, onMounted} from 'vue'
import {isAuthenticated, initializeAuth, logout} from '@/services/authService'
import {useRouter} from 'vue-router'
import {useTrxGlobal} from "@/store/trxGlobal.ts";
import {useEnergyGlobal} from "@/store/energyGlobal.ts";
import {generateSessionId, getSessionId} from "@/services/sessionService.ts";
import {useUserGlobal} from "@/store/userGlobal.ts";

const router = useRouter()
const isAppReady = ref(false)
const authStatus = ref(isAuthenticated())
const useTrxStore = useTrxGlobal()
const useEnergyStore = useEnergyGlobal()
const useUserStore = useUserGlobal()
let timeout = null
onMounted(async () => {
  // Check if already authenticated
  useTrxStore.initTrxGlobal()
  useEnergyStore.initEnergyGlobal()
  if (isAuthenticated()) {
    useUserStore.setLoggedIn(true)
    useUserStore.initUserGlobal()
  }

  // Mark app as ready regardless of auth result
  isAppReady.value = true
})

const handleLogout = () => {
  logout()
  useUserStore.setLoggedIn(false)

  router.push('/login')
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
