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
  console.log(isAuthenticated())
  if (!isAuthenticated()) {
    try {
      const session_id = getSessionId()
      console.log(session_id)
      if (session_id) {
        await initializeAuth(session_id)
        useUserStore.setLoggedIn(true)

        useUserStore.initUserGlobal()
      } else {
        useUserStore.setLoggedIn(false)
        if (timeout) {
          clearTimeout(timeout)
        }
        generateSessionId()
        timeout = setTimeout(() => {
          generateSessionId()
        }, (60 * 10) * 1000)
      }
      // Auto-generate session ID and get tokens


      // Redirect to dashboard if authentication was successful
      // if (success) {
      //   router.push('/dashboard')
      // }
    } catch (error) {
      console.error('Auth initialization error:', error)
    }
  } else {
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
