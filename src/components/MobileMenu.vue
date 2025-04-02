<template>

  <nav class="mobile-menu">
    <div class="mobile-menu__btns">
      <div
        @click="openModal2"
        class="mobile-menu__btn">
        <img src="/images/m-icon1.svg" width="17" height="22" loading="lazy" :alt="$t('Icon Energy')">
        {{ $t('Купить энергию') }}
      </div>
            <div
        @click="openModal3"
        class="mobile-menu__btn">
        <img src="/images/m-icon3.svg" width="25" height="24" :alt="$t('Icon Staking')">
        {{ $t('Стейкинг') }}
      </div>
      <div
        class="mobile-menu__btn"
        :class="{ '_active': isActive }"
        @click="handleClick"
      >
        <div class="burger">
          <span class="burger__line"></span>
        </div>
        {{ $t('Меню') }}
      </div>
    </div>
  </nav>

  <ModalWindow overlayClass="modal-custom" :isVisible="isModalVisible" @close="closeModal">
      <ul class="mobile-menu__list">
        <li class="mobile-menu__item">
          <router-link to="/">{{ $t('Главная') }}</router-link>
        </li>
        <li v-if="loggedIn" class="mobile-menu__item">
          <router-link to="/staking">{{ $t('Стейкинг') }}</router-link>
        </li>
        <li v-if="loggedIn" class="mobile-menu__item">
          <router-link to="/referralProgram">{{ $t('Реферальная программа') }}</router-link>
        </li>
        <li v-if="loggedIn" class="mobile-menu__item">
          <router-link to="/api">{{ $t('API') }}</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/faq">{{ $t('FAQ') }}</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/about">{{ $t('О нас') }}</router-link>
        </li>
      </ul>
  </ModalWindow>

  <ModalWindow overlayClass="modal-custom4" :isVisible="isModalVisible2" @close="closeModal2">
    <div class="popup-order4">

      <div class="popup-order4__title">
        {{ $t('Заказ № HFSWX56') }}
      </div>

      <div class="popup-order4__info">
        {{ $t('Покупка энергии') }}: {{ energy }}
      </div>

      <img class="popup-order4__img" src="/images/order.svg" width="162" height="160" loading="lazy" :alt="$t('QR Code Order')">

      <AddressTron2 customClass="_big" />

      <CopyPrice />

      <div class="popup-order4__status">
        {{ $t('Статус') }}: {{ status }}
      </div>

      <div class="popup-order4__block">
        <img class="popup-order4__img" src="/images/warning.png" width="24" height="24" loading="lazy" :alt="$t('Warning')">
        <p>
          {{ $t('Переводите именно эту сумму. Если отправите больше или меньше, заказ не исполнится, деньги не возвращаются.') }}
        </p>
      </div>

      <a href="/order" target="_blank" class="button button_order button_biege py-16 gap-12">
          {{ $t('Открыть в отдельной вкладке') }}
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 1L1.5 14" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.5 11.27V1H4.23" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </a>

    </div>
  </ModalWindow>

  <ModalWindow overlayClass="modal-custom4" :isVisible="isModalVisible3" @close="closeModal3" >

    <div class="popup-staking">

      <div class="popup-staking__header">
        {{ $t('Стейкинг TRX') }}
      </div>

      <TrxCounter />

      <!-- class for error check_error -->
      <label class="check">
        <input class="check__input" type="checkbox">
        <i class="check__square"></i>
        <span class="check__text font-14">
          {{ $t('С правилами стейкинга ознакомлен') }}
          <span class="c-green" @click="openModal3">{{ $t('правилами') }}</span>
        </span>
      </label>

      <button class="button button_green py-12 w-100">
        {{ $t('Начать стейкинг') }}
      </button>

    </div>

  </ModalWindow>

</template>

<script>
import { ref } from 'vue';
import ModalWindow from './ModalWindow/ModalWindow.vue';
import TrxCounter from './TrxCounter/TrxCounter.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import {useUserGlobal} from "@/store/userGlobal.js";


export default {
  name: 'MobileMenu',
  components: {
    ModalWindow,
    TrxCounter,
  },
  data() {
    return {
      isModalVisible2: false,
      isModalVisible3: false,
    }
  },
  setup() {
    const route = useRoute();
    const isHomeAuthRoute = computed(() => route.path === '/homeAuth');

    const isActive = ref(false);
    const isModalVisible = ref(false);

    const toggleClass = () => {
      isActive.value = !isActive.value;
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const handleClick = () => {
      toggleClass();
      openModal();
    };
    const userStore = useUserGlobal();

    return {
      userStore,
      isActive,
      isModalVisible,
      handleClick,
      closeModal,
      isHomeAuthRoute,
    };
  },
  computed: {
    loggedIn() {
      return this.userStore.loggedIn;
    },
  },
  methods: {
    openModal2() {
      this.$router.push('/');
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    openModal3() {
      this.$router.push('/staking');
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
  }
};
</script>

<style lang="scss">
  @import '../assets/styles/vars';

  .burger {
    position: relative;
    width: 26px;
    height: 20px;
    cursor: pointer;
    background: 0;
    border: 0;

    &__line {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: 2px;
      background: #76767A;
      border-radius: 12px;

      &:before,
      &:after {
        content: "";
        position: absolute;
        left: 0;
        width: inherit;
        height: inherit;
        background: inherit;
        border-radius: inherit;
      }

      &:before {
        top: -8px;
      }

      &:after {
        bottom: -8px;
      }
    }

    &.active {
      .burger__line {
        background: transparent;

        &:before {
          top: 0;
          transform: rotate(45deg);
        }

        &:after {
          bottom: 0;
          transform: rotate(-45deg);
        }
      }
    }
  }

  .mobile-menu {
    display: none;

    @media (max-width: $tabletMin) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 101;
      display: block;
      padding: 8px 0;
      background: var(--color4);
      box-shadow: 0px 0px 10px 0px #0000001F;

      &__btns {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
      }

      &__btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 2px;
        flex: 1 0 auto;
        font-size: 10px;
        line-height: 14px;
        color: #76767A;
        user-select: none;

        &._active {
          color: var(--color2);

          .burger__line {
            background: currentColor;
          }

        }
      }

      &__item {
        a {
          display: block;
          width: 70%;
          padding: 12px 14px;
        }
      }

    }

  }

  .modal-overlay.modal-custom {
    display: grid;
    grid-template-columns: 1fr;
    align-items: flex-end;
    padding: 0;
    padding-bottom: 56px;

    .modal-content {
      padding: 14px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

  }

  .modal-overlay.modal-custom4 {
    z-index: 110;
  }


  .popup-order4 {
    width: 480px;
    padding: 40px 16px;

    &__title {
      margin-bottom: 12px;
      font-size: 22px;
      line-height: 30px;
      font-weight: 600;
    }

    &__info {
      margin-bottom: 12px;
    }

    &__img {
      display: block;
      margin: 0 auto 24px;
    }

    &__status {
      margin-bottom: 16px;
      color: var(--color5);
    }

    &__block {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      padding: 12px;
      border: 1px solid var(--color1);
      border-radius: 12px;
    }

  }

  .popup-staking {
    width: 480px;
    padding: 40px;

    &__header {
      margin-bottom: 24px;
      font-size: 22px;
      line-height: 30px;
      font-weight: 600;
    }

  }

</style>
