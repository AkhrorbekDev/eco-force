<template>

  <div class="menu-footer">
    <ul class="menu-footer__list">
      <li class="menu-footer__item">
        <router-link to="/">{{ $t('Главная') }}</router-link>
      </li>
      <li class="menu-footer__item">
        <router-link to="/staking">{{ $t('Стейкинг') }}</router-link>
      </li>
      <li class="menu-footer__item">
        <router-link to="/referralProgram">{{ $t('Реферальная программа') }}</router-link>
      </li>
      <li class="menu-footer__item">
        <router-link to="/api">{{ $t('API') }}</router-link>
      </li>
      <li class="menu-footer__item">
        <router-link to="/faq">{{ $t('FAQ') }}</router-link>
      </li>
      <li class="menu-footer__item">
        <router-link to="/about">{{ $t('О нас') }}</router-link>
      </li>
    </ul>
  </div>
  
</template>

<script lang="ts">
  export default {
    name: 'MenuFooter',
  }
</script>



<style lang="scss" scoped>
  @import '../assets/styles/vars';
  .menu-footer {
    &__list {
      display: flex;
      gap: 58px;
    }
    @media (max-width: $tabletMin) {
      &__list {
        gap: 12px;
      }
    }
    @media (max-width: $mobile) {
      &__list {
        flex-direction: column;
      }
      &__item {
        opacity: .8;
      }
    }
  }
</style>