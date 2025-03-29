<template>

  <LogoutDropdown v-if="isHomeAuthRoute" />

  <div class="login-header" v-else @click="openModal">
    <img src="/images/enter.svg" loading="lazy" width="18" height="20" alt="Enter Icon">
    LogIn
  </div>

  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup">
      <img src="/images/QR-code.svg" width="162" height="160" alt="QR Code">
      <p>
        После нажатия кнопки вы перейдете в диалог с нашим ботом <b>@tg_address</b>.
      </p>
      <p>
        В диалоге с ботом нажмите кнопку <b>Start</b>.
      </p>
      <a class="button button_blue py-12 w-100" href="/homeAuth" target="_blank">
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.6471 0.49595L13.172 13.4172C13.172 13.4172 12.8257 14.313 11.8744 13.8834L6.16377 9.34918L6.13729 9.33582C6.90866 8.61856 12.8902 3.04925 13.1516 2.79681C13.5563 2.40583 13.3051 2.17307 12.8352 2.46841L3.99971 8.27892L0.590996 7.09122C0.590996 7.09122 0.0545648 6.89362 0.00295881 6.46397C-0.0493263 6.03361 0.608651 5.80086 0.608651 5.80086L14.5049 0.155604C14.5049 0.155604 15.6471 -0.364058 15.6471 0.49595Z" fill="white"/>
        </svg>
        <span>Войти через <b>Telegram</b></span>
      </a>
    </div>
  </ModalWindow>

</template>

<script>
import { useRoute } from 'vue-router';
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import { computed } from 'vue';
import LogoutDropdown from '../LogoutDropdown/LogoutDropdown.vue';

export default {
  components: {
    ModalWindow,
    LogoutDropdown,
  },
  setup() {
    const route = useRoute();
    const isHomeAuthRoute = computed(() => route.path === '/homeAuth');

    return {
      isHomeAuthRoute,
    };
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .login-header {
    display: flex;
    gap: 6px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    svg {
      fill: #03053D;
    }
  }
  .popup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    max-width: 408px;
    width: 100%;
    padding: 40px 16px;
  }
</style>