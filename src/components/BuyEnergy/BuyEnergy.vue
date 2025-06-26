<template>
  <div class="buy-energy">

    <div class="buy-energy__header">
      <div class="buy-energy__title">{{ $t('buy_tron_energy') }}</div>
      <span class="buy-energy__question">
        <i>
          ?
        </i>
      </span>
    </div>

    <div class="buy-energy__body">

      <div class="buy-energy__row row jc-sb mb-10">

        <AddressTron />

        <label class="check d-desk-none py-0">
          <input class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            {{ $t('add_activation_for_1_trx') }}
          </span>
        </label>

        <TransactionCounter />

      </div>

      <div class="buy-energy__wrapper row jc-sb mb-10">

        <RentalPeriod />

        <AmountEnergy />

      </div>

      <div class="buy-energy__cost">
        <span class="font-14 c-gray">{{ $t('regular_price') }}:</span>
        <span class="font-14 line-through">{{ normalCost }} TRX</span>
      </div>

      <div class="buy-energy__discount">

        <div class="row gap-10">
          <span>{{ $t('cost_with_ecoforce') }}</span>
          <span class="weight-700">{{ discountCost }} TRX</span>
        </div>

        <span class="font-14">{{ $t('savings') }}: {{ savingsPercentage }}% ~ {{ savingsAmount }}$</span>
      </div>

      <button class="button button_green w-100 py-8 py-mob-12" @click="openModal" >
        {{ $t('buy_energy') }}
      </button>

      <button class="button button_transparent w-100 py-mob-12 d-desk-none" >
        {{ $t('Инструкция') }}
      </button>

      <ModalWindow :isVisible="isModalVisible" @close="closeModal">

        <div class="popup-order">

          <div class="popup-order__title">
            {{ $t('Заказ №') }} HFSWX56
          </div>

          <div class="popup-order__info">
            {{ $t('Покупка энергии') }}: {{ energy }}
          </div>

          <img class="popup-order__img" src="/images/order.svg" width="162" height="160" loading="lazy" :alt="$t('QR Code Order')">

          <AddressTron2 customClass="_big" />

          <CopyPrice />

          <div class="popup-order__status">
            {{ $t('Статус') }}: {{ status }}
          </div>

          <div class="popup-order__block">
            <img class="popup-order__img" src="/images/warning.png" width="24" height="24" loading="lazy" :alt="$t('Warning')">
            <p>
              {{ $t('Переводите именно эту сумму') }}. Если отправите больше или меньше, заказ не исполнится, деньги не возвращаются.
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
      status: this.$t('Ожидание оплаты'),
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
  @import './buy-energy.scss';

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
