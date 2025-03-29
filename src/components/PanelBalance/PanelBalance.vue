<template>
  <div class="panel">
    
    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon1.svg" width="13" height="13" loading="lazy" alt="User Icon">
        </span>
        Баланс TRX:
      </div>
      <span class="panel__amount">
        {{ amount }}
      </span>
    </div>

    <div class="panel__buttons" :class="{ '_active': isButtonsActive }">
      <button @click="openModal" class="button button_bordered">Вывести</button>
      <button @click="openModal2" class="button button_green">Пополнить</button>
    </div>

    <div class="panel__dots d-desk-none" @click="toggleButtonsClass">
      <img src="/images/dots.svg" loading="lazy" width="4" height="14" alt="Icon Dots">
    </div>

  </div>

  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup">
      <div class="popup__header">
        Заказ № HFSWX56
      </div>
      <div class="row jc-sb">
        <p>
          Покупка энергии:
        </p>
        <b class="font-20">
          130 000
        </b>
      </div>
      <div class="row jc-sb">
        <p>
          Будет использовано своей энергии
        </p>
        <b class="font-20">
          70 000
        </b>
      </div>
      <div class="row jc-sb">
        <p>
          Стоимость <b>13.03 TRX</b>
        </p>
        <b class="text-error">
          Не хватает:  13.03 TRX
        </b>
      </div>
      <a class="button button_green py-14 w-100 br-8" href="#"> Списать с баланса </a>
    </div>
  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">
    <div class="popup-order">
      <div class="popup-order__title">
        Ваш адрес для пополнения баланса в TRX
      </div>
      <img class="popup-order__img" src="/images/QR-balance.svg" width="162" height="160" loading="lazy" alt="QR Code Balance">
      <AddressTron2 :hasTitle="false" customClass="_big mb-12"/>
      <b class="mb-24 d-block">
        Переведите любую сумму.
      </b>
      <button class="button button_green py-14 w-100 br-8" @click="closeModal2"> 
        Закрыть
      </button>
    </div>
  </ModalWindow>
</template>

<script>
import AddressTron2 from '../AddressTron2/AddressTron2.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';

export default {
  components: {
    ModalWindow,
    AddressTron2
  },
  name: 'PanelBalance',
  data() {
    return {
      amount: '12 345.12',
      isModalVisible: false,
      isModalVisible2: false,
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
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // Переключаем состояние
    },
  },
};
</script>

<style scoped lang="scss">
@import './PanelBalanace.scss';

.popup {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 480px;
  padding: 40px;

  &__header {
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
  }
}

.popup-order {
  width: 480px;
  padding: 40px;

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

</style>