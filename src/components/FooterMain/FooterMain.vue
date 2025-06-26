<template>

  <footer class="footer">
    <div class="container">

      <div class="footer__row">

        <a class="footer__logo" href="/">
          <img src="/images/logo-white.svg" loading="lazy" width="40" height="40" :alt="$t('logo')">
          EcoForce
        </a>

        <MenuFooter />

      </div>

      <div class="footer__info">
        <p class="footer__support font-14">
          {{ $t('support') }}:
          <a class="footer__mail" href="mailto:@tg_address">
            @tg_address
          </a>
        </p>
        <div class="footer__year font-14">
          ©2025, EcoForce
        </div>
        <a class="footer__politics font-14" href="#">
          {{ $t('privacy_policy') }}
        </a>
      </div>

    </div>
  </footer>

  <MobileMenu />

</template>

<script>
  import MenuFooter from '../MenuFooter.vue';
  import MobileMenu from '../MobileMenu.vue';
  export default {
    name: 'FooterMain',
    components: {
     MenuFooter,
     MobileMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import './footer-main.scss';
</style>
