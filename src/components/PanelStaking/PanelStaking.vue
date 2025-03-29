<template>

  <div class="panel">

    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon2.svg" width="13" height="13" loading="lazy" alt="Wallet Icon">
        </span>
        Стейкинг TRX:
      </div>
      <div class="panel__info">
        <span class="c-gray-light">APR</span>
        <span class="c-green">22%</span>
      </div>
      <span class="panel__amount">
        {{ amount }}
      </span>
    </div>

    <div class="panel__buttons" :class="{ '_active': isButtonsActive }">
      <button @click="openModal" class="button button_bordered">Вывести</button>
      <button @click="openModal2" class="button button_green">Внести</button>
    </div>

    <div class="panel__dots d-desk-none" @click="toggleButtonsClass">
      <img src="/images/dots.svg" loading="lazy" width="4" height="14" alt="Icon Dots">
    </div>

  </div>

  <!-- Вывести -->
  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup-take">

      <div class="popup-take__header">
        Вывод средств
      </div>

      <div  class="address-tron d-grid gap-8 mb-16">
        <span>Адрес <b>TRON</b></span>
        <div class="address-tron__value">
          <input type="text" value="THQy83uGShH7S8x8e9VzEZHT2HJSmZQMjh">
        </div>
      </div>

      <AmountTrx />

      <button @click="openModal3" class="button button_green py-14 w-100 br-8 mt-24">
        Вывести
      </button>

    </div>
  </ModalWindow>

  <!-- Подтверждение -->
  <ModalWindow :isVisible="isModalVisible3" @close="closeModal3">

    <div class="popup-confirm">

      <div class="popup-confirm__header">
        Подтверждение вывода
      </div>

      <div  class="d-grid gap-8 mb-16">
        <span class="c-gray2">
          Адрес вывода
        </span>
        <p>
          THQy83uGShH7S8x8e9VzEZHT2HJSmZQMjh
        </p>
      </div>

      <p class="mb-32">
        Количество
        <b>
          TRX: 150
        </b>
      </p>

      <div  class="d-grid gap-8 mb-24">
        <p class="mb-32">
          Код подтверждения из
          <b>
            Telegram
          </b>
        </p>
        <div class="popup-confirm__actions">
          <input value="123456" type="text" class="input">
          <button class="button button_green br-8">
            Выслать код
          </button>
        </div>
      </div>

      <button class="button button_green py-14 w-100 br-8" @click="closeModal2">
        Вывести
      </button>

    </div>

  </ModalWindow>

  <!-- Пополнение -->
  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">

    <div class="popup-order">

      <div class="popup-order__heeader">
        Ваш адрес для пополнения баланса в TRX
      </div>

      <img class="popup-order__img" src="/images/QR-balance.svg" width="162" height="160" loading="lazy" alt="QR Code Balance">

      <AddressTron2 :hasTitle="false" customClass="_big mb-12"/>

      <button class="button button_green py-14 w-100 br-8" @click="closeModal2">
        Закрыть
      </button>

    </div>

  </ModalWindow>

</template>

<script>
import AddressTron2 from '../AddressTron2/AddressTron2.vue';
import AmountTrx from '../AmountTrx/AmountTrx.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';

export default {
  components: {
    ModalWindow,
    AddressTron2,
    AmountTrx,
  },
  name: 'PanelStaking',
  data() {
    return {
      amount: '3 500',
      isModalVisible: false,
      isModalVisible2: false,
      isModalVisible3: false,
      isButtonsActive: false, // Добавляем новое состояние для управления классом
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openModal2() {
      this.isModalVisible2 = true;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    openModal3() {
      this.isModalVisible3 = true;
      this.isModalVisible = false;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // Переключаем состояние
    },
  },
};
</script>

<style scoped lang="scss">
@import './PanelStaking.scss';

.popup-take {
  display: flex;
  flex-direction: column;
  width: 480px;
  padding: 40px;

  &__header {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
  }

}

.popup-order {
  width: 480px;
  padding: 40px;

  &__header {
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

.address-tron {
  position: relative;

  &__value

    input {
      width: 100%;
      height: 42px;
      padding: 10px 16px;
      font-size: 16px;
      line-height: 22px;
      font-family: var(--font1);
      color: var(--color1);
      outline: 0;
      border: 1px solid var(--color8);
      border-radius: var(--border-radius-input);
    }

}

.popup-confirm {
  display: flex;
  flex-direction: column;
  width: 480px;
  padding: 40px;

  &__header {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
  }

  &__actions {
    display: grid;
    grid-template-columns: 132px 1fr;
    gap: 26px;
  }

}

</style>
