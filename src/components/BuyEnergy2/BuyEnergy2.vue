<template>
  <div class="buy-energy">

    <div class="buy-energy__header">
      <div class="buy-energy__title">Купить энергию TRON</div>
      <span class="buy-energy__question">
        <i>
          ?
        </i>
      </span>
    </div>

    <div class="buy-energy__body">

      <div class="buy-energy__row row jc-sb">

        <AddressTron />

        <label class="check d-desk-none py-0">
          <input class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            Добавить активацию за 1 TRX
          </span>
        </label>

        <TransactionCounter />

      </div>

      <label class="check py-10 d-none d-desk-block">
        <input class="check__input" type="checkbox" checked>
        <i class="check__square"></i>
        <span class="check__text font-14">
          Добавить активацию за 1 TRX 
        </span>
      </label>
  
      <div class="buy-energy__wrapper row jc-sb mb-10">

        <RentalPeriod />

        <AmountEnergy />

      </div>

      <div class="buy-energy__cost">
        <span class="font-14 c-gray">Обычная стоимость:</span>
        <span class="font-14 line-through">{{ normalCost }} ТRХ</span>
      </div>

      <div class="buy-energy__discount">

        <label class="check py-0">
          <input class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            Использовать свою энергию
            <span class="check__text-gray d-mob-block">
              (будет использовано 153 000)
            </span> 
          </span>
        </label>


        <div class="buy-energy__price row jc-sb">

          <div class="row gap-10">
            <span>Стоимость с EcoForce</span>
            <span class="weight-700">{{ discountCost }} ТRХ</span>
          </div>

          <span class="font-14">Экономия: {{ savingsPercentage }}% ~ {{ savingsAmount }}$</span>

        </div>

      </div>

      <button class="button button_green w-100 py-8" @click="openModal" >
        Купить энергию
      </button>

      <button class="button button_transparent w-100 py-mob-12 d-desk-none" >
        Инструкция
      </button>

      <ModalWindow overlayClass="overflow" :isVisible="isModalVisible" @close="closeModal">

        <div class="popup-order">

          <div class="popup-order__title">
            Заказ № HFSWX56
          </div>

          <div class="popup-order__info">
            Покупка энергии: {{ energy }}
          </div>

          <img class="popup-order__img" src="/images/order.svg" width="162" height="160" loading="lazy" alt="QR Code Order">

          <AddressTron2 customClass="_big" />

          <CopyPrice />

          <div class="popup-order__status">
            Статус: {{ status }}
          </div>

          <div class="popup-order__block">
            <img class="popup-order__img" src="/images/warning.png" width="24" height="24" loading="lazy" alt="Warning">
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

    </div>

  </div>

</template>

<script>
import AddressTron from '../AddressTron/AddressTron.vue';
import AddressTron2 from '../AddressTron2/AddressTron2.vue';
import TransactionCounter from '../TransactionCounter/TransactionCounter.vue';
import RentalPeriod from '../RentalPeriod/RentalPeriod.vue';
import AmountEnergy from '../AmountEnergy/AmountEnergy.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import CopyPrice from '../CopyPrice/CopyPrice.vue';

export default {
  name: 'BuyEnergy',
  components: {
    AddressTron,
    AddressTron2,
    TransactionCounter,
    RentalPeriod,
    AmountEnergy,
    ModalWindow,
    CopyPrice,
  },
  data() {
    return {
      normalCost: 18,
      discountCost: 8,
      savingsPercentage: 52,
      savingsAmount: 312,
      isModalVisible: false,
      energy: '130 000',
      status: 'Ожидание оплаты',
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  }
};
</script>

<style scoped lang="scss">
  @import './buy-energy2.scss';

  .popup-order {
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

</style>