<template>

  <nav class="menu-main">
    <ul class="menu-main__list">
      <li class="menu-main__item">
        <router-link to="/">{{ $t('home') }}</router-link>
      </li>
      <li v-if="loggedIn" class="menu-main__item">
        <router-link to="/staking">{{ $t('staking') }}</router-link>
      </li>
      <li v-if="loggedIn" class="menu-main__item">
        <router-link to="/referralProgram">{{ $t('referral_program') }}</router-link>
      </li>
      <li v-if="loggedIn" class="menu-main__item">
        <router-link to="/api">{{ $t('API') }}</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/faq">{{ $t('FAQ') }}</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/about">{{ $t('about_us') }}</router-link>
      </li>
    </ul>
  </nav>

</template>

<script lang="ts">
  import {useUserGlobal} from "@/store/userGlobal.ts";

  export default {
    name: 'MenuMain',
    setup () {
      const userStore = useUserGlobal()
      return {
        userStore
      }
    },
    computed: {
      loggedIn() {
        return this.userStore.loggedIn
      }
    },
  }
</script>



<style lang="scss" scoped>
  @import '../assets/styles/vars';
  .menu-main {
    &__list {
      display: flex;
      gap: 58px;
    }
    @media (max-width: $tablet) {
      &__list {
        gap: 12px;
      }
    }
    @media (max-width: $tabletMin) {
      display: none;
    }
  }
</style>
