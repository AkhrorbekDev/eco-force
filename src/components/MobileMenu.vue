<template>
  
  <nav class="mobile-menu">
    <div class="mobile-menu__btns">
      <div 
        @click="openModal2"
        class="mobile-menu__btn">
        <img src="/images/m-icon1.svg" width="17" height="22" loading="lazy" alt="Icon Energy">
        Купить энергию
      </div>
      <div 
        v-if="isHomeAuthRoute"
        @click="openModal3"

        class="mobile-menu__btn">
        <img src="/images/m-icon2.svg" width="25" height="24" alt="Icon Staking">
        Стейкинг
      </div>
      <div 
        @click="openModal3"
        class="mobile-menu__btn">
        <img src="/images/m-icon3.svg" width="25" height="24" alt="Icon Staking">
        Финансы
      </div>
      <div
        class="mobile-menu__btn"
        :class="{ '_active': isActive }"
        @click="handleClick"
      >
        <div class="burger">
          <span class="burger__line"></span>
        </div>
        Меню
      </div>
    </div>
  </nav>

  <ModalWindow overlayClass="modal-custom" :isVisible="isModalVisible" @close="closeModal">
      <ul class="mobile-menu__list">
        <li class="mobile-menu__item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/staking">Стейкинг</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/referralProgram">Реферальная программа</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/api">API</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/faq">FAQ</router-link>
        </li>
        <li class="mobile-menu__item">
          <router-link to="/about">О нас</router-link>
        </li>
      </ul>
  </ModalWindow>

  <ModalWindow overlayClass="modal-custom4" :isVisible="isModalVisible2" @close="closeModal2">
    <div class="popup-order4">

      <div class="popup-order4__title">
        Заказ № HFSWX56
      </div>

      <div class="popup-order4__info">
        Покупка энергии: {{ energy }}
      </div>

      <img class="popup-order4__img" src="/images/order.svg" width="162" height="160" loading="lazy" alt="QR Code Order">

      <AddressTron2 customClass="_big" />

      <CopyPrice />

      <div class="popup-order4__status">
        Статус: {{ status }}
      </div>

      <div class="popup-order4__block">
        <img class="popup-order4__img" src="/images/warning.png" width="24" height="24" loading="lazy" alt="Warning">
        <p>
          Переводите именно эту сумму. Если отправите больше или меньше, заказ не исполнится, деньги не возвращаются.
        </p>
      </div>

      <a href="/order" target="_blank" class="button button_order button_biege py-16 gap-12">
          Открыть в отдельной вкладке
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
        Стейкинг TRX
      </div>

      <TrxCounter />

      <!-- class for error check_error -->
      <label class="check">
        <input class="check__input" type="checkbox">
        <i class="check__square"></i>
        <span class="check__text font-14">
          С 
          <span class="c-green" @click="openModal3">правилами</span>
          стейкинга ознакомлен
        </span>
      </label>

      <button class="button button_green py-12 w-100"
      >
        Начать стейкинг
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

    return {
      isActive,
      isModalVisible,
      handleClick,
      closeModal,
      isHomeAuthRoute,
    };
  },
  methods: {
    openModal2() {
      this.isModalVisible2 = true;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    openModal3() {
      this.isModalVisible3 = true;
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
        display: flex;
        justify-content: center;
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