<template>

  <div class="panel" @click.stop="$emit('on:click')">

    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon2.svg" width="13" height="13" loading="lazy" :alt="$t('Иконка стейкинга')">
        </span>
        {{ $t('staking') }} TRX:
      </div>
      <div class="panel__info">
        <span class="c-gray-light">APR</span>
        <span class="c-green">{{ userStore.user.staking_apr }}%</span>
      </div>
      <span class="panel__amount">
        {{ userStore.user.total_staked_trx || 0 }}
      </span>

      <div ref="btnDots" class="panel__dots d-desk-none">
        <img src="/images/dots.svg" loading="lazy" width="4" height="14" :alt="$t('Иконка точек')">
      </div>
    </div>
    <transition appear name="panel-buttons-transition">
      <div v-if="windowWidth > 768 || isOpen" ref="controlBtns" class="panel__buttons">
        <button @click="openModal" class="button button_bordered">{{ $t('withdraw') }}</button>
        <button @click="openModal2" class="button button_green">{{ $t('stake') }}</button>
      </div>
    </transition>


  </div>


  <ModalWindow :isVisible="isModalVisible" @close="closeModal">

    <div class="popup">

      <div class="popup__header">
        {{ $t('withdrawal_from_staking') }} TRX
      </div>

      <TrxCounter v-model="exitAmount" :max="userStore.user.total_staked_trx"/>

      <!-- class for error check_error -->
      <label class="check">
        <input v-model="unstakeAgree" class="check__input" type="checkbox">
        <i class="check__square"></i>
        <span class="check__text font-14">
              {{
            $t('desc4')
          }}
            </span>
      </label>

      <BaseButton @on:click="unstake" class="button button_green py-12 w-100" href="#">
        {{ $t('withdraw') }}
      </BaseButton>

    </div>

  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">

    <div class="popup">

      <div class="popup__header">
        {{ $t('staking') }} TRX
      </div>

      <TrxCounter v-model="amountCurrency" :max="userStore.user.trx_balance"/>

      <!-- class for error check_error -->
      <label class="check">
        <input v-model="agree" class="check__input" type="checkbox">
        <i class="check__square"></i>
        <span class="check__text font-14">
              {{ $t('i_have_read_and_agree_to_the_staking_rules') }}
              <span class="c-green" @click="openModal3">{{ $t('staking_read') }}</span>
              {{ $t('rules') }}
            </span>
      </label>

      <BaseButton class="button button_green py-12 w-100" @on:click="stake">
        {{ $t('start_staking') }}
      </BaseButton>

    </div>

  </ModalWindow>

  <ModalWindow overlayClass="overflow" :isVisible="isModalVisible3" @close="closeModal3">

    <div class="popup-rule">

      <div class="popup-rule__header">
        {{ $t('staking_terms_and_conditions') }}
      </div>

      <div class="popup-rule__body">
        <div>
          <b>
            1. {{ $t('terms_and_conditions.general_provisions.title') }}
          </b>
          <p>
            1.1 {{
              $t('terms_and_conditions.general_provisions.text1')
            }}
          </p>
          <p>
            1.2 {{
              $t('terms_and_conditions.general_provisions.text2')
            }}
          </p>
          <p>
            1.3 {{
              $t('terms_and_conditions.general_provisions.text3')
            }}
          </p>
        </div>
        <div>
          <b>
            2. {{ $t('terms_and_conditions.staking_procedure.title') }}
          </b>
          <p>
            2.1 {{
              $t('terms_and_conditions.staking_procedure.text1')
            }}
          </p>
          <p>
            2.2 {{
              $t('terms_and_conditions.staking_procedure.text2')
            }}
          </p>
          <p>
            2.3 {{
              $t('terms_and_conditions.staking_procedure.text3')
            }}
          </p>
        </div>
      </div>


    </div>

  </ModalWindow>

</template>

<script>
import AddressTron2 from '../AddressTron2/AddressTron2.vue';
import AmountTrx from '../AmountTrx/AmountTrx.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import {createStakingService, createWalletService} from "@/services/index.js";
import {useUserGlobal} from "@/store/userGlobal.js";
import TrxCounter from "@/components/TrxCounter/TrxCounter.vue";
import {useToast} from "vue-toastification";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

export default {
  components: {
    BaseButton,
    TrxCounter,
    ModalWindow,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  name: 'PanelStaking',
  data() {
    return {
      amount: '3 500',
      address: '',
      exitAmount: 0,
      confirmationCode: '',
      request_id: '',
      amountCurrency: 0,
      isModalVisible: false,
      sendStart: false,
      unstakeAgree: false,
      agree: false,
      isModalVisible2: false,
      isModalVisible3: false,
      isButtonsActive: false, // Добавляем новое состояние для управления классом,
      paymentEndpoint: {
        qr_code: '',
        address: ''
      },
      windowWidth: window.innerWidth,

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
  computed: {
    loggedIn() {
      return this.userStore.loggedIn;
    },
  },
  mounted() {
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
      }).catch((error => {
        this.toast.error(this.$t('an_error_occurred'))
      }));
    },
    sendWithDrawal(e) {
      this.sendStart = true
      if (!this.address) {
        return;
      }
      this.sendStart = false
      e.loading.start()

      createWalletService().withdrawFunds({amount: this.exitAmount, wallet_address: this.address})
          .then((response) => {
            this.request_id = response.request_id;
            this.closeModal()
          });
      this.openModal3();

    },
    confirmWithdrawal(e) {
      e.loading.start()
      createWalletService().confirmWithdrawal({
        request_id: this.request_id,
        code: this.confirmationCode
      }).then((response) => {
        this.closeModal3();
        this.toast.success(this.$t(response.message))
      }).catch((error) => {
        this.toast.error(error.message || this.$t('an_error_occurred'))
      }).finally(() => {
        e.loading.stop()
      });
    },

    resendCode() {
      createWalletService().resendWithdrawalCode({request_id: this.request_id}).then((response) => {
        this.request_id = response.request_id;
      });
    },
    openModal() {
      this.isModalVisible = true;
      this.isButtonsActive = false

    },
    closeModal() {
      this.isModalVisible = false;
      this.exitAmount = 0
    },
    openModal2() {
      this.isButtonsActive = false

      this.isModalVisible2 = true;
    },
    stake(e) {
      if (!this.agree) {
        this.toast.error(this.$t('desc5'));
        e.loading.stop()
        return;
      }
      if (this.amountCurrency <= 0) {
        this.toast.error(this.$t('enter_out_amount'));
        e.loading.stop()
        return;
      }
      createStakingService().stakeAmount(this.amountCurrency)
          .then((response) => {
            this.userStore.initUserGlobal();
            this.closeModal2()
            this.toast.success(response.message)
          })
          .catch((error) => {
            this.toast.error(error.message || this.$t('an_error_occurred'));
          })
          .finally(() => {
            e.loading.stop()
          });

    },
    closeModal2() {
      this.isModalVisible2 = false;
      this.amountCurrency = 0
    },
    unstake(e) {

      if (!this.unstakeAgree) {
        this.toast.error(this.$t('desc5'));
        e.loading.stop()
        return;
      }

      if (this.exitAmount > 0) {
        e.loading.start()
        createStakingService()
            .unstakeAmount(this.exitAmount)
            .then(response => {
              this.closeModal()
              this.toast.success(response.message)
            })
            .catch(err => {
              this.toast.error(err.message || this.$t('an_error_occurred'));
            })
            .finally(() => {
              e.loading.stop()
            })
      } else {
        this.toast.error(this.$t('enter_out_amount'))
      }
    },
    openModal3() {
      this.isModalVisible3 = true;
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
  },
};
</script>

<style scoped lang="scss">
@import './PanelStaking.scss';

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

</style>
