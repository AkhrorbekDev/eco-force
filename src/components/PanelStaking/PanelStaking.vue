<template>

  <div class="panel">

    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon2.svg" width="13" height="13" loading="lazy" :alt="$t('Иконка стейкинга')">
        </span>
        {{ $t('Стейкинг') }} {{ $t('TRX') }}:
      </div>
      <div class="panel__info">
        <span class="c-gray-light">APR</span>
        <span class="c-green">{{ userStore.user.staking_apr }}%</span>
      </div>
      <span class="panel__amount">
        {{ userStore.user.total_staked_trx || 0 }}
      </span>
    </div>

    <div ref="controlBtns" class="panel__buttons" :class="{ '_active': isButtonsActive }">
      <button @click="openModal" class="button button_bordered">{{ $t('Вывести') }}</button>
      <button @click="openModal2" class="button button_green">{{ $t('Стейкать') }}</button>
    </div>

    <div ref="btnDots" class="panel__dots d-desk-none" @click="toggleButtonsClass">
      <img src="/images/dots.svg" loading="lazy" width="4" height="14" :alt="$t('Иконка точек')">
    </div>

  </div>


  <ModalWindow :isVisible="isModalVisible" @close="closeModal">

    <div class="popup">

      <div class="popup__header">
        {{ $t('Вывод из стейкинга') }} TRX
      </div>

      <TrxCounter v-model="exitAmount" :max="userStore.user.total_staked_trx"/>

      <!-- class for error check_error -->
      <label class="check">
        <input v-model="unstakeAgree" class="check__input" type="checkbox">
        <i class="check__square"></i>
        <span class="check__text font-14">
              {{
            $t('После подтверждения вывода стейкинга, средства поступят на баланс через 14 дней, а генерация энергии остановится.')
          }}
            </span>
      </label>

      <BaseButton @on:click="unstake" class="button button_green py-12 w-100" href="#">
        {{ $t('Вывести') }}
      </BaseButton>

    </div>

  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">

    <div class="popup">

      <div class="popup__header">
        {{ $t('Стейкинг') }} TRX
      </div>

      <TrxCounter v-model="amountCurrency" :max="userStore.user.trx_balance"/>

      <!-- class for error check_error -->
      <label class="check">
        <input v-model="agree" class="check__input" type="checkbox">
        <i class="check__square"></i>
        <span class="check__text font-14">
              {{ $t('С') }}
              <span class="c-green" @click="openModal3">{{ $t('правилами') }}</span>
              {{ $t('стейкинга ознакомлен') }}
            </span>
      </label>

      <BaseButton class="button button_green py-12 w-100" @on:click="stake">
        {{ $t('Начать стейкинг') }}
      </BaseButton>

    </div>

  </ModalWindow>

  <ModalWindow overlayClass="overflow" :isVisible="isModalVisible3" @close="closeModal3">

    <div class="popup-rule">

      <div class="popup-rule__header">
        {{ $t('Условия и правила стейкинга') }}
      </div>

      <div class="popup-rule__body">
        <div v-for="(item,i) in $rm('terms_and_conditions')" :key="i">
          <b>
            {{ $t('1. Общие положения') }}
          </b>
          <p>
            {{
              $t('1.1. Стейкинг осуществляется на платформе EcoForce и позволяет пользователям замораживать токены TRX для получения энергии и дохода.')
            }}
          </p>
          <p>
            {{
              $t('1.2. Участие в стейкинге является добровольным, и пользователь несёт ответственность за понимание связанных рисков.')
            }}
          </p>
          <p>
            {{
              $t('1.3. Стейкинг регулируется настоящими условиями и правилами, которые пользователь принимает при добавлении токенов в стейкинг.')
            }}
          </p>
        </div>
        <div>
          <b>
            {{ $t('2. Порядок стейкинга') }}
          </b>
          <p>
            {{ $t('2.1. Пользователь добавляет токены TRX в стейкинг через личный кабинет на платформе..') }}
          </p>
          <p>
            {{ $t('2.2. Замороженные токены TRX автоматически участвуют в общем пуле стейкинга платформы.') }}
          </p>
          <p>
            {{
              $t('2.3. Энергия начисляется динамически и рассчитывается на основе общей суммы TRX, находящихся в стейкинге сети Tron.')
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
    AddressTron2,
    AmountTrx,
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
  },
  unmounted() {
    window.removeEventListener('resize', this.onResizeBtnClose);
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
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
        this.toast.error(this.$t('errorOccurred'))
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
        this.toast.error(error.message || this.$t('errorOccurred'))
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
        this.toast.error(this.$t('Вы должны согласиться с условиями стейкинга'));
        e.loading.stop()
        return;
      }
      if (this.amountCurrency <= 0) {
        this.toast.error(this.$t('Введите количество для стейкинга'));
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
            this.toast.error(error.message || this.$t('errorOccurred'));
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
        this.toast.error(this.$t('Вы должны согласиться с условиями стейкинга'));
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
              this.toast.error(err.message || this.$t('errorOccurred'));
            })
            .finally(() => {
              e.loading.stop()
            })
      } else {
        this.toast.error(this.$t('Введите количеству для вывода'))
      }
    },
    openModal3() {
      this.isModalVisible3 = true;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // {{ $t('Переключаем состояние') }}
    },
  },
};
</script>

<style scoped lang="scss">
@import './PanelStaking.scss';

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
