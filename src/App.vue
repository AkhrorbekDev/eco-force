<template>
  <HeaderMain />
  <router-view/>
  <FooterMain />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderMain from './components/HeaderMain/HeaderMain.vue';
import FooterMain from './components/FooterMain/FooterMain.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderMain,
    FooterMain
  }
});
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';
</style>
