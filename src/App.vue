<template>
  <HeaderMain/>
  <router-view/>
  <FooterMain/>
</template>

<script lang="ts" setup>
import {watch} from 'vue';
import HeaderMain from './components/HeaderMain/HeaderMain.vue';
import FooterMain from './components/FooterMain/FooterMain.vue';
import {ref, onMounted} from 'vue'
import {isAuthenticated} from '@/services/authService'
import {useRoute} from 'vue-router'
import {useTrxGlobal} from "@/store/trxGlobal.ts";
import {useEnergyGlobal} from "@/store/energyGlobal.ts";
import {useUserGlobal} from "@/store/userGlobal.ts";
import {useI18n} from "vue-i18n";
import {useHead} from "@vueuse/head";

const isAppReady = ref(false)
const useTrxStore = useTrxGlobal()
const useEnergyStore = useEnergyGlobal()
const useUserStore = useUserGlobal()
const {t, locale} = useI18n()
const route = useRoute()
const pageTitle = ref(t('app.title'))

watch(locale, () => {
  pageTitle.value = route.meta.title
      ? t(route.meta.title as string)
      : t('app.title')
})
useHead({
  title: pageTitle,
})
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
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
