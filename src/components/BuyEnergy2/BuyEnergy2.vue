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
        <AddressTron v-model="address"/>

        <label v-if="addressNotActive" class="check d-desk-none py-0">
          <input v-model="activateAddress" class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            Добавить активацию за 1 TRX
          </span>
        </label>

        <TransactionCounter v-model="transactionCount"/>

      </div>

      <label v-if="addressNotActive" class="check py-10 d-none d-desk-block">
        <input v-model="activateAddress" class="check__input" type="checkbox" checked>
        <i class="check__square"></i>
        <span class="check__text font-14">
          Добавить активацию за 1 TRX
        </span>
      </label>

      <div class="buy-energy__wrapper row jc-sb mb-10">

        <RentalPeriod v-model="rentPeriod" />

        <AmountEnergy v-model="amount" />

      </div>

      <div class="buy-energy__cost">
        <span class="font-14 c-gray">Обычная стоимость:</span>
        <span class="font-14 line-through">{{ defaultTrx }} ТRХ</span>
      </div>

      <div class="buy-energy__discount">

        <label v-if="loggedIn" class="check py-0">
          <input class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            Использовать свою энергию
            <span class="check__text-gray d-mob-block">
              (будет использовано {{ lostEnergy }})
            </span>
          </span>
        </label>


        <div class="buy-energy__price row jc-sb">

          <div class="row gap-10">
            <span>Стоимость с EcoForce</span>
            <span class="weight-700">{{ totalTrx }} ТRХ</span>
          </div>

          <span class="font-14">Экономия: {{ ecoTrx }}% ~ {{ trxPrice }}$</span>

        </div>

      </div>

      <button class="button button_green w-100 py-8" @click="openModal">
        Купить энергию
      </button>

      <button class="button button_transparent w-100 py-mob-12 d-desk-none">
        Инструкция
      </button>

      <ModalWindow overlayClass="overflow" :isVisible="isModalVisible" @close="closeModal">

        <div class="popup-order">

          <div class="popup-order__title">
            Заказ № {{ orderInfo.order_number }}
          </div>

          <div class="popup-order__info">
            Покупка энергии: {{ amount }}
          </div>

          <div v-if="orderInfo.qr_code_deposit_address" class="popup-order__img" v-html="orderInfo.qr_code_deposit_address"
               style="width: 162px; height: 160px" width="162"
               height="160" loading="lazy"
               alt="QR Code Balance"/>

          <AddressTron2 v-model="orderInfo.deposit_trx_address" read-only customClass="_big"/>

          <CopyPrice :cost="orderInfo.required_trx_amount" />

          <div class="popup-order__status">
            Статус: {{ status }}
          </div>

          <div class="popup-order__block">
            <img class="popup-order__img" src="/images/warning.png" width="24" height="24" loading="lazy" alt="Warning">
            <p>
              Переводите именно эту сумму. Если отправите больше или меньше, заказ не исполнится, деньги не
              возвращаются.
            </p>
          </div>

          <a href="/order" target="_blank" class="button button_order button_biege py-16 gap-12">
            Открыть в отдельной вкладке
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 1L1.5 14" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M14.5 11.27V1H4.23" stroke="black" stroke-width="1.5" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

        </div>

      </ModalWindow>
      <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">
        <div class="popup">
          <div class="popup__header">
            Заказ № {{ orderInfo.order_number }}
          </div>
          <div class="row jc-sb">
            <p>
              Покупка энергии:
            </p>
            <b class="font-20">
              {{ orderInfo.energy_amount }}
            </b>
          </div>
          <div class="row jc-sb">
            <p>
              Будет использовано своей энергии
            </p>
            <b class="font-20">
              {{ orderInfo.use_energy_user }}
            </b>
          </div>
          <div class="row jc-sb">
            <p>
              Стоимость <b>{{ orderInfo.required_trx_amount }} TRX</b>
            </p>
            <b v-if="balanceTrxDiff > 0" class="text-error">
              Не хватает: {{ balanceTrxDiff }} TRX
            </b>
          </div>
          <buttom @click="confimOrder" :disabled="balanceTrxDiff > 0" class="button button_green py-14 w-100 br-8" href="#"> Списать с баланса </buttom>
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
import {useUserGlobal} from "@/store/userGlobal.js";
import {useEnergyGlobal} from "@/store/energyGlobal.js";
import {useTrxGlobal} from "@/store/trxGlobal.js";
import publicServices from "@/services/publicServices.js";
import {createEnergyService} from "@/services/index.js";

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
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {
        return {
          tron_address: "",
          balance_trx: 0,
          balance_energy: 0,
          referral_code: '0',
          registration_date: '',
        }
      }
    },
    pricing: {
      type: Object,
      required: true,
      default: () => {
        return {
          "cost_per_hour": 0,
          "cost_per_day": 0,
          "cost_per_week": 0,
          "buyback_cost": 0,
          "tron_cost_per_hour": 0,
          "tron_cost_per_day": 0,
          "tron_cost_per_week": 0
        }
      }
    },
    status: {
      type: String,
      default: 'Ожидание оплаты',
    },
  },
  setup() {
    const userStore = useUserGlobal()
    const useEnergyStore = useEnergyGlobal()
    const useTrxStore = useTrxGlobal()

    return {
      userStore,
      useEnergyStore,
      useTrxStore
    }
  },
  data() {
    return {
      normalCost: 18,
      discountCost: 8,
      rentPeriod: 0,
      amount: 0,
      transactionCount: 1,
      savingsPercentage: 52,
      savingsAmount: 312,
      isModalVisible: false,
      isModalVisible2: false,
      addressNotActive: false,
      activateAddress: false,
      timeout: false,
      energy: '130 000',
      status: 'Ожидание оплаты',
      address: '',
      requestSending: false,
      orderInfo: {
        orderId: '',
        deposit_trx_address: '',
        energy: 0,
        address: '',
        trx: 0,
        status: '',
      }
    };
  },
  computed: {
    loggedIn() {
      return this.userStore.loggedIn;
    },

    lostEnergy () {
      return 0
    },
    totalTrx () {
      if (this.amount === 0) {
        return 0;
      }
      let cost = this.useEnergyStore.energyGlobal.cost_per_hour;
      if (this.rentPeriod === 0) {
        cost = this.useEnergyStore.energyGlobal.cost_per_hour;
      } else if (this.rentPeriod === 1) {
        cost = this.useEnergyStore.energyGlobal.cost_per_day;
      } else if (this.rentPeriod === 2) {
        cost = this.useEnergyStore.energyGlobal.cost_per_week;
      }
      return ((this.amount * cost ) / 1_000_000).toFixed(4);
    },
    defaultTrx () {
      if (this.amount === 0) {
        return 0;
      }
      let cost = this.useEnergyStore.energyGlobal.tron_cost_per_hour;
      if (this.rentPeriod === 0) {
        cost = this.useEnergyStore.energyGlobal.tron_cost_per_hour;
      } else if (this.rentPeriod === 1) {
        cost = this.useEnergyStore.energyGlobal.tron_cost_per_day;
      } else if (this.rentPeriod === 2) {
        cost = this.useEnergyStore.energyGlobal.tron_cost_per_week;
      }
      return ((this.amount * cost ) / 1_000_000).toFixed(4);
    },
    ecoTrx () {
      if (this.amount === 0) {
        return 0;
      }
      return (Math.abs((this.totalTrx - this.defaultTrx) / this.defaultTrx * 100)).toFixed(4);
    },
    userEnergy () {
      return 0
    },
    trxPrice () {
      if (this.totalTrx === 0) {
        return 0;
      }
      return (this.totalTrx * this.useTrxStore.trxGlobal.trx_price).toFixed(4);
    },
    balanceTrxDiff () {
      if (this.orderInfo.required_trx_amount === 0) {
        return 0;
      }
      if (this.userStore.user.trx_balance < this.orderInfo.required_trx_amount) {
        return this.orderInfo.required_trx_amount - this.userStore.user.trx_balance;
      }
    }

  },
  watch: {
    loggedIn: {
      immediate: true,
      handler(value) {
        if (value) {
          console.log(value)
          this.address = this.userStore.user.tron_address;
        }
      }
    },
    address(value) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        if (value) {
          publicServices.address.checkAddressActivation(value).then((response) => {
            this.addressNotActive = !response.active;
          });
        }

      }, 500);
    }
  },
  mounted() {
    this.address = this.$props.user.tron_address;
  },
  methods: {
    createOrderToAuthorizedUser () {
      createEnergyService().createOrder({
        delegation_address: this.address,
        energy_amount: this.amount,
        use_energy_user: this.userEnergy,
      }).then(res => {
        this.orderInfo = res;
        this.isModalVisible2 = true;
      }).catch(err => {

      })
    },
    createOrderToUnAuthorizedUser () {
      createEnergyService().createOrder({
        delegation_address: this.address,
        energy_amount: this.amount,
        need_activate_address: this.activateAddress,
      }).then(res => {
        this.orderInfo = res;
        this.isModalVisible = true;
      }).catch(err => {
        console.log(err)
      })
    },
    validate() {
      if (this.address === '') {
        this.$toast?.error('Введите адрес кошелька');
        return false;
      }
      if (this.amount === 0) {
        this.$toast?.error('Введите количество энергии');
        return false;
      }
      return true;
    },
    openModal() {
      this.requestSending = true
      if (!this.validate()) {
        this.requestSending = false
        return
      }
      if (this.loggedIn) {
        this.createOrderToAuthorizedUser()
      } else {
        this.createOrderToUnAuthorizedUser()
      }
    },
    confimOrder () {

    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  }
};
</script>

<style scoped lang="scss">
@import './buy-energy2.scss';
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
