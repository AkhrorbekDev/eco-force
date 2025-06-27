<template>

  <header class="header">
    <div class="container">

      <div class="header__row">

        <a class="header__logo" href="/">
          <img src="/images/logo.svg" loading="lazy" width="40" height="40" :alt="$t('logo')">
          EcoForce
        </a>

        <MenuMain />

        <div class="header__actions">

          <LanguageDropdown />

          <LoginHeader />

        </div>

      </div>

    </div>
  </header>

</template>

<script>
  import LanguageDropdown from '../LanguageDropdown/LanguageDropdown.vue';
  import LoginHeader from '../LoginHeader/LoginHeader.vue';
  import MenuMain from '../MenuMain.vue';
  export default {
    name: 'HeaderMain',
    components: {
     MenuMain,
      LanguageDropdown,
      LoginHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import './header-main.scss';
</style>
