<template>
  <div class="panel" @click.stop="$emit('on:click')">

    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon1.svg" width="13" height="13" loading="lazy" >
        </span>
        {{ $t('balance') }} TRX:
      </div>
      <span class="panel__amount">
        {{ userStore.user.trx_balance || 0 }}
      </span>

      <div ref="btnDots" class="panel__dots d-desk-none">
        <img src="/images/dots.svg" loading="lazy" width="4" height="14" >
      </div>
    </div>

    <transition name="panel-buttons-transition">
      <div v-if="windowWidth > 768 || isOpen" ref="controlBtns" class="panel__buttons">
        <button @click="openModal" class="button button_bordered">{{ $t('withdraw') }}</button>
        <button @click="openModal2" class="button button_green">{{ $t('deposit') }}</button>
      </div>
    </transition>

  </div>

  <!-- Вывести -->
  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup-take">

      <div class="popup-take__header">
        {{ $t('withdrawal') }}
      </div>

      <div class="address-tron d-grid gap-8 mb-16">
        <span>{{ $t('address') }} <b>TRX</b></span>
        <div :class="{
          invalid: !address && sendStart,
        }" class="address-tron__value">
          <input v-model="address" type="text">
        </div>
      </div>

      <AmountTrx :total-amount="userStore.user.total_staked_trx || 0" v-model:amount="exitAmount"/>

      <BaseButton @on:click="sendWithDrawal" class="button button_green py-14 w-100 br-8 mt-24">
        {{ $t('withdraw') }}
      </BaseButton>

    </div>
  </ModalWindow>

  <!-- Подтверждение -->
  <ModalWindow :isVisible="isModalVisible3" @close="closeModal3">

    <div class="popup-confirm">

      <div class="popup-confirm__header">
        {{ $t('desc49') }}
      </div>

      <div class="d-grid gap-8 mb-16">
        <span class="c-gray2">
          {{ $t('withdrawal_address') }}
        </span>
        <p>
          {{ address }}
        </p>
      </div>

      <p class="mb-32">
        {{ $t('amount') }}
        <b>
          TRX: {{ exitAmount }}
        </b>
      </p>

      <div class="d-grid gap-8 mb-24">
        <p class="mb-32">
          {{ $t('confirmation_code_from') }}
          <b>
            {{ $t('Telegram') }}
          </b>
        </p>
        <div class="popup-confirm__actions">
          <input :class="{
            invalid: !confirmationCode && sendStart,
          }" v-model="confirmationCode" type="text" class="input">
          <BaseButton @on:click="resendCode" class="button button_green br-8">
            {{ $t('send_code') }}
          </BaseButton>
        </div>
      </div>

      <BaseButton class="button button_green py-14 w-100 br-8" @on:click="confirmWithdrawal">
        {{ $t('withdraw') }}
      </BaseButton>

    </div>

  </ModalWindow>

  <!-- Пополнение -->
  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">
    <div class="popup-order">
      <div class="popup-order__title">
        {{ $t('your_trx_balance_top-up_address') }}
      </div>
      <div v-if="paymentEndpoint.qr_code" class="popup-order__img" v-html="paymentEndpoint.qr_code"
           style="width: 162px; height: 160px" width="162"
           height="160" loading="lazy"/>
      <AddressTron2 v-model="paymentEndpoint.address" read-only :hasTitle="false" customClass="_big mb-12"/>
      <b class="mb-24 d-block">
        {{ $t('transfer_any_amount') }}
      </b>
      <button class="button button_green py-14 w-100 br-8" @click="closeModal2">
        {{ $t('close') }}
      </button>
    </div>
  </ModalWindow>
</template>

<script>
import AddressTron2 from '../AddressTron2/AddressTron2.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import {useUserGlobal} from "@/store/userGlobal";
import {createWalletService} from "@/services/index";
import AmountTrx from "@/components/AmountTrx/AmountTrx.vue";
import {useToast} from "vue-toastification";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

export default {
  components: {
    BaseButton,
    AmountTrx,
    ModalWindow,
    AddressTron2
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  name: 'PanelBalance',
  data() {
    return {
      amount: '12 345.12',
      address: '',
      paymentEndpoint: {
        qr_code: '',
        address: ''
      },
      sendStart: false,
      exitAmount: 0,
      confirmationCode: '',
      request_id: '',
      isModalVisible: false,
      isModalVisible2: false,
      isModalVisible3: false,
      isButtonsActive: false,
      windowWidth: window.innerWidth,

      // Добавляем новое состояние для управления классом
    };
  },
  setup() {
    const userStore = useUserGlobal()
    const toast = useToast()
    return {
      toast,
      userStore,
    }
  },
  computed: {
    loggedIn() {
      return this.userStore.loggedIn;
    },

  },
  watch: {
    loggedIn: {
      immediate: true,
      handler(value) {
        if (value) {

        }
      }
    },
    isModalVisible2: {
      immediate: true,
      handler(value) {
        if (value) {
          this.address = this.userStore.user.tron_address
          this.getPaymentEndpoint()
        }
      }
    },
  },
  mounted() {
    this.getPaymentEndpoint()
    this.onResizeBtnClose()
    window.addEventListener('resize', this.onResizeBtnClose);
    window.addEventListener('resize', this.updateWindowWidth);
  },
  unmounted() {
    window.removeEventListener('resize', this.onResizeBtnClose);
    document.removeEventListener('click', this.clickOutside);
    window.removeEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    onResizeBtnClose() {
      document.removeEventListener('click', this.clickOutside);
      if (window.innerWidth < 768) {
        document.addEventListener('click', this.clickOutside);
      } else {
        document.removeEventListener('click', this.clickOutside);
      }
    },
    clickOutside(e) {
      console.log(this.$refs.btnDots.contains(e.target))
      if (this.$refs.btnDots.contains(e.target)) {
        return
      }
      if (this.isButtonsActive && !this.$refs.controlBtns.contains(e.target)) {
        this.isButtonsActive = false
      }
    },
    getPaymentEndpoint() {
      createWalletService().requestAddress().then((response) => {
        this.paymentEndpoint = response
        this.address = response.address
      }).catch((error) => {
        this.toast.error(error.message || this.$t('an_error_occurred'));
      });
    },
    sendWithDrawal(e) {
      this.sendStart = true
      if (!this.address) {
        this.toast.error(this.$t('enter_wallet_address'))
        return;
      }
      this.sendStart = false
      e.loading.start()
      createWalletService().withdrawFunds({amount: this.exitAmount, wallet_address: this.address})
          .then((response) => {
            this.request_id = response.withdrawal_request_id;
            this.closeModal()
            this.openModal3();
            this.toast.success(response.message)
          })
          .catch((error) => {
            console.log(error)
            this.toast.error(error.data.error || this.$t('an_error_occurred'));
          })
          .finally(() => {
            e.loading.stop()
          });

    },
    confirmWithdrawal(e) {

      if (!this.confirmationCode) {
        this.toast.error(this.$t('enter_confirmation_code'))
        return;
      }

      e.loading.start()
      createWalletService().confirmWithdrawal({
        request_id: this.request_id,
        code: this.confirmationCode
      }).then((response) => {
        this.toast.success(response.message)
        this.closeModal3();
      }).catch((error) => {
        this.toast.error(error.data.error || this.$t('an_error_occurred'));
      })
          .finally(() => {
            e.loading.stop()
          });
    },

    resendCode(e) {
      e.loading.start()
      createWalletService().resendWithdrawalCode(this.request_id).then((response) => {
        this.toast.success(response.message)
      }).catch(err => {
        this.toast.error(err.data.error || this.$t('an_error_occurred'));
      }).finally(() => {
        e.loading.stop()
      });
    },
    openModal() {
      this.isModalVisible = true;
      this.isButtonsActive = false
    },
    openModal2() {
      this.isModalVisible2 = true;
      this.isButtonsActive = false
    },
    openModal3() {
      this.isModalVisible3 = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // Переключаем состояние
      console.log('Toggle buttons class:', this.isButtonsActive);
      if (this.isButtonsActive) {
        document.addEventListener('click', this.clickOutside);

      } else {
        document.removeEventListener('click', this.clickOutside);
      }
    },
  }
}

</script>

<style scoped lang="scss">
@import './PanelBalanace.scss';

.panel-buttons-transition-enter-active,
.panel-buttons-transition-leave-active {
  transition: height 0.3s, opacity 0.3s;
  overflow: hidden;
}

.panel-buttons-transition-enter-from,
.panel-buttons-transition-leave-to {
  height: 0;
  opacity: 0;
}

.panel-buttons-transition-enter-to,
.panel-buttons-transition-leave-from {
  height: 34px; // укажите нужную высоту блока с кнопками
  opacity: 1;
}


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
