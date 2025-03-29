<template>

  <nav class="menu-main">
    <ul class="menu-main__list">
      <li class="menu-main__item">
        <router-link to="/">Главная</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/staking">Стейкинг</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/referralProgram">Реферальная программа</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/api">API</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/faq">FAQ</router-link>
      </li>
      <li class="menu-main__item">
        <router-link to="/about">О нас</router-link>
      </li>
    </ul>
  </nav>
  
</template>

<script lang="ts">
  export default {
    name: 'MenuMain',
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