<template>
  <div class="buy-energy">

    <div class="buy-energy__header">
      <div class="buy-energy__title">{{ $t('buy_tron_energy') }}</div>
      <span class="buy-energy__question">
          ?
      </span>
    </div>

    <div class="buy-energy__body">

      <div class="buy-energy__row row jc-sb">
        <AddressTron v-model="address"/>

        <label v-if="addressNotActive" class="check d-desk-none py-0">
          <input v-model="activateAddress" class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            {{ $t('add_activation_for_1_trx') }}
          </span>
        </label>

        <TransactionCounter :model-value="transactionCount" @update:model-value="changeAmount"/>

      </div>

      <label v-if="addressNotActive" class="check py-10 d-none d-desk-block">
        <input v-model="activateAddress" class="check__input" type="checkbox" checked>
        <i class="check__square"></i>
        <span class="check__text font-14">
          {{ $t('add_activation_for_1_trx') }}
        </span>
      </label>

      <div class="buy-energy__wrapper row jc-sb mb-10">

        <RentalPeriod v-model="rentPeriod"/>

        <AmountEnergy v-model="amount" @update:model-value="saveInputValue"/>

      </div>

      <div class="buy-energy__cost">
        <span class="font-14 c-gray">{{ $t('regular_price') }}:</span>
        <span class="font-14 line-through">{{ defaultTrx }} {{ $t('TRX') }}</span>
      </div>

      <div class="buy-energy__discount">

        <label v-if="loggedIn" class="check py-0">
          <input v-model="useUserEnergy" class="check__input" type="checkbox" checked>
          <i class="check__square"></i>
          <span class="check__text font-14">
            {{ $t('use_your_energy') }}
            <span class="check__text-gray d-mob-block">
              ({{ $t('will_be_used') }} {{ userEnergyToBuy }})
            </span>
          </span>
        </label>


        <div class="buy-energy__price row jc-sb">

          <div class="row gap-10">
            <span>{{ $t('cost_with_ecoforce') }}</span>
            <span class="weight-700">{{ totalTrx }} {{ $t('TRX') }}</span>
          </div>

          <span class="font-14">{{ $t('savings') }}: {{ ecoTrx }}% ~ {{ trxPrice }}$</span>

        </div>

      </div>

      <BaseButton class="button button_green w-100 py-8" @on:click="openModal">
        {{ $t('buy_energy') }}
      </BaseButton>

      <button class="button button_transparent w-100 py-mob-12 d-desk-none">
        {{ $t('instruction') }}
      </button>

      <ModalWindow overlayClass="overflow" :isVisible="isModalVisible" @close="closeModal">

        <div class="popup-order">

          <div class="popup-order__title">
            {{ $t('order_№') }} {{ orderInfo.order_number }}
          </div>

          <div class="popup-order__info">
            {{ $t('energy_purchase') }}: {{ amount }}
          </div>

          <div v-if="orderInfo.qr_code_deposit_address" class="popup-order__img"
               v-html="orderInfo.qr_code_deposit_address"
               style="width: 162px; height: 160px" width="162"
               height="160" loading="lazy"/>

          <AddressTron2 v-model="orderInfo.deposit_trx_address" read-only customClass="_big"/>

          <CopyPrice :cost="orderInfo.required_trx_amount"/>

          <div class="popup-order__status">
            {{ $t('status') }}: {{ orderInfo.status }}
          </div>

          <div class="popup-order__block">
            <img class="popup-order__img" src="/images/warning.png" width="24" height="24" loading="lazy"
                 :alt="$t('Предупреждение')">
            <p>
              {{ $t('transfer_amount_hint') }}
            </p>
          </div>

          <a :href="`/order?order_id=${orderInfo.orderId}`" target="_blank" class="button button_order button_biege py-16 gap-12">
            {{ $t('open_in_a_new_tab') }}
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
            {{ $t('order_№') }} {{ orderInfo.order_number }}
          </div>
          <div class="row jc-sb">
            <p>
              {{ $t('energy_purchase') }}:
            </p>
            <b class="font-20">
              {{ orderInfo.energy_amount }}
            </b>
          </div>
          <div class="row jc-sb">
            <p>
              {{ $t('your_energy_will_be_used') }}:
            </p>
            <b class="font-20">
              {{ orderInfo.use_energy_user }}
            </b>
          </div>
          <div class="row jc-sb">
            <p>
              {{ $t('cost') }} <b>{{ orderInfo.required_trx_amount }} TRX</b>
            </p>
            <b @click="showAddBalanceModal" v-if="balanceTrxDiff > 0" class="text-error">
              {{ $t('not_enough') }}: {{ balanceTrxDiff }} TRX
            </b>
          </div>
          <BaseButton @on:click="confirmOrder"
                      class="button button_green py-14 w-100 br-8"
          > {{ $t('deduct_from_balance') }}
          </BaseButton>
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
import BaseButton from "@/components/BaseButton/BaseButton.vue";
import {useToast} from "vue-toastification";

export default {
  name: 'BuyEnergy',
  components: {
    BaseButton,
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
    const toast = useToast()
    return {
      userStore,
      useEnergyStore,
      useTrxStore,
      toast
    }
  },
  data() {
    return {
      normalCost: 18,
      discountCost: 8,
      rentPeriod: 0,
      amount: 64285,
      inputedAmount: 64285,
      transactionCount: 1,
      savingsPercentage: 52,
      savingsAmount: 312,
      isModalVisible: false,
      isModalVisible2: false,
      addressNotActive: false,
      activateAddress: false,
      useUserEnergy: false,
      timeout: false,
      energy: '130 000',
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

    lostEnergy() {
      return this.userStore.user.energy || 0
    },
    totalTrx() {
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

      let total = (((this.amount * cost) / 1_000_000) * this.transactionCount).toFixed(4);
      if (this.activateAddress) {
        total = 1 + parseFloat(total);
      }
      return total;
    },
    defaultTrx() {
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
      return (((this.amount * cost) / 1_000_000) * this.transactionCount).toFixed(4);
    },
    ecoTrx() {
      if (this.amount === 0) {
        return 0;
      }
      let total = this.totalTrx;
      if (this.activateAddress) {
        total = total - 1
      }

      return (Math.abs((total - this.defaultTrx) / this.defaultTrx * 100)).toFixed(4);
    },
    userEnergy() {
      return this.userStore.user.energy || 0
    },
    userEnergyToBuy () {
      return this.userStore.user.energy > 0 && this.userStore.user.energy > this.amount ? this.amount : this.userStore.user.energy
    },
    trxPrice() {
      if (this.totalTrx === 0) {
        return 0;
      }
      let total = this.totalTrx;
      if (this.activateAddress) {
        total = total - 1
      }
      return (total * this.useTrxStore.trxGlobal.trx_price).toFixed(4);
    },
    balanceTrxDiff() {
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
  unmounted() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    showAddBalanceModal () {
      this.$emit('showAddBalanceModal', this.balanceTrxDiff)
    },
    saveInputValue() {
      this.inputedAmount = this.amount
    },
    changeAmount(e) {
      this.transactionCount = e
      this.amount = this.inputedAmount ? parseInt(this.inputedAmount) * this.transactionCount : 0
    },
    createOrderToAuthorizedUser(e) {
      e.loading.start()
      console.log(this.useUserEnergy)
      createEnergyService().createOrder({
        delegation_address: this.address,
        energy_amount: this.amount,
        use_energy_user: this.useUserEnergy ? this.userEnergyToBuy : 0,
      }).then(res => {
        this.orderInfo = res;
        this.isModalVisible2 = true;
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          publicServices.order.getOrderInfo(res.order_id).then(res => {
            this.orderInfo.status = res.status;
            if (res.status === 'paid') {
              clearInterval(this.interval);
              this.isModalVisible = false;
              this.userStore.initUserGlobal();
            }
          })
        }, 3000);
      }).catch(err => {
        this.toast.error(err.message || this.$t('an_error_occurred'));

      }).finally(() => {
        e.loading.stop()
      })
    },
    createOrderToUnAuthorizedUser(e) {
      e.loading.start()
      createEnergyService().createOrder({
        delegation_address: this.address,
        energy_amount: this.amount,
        need_activate_address: this.activateAddress,
      }).then(res => {
        this.orderInfo = res;
        this.isModalVisible = true;
        if (this.interval) {
          clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
          publicServices.order.getOrderInfoPublic(res.order_id).then(res => {
            this.orderInfo.status = res.status;
            if (res.status === 'paid') {
              clearInterval(this.interval);
              this.isModalVisible = false;
            }
          }).catch(err => {
            console.log(err)
          })
        }, 3000);
      }).catch(err => {
        this.toast.error(err.message || this.$t('an_error_occurred'));
      }).finally(() => {
        e.loading.stop()
      })
    },
    validate() {
      if (this.address === '') {
        this.toast.error(this.$t('enter_wallet_address'));
        return false;
      }
      if (this.amount === 0) {
        this.toast.error(this.$t('enter_energy_amount'));
        return false;
      }
      return true;
    },
    openModal(e) {
      this.requestSending = true
      if (!this.validate()) {
        this.requestSending = false
        e.loading.stop()
        return
      }
      if (this.loggedIn) {
        this.createOrderToAuthorizedUser(e)
      } else {
        this.createOrderToUnAuthorizedUser(e)
      }
    },
    confirmOrder(e) {
      e.loading.start()
      createEnergyService().confirmOrder({
        order_id: this.orderInfo.order_id,
      }).then(res => {
        this.isModalVisible2 = false;
        this.toast.success(res.message);
        this.userStore.initUserGlobal();
      }).catch(err => {
        this.toast.error(err.message || this.$t('an_error_occurred'));
      }).finally(() => {
        e.loading.stop()
      })
    },
    closeModal2() {
      this.isModalVisible2 = false;
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    closeModal() {
      this.isModalVisible = false;
      if (this.interval) {
        clearInterval(this.interval);
      }
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
