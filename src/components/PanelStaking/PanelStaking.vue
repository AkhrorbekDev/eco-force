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

    <div class="panel__buttons" :class="{ '_active': isButtonsActive }">
      <button @click="openModal" class="button button_bordered">{{ $t('Вывести') }}</button>
      <button @click="openModal2" class="button button_green">{{ $t('Стейкать') }}</button>
    </div>

    <div class="panel__dots d-desk-none" @click="toggleButtonsClass">
      <img src="/images/dots.svg" loading="lazy" width="4" height="14" :alt="$t('Иконка точек')">
    </div>

  </div>


  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup-take">
      <div class="popup-take__header">
        {{ $t('Вывод из стейкинга') }}
      </div>

      <div class="address-tron d-grid gap-8 mb-16">
        <span>{{ $t('Адрес') }} <b>{{ $t('TRX') }}</b></span>
        <div :class="{
          invalid: !address && sendStart,
        }" class="address-tron__value">
          <input v-model="address" type="text">
        </div>
      </div>

      <AmountTrx :total-amount="userStore.user.total_staked_trx || 0" v-model:amount="exitAmount"/>

      <button @click="sendWithDrawal" class="button button_green py-14 w-100 br-8 mt-24">
        {{ $t('Вывести') }}
      </button>
    </div>
  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible3" @close="closeModal3">
    <div class="popup-confirm">
      <div class="popup-confirm__header">
        {{ $t('Подтверждение вывода') }}
      </div>

      <div class="d-grid gap-8 mb-16">
        <span class="c-gray2">
          {{ $t('Адрес вывода') }}
        </span>
        <p>
          {{ address }}
        </p>
      </div>

      <p class="mb-32">
        {{ $t('Количество') }}
        <b>
          {{ $t('TRX') }}: {{ exitAmount }}
        </b>
      </p>

      <div class="d-grid gap-8 mb-24">
        <p class="mb-32">
          {{ $t('Код подтверждения из') }}
          <b>
            {{ $t('Telegram') }}
          </b>
        </p>
        <div class="popup-confirm__actions">
          <input :class="{
            invalid: !confirmationCode && sendStart,
          }" v-model="confirmationCode" type="text" class="input">
          <button class="button button_green br-8">
            {{ $t('Выслать код') }}
          </button>
        </div>
      </div>

      <button class="button button_green py-14 w-100 br-8" @click="confirmWithdrawal">
        {{ $t('Вывести') }}
      </button>
    </div>
  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">
    <div class="popup-order">
      <div class="popup-order__title">
        {{ $t('Стейкинг TRX') }}
      </div>
      <div v-if="paymentEndpoint.qr_code" class="popup-order__img" v-html="paymentEndpoint.qr_code"
           style="width: 162px; height: 160px" width="162"
           height="160" loading="lazy"
           :alt="$t('QR код стейкинга')"/>
      <AddressTron2 v-model="paymentEndpoint.address" read-only :hasTitle="false" customClass="_big mb-12"/>
      <b class="mb-24 d-block">
        {{ $t('Переведите любую сумму') }}
      </b>
      <button class="button button_green py-14 w-100 br-8" @click="closeModal2">
        {{ $t('Закрыть') }}
      </button>
    </div>
  </ModalWindow>

  <ModalWindow overlayClass="overflow" :isVisible="isModalVisible3" @close="closeModal3">

    <div class="popup-rule">

      <div class="popup-rule__header">
        {{ $t('Условия и правила стейкинга') }}
      </div>

      <div class="popup-rule__body">
        <div>
          <b>
            {{ $t('1. Общие положения') }}
          </b>
          <p>
            {{ $t('1.1. Стейкинг осуществляется на платформе EcoForce и позволяет пользователям замораживать токены TRX для получения энергии и дохода.') }}
          </p>
          <p>
            {{ $t('1.2. Участие в стейкинге является добровольным, и пользователь несёт ответственность за понимание связанных рисков.') }}
          </p>
          <p>
            {{ $t('1.3. Стейкинг регулируется настоящими условиями и правилами, которые пользователь принимает при добавлении токенов в стейкинг.') }}
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
            {{ $t('2.3. Энергия начисляется динамически и рассчитывается на основе общей суммы TRX, находящихся в стейкинге сети Tron.') }}
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

export default {
  components: {
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

    return {
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
  methods: {
    getPaymentEndpoint() {
      createWalletService().requestAddress().then((response) => {
        this.paymentEndpoint = response
      });
    },
    sendWithDrawal() {
      this.sendStart = true
      if (!this.address) {
        return;
      }
      this.sendStart = false

      createWalletService().withdrawFunds({amount: this.exitAmount, wallet_address: this.address}).then((response) => {
        this.request_id = response.request_id;
        this.closeModal()
      });
      this.openModal3();

    },
    confirmWithdrawal() {
      createWalletService().confirmWithdrawal({
        request_id: this.request_id,
        code: this.confirmationCode
      }).then((response) => {
        this.closeModal3();
      });
    },

    resendCode() {
      createWalletService().resendWithdrawalCode({request_id: this.request_id}).then((response) => {
        this.request_id = response.request_id;
      });
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openModal2() {
      this.isModalVisible2 = true;
    },
    stake() {
      if (!this.agree) {
        return;
      }
      createStakingService().stakeAmount(this.amountCurrency)
          .then((response) => {
            this.userStore.getUserDetails();
            this.isModalVisible = false;
          })
          .catch((error) => {
            console.log(error)
          });

    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    unstake () {

      if (!this.unstakeAgree) {
        return;
      }

      if (this.exitAmount > 0) {
        createStakingService().unstakeAmount(this.exitAmount).then((response) => {
          this.closeModal()
        });
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
