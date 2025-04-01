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
        {{ userStore.user.trx_balance || 0 }}
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

  <!-- Вывести -->
  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup-take">

      <div class="popup-take__header">
        Вывод средств
      </div>

      <div class="address-tron d-grid gap-8 mb-16">
        <span>Адрес <b>TRON</b></span>
        <div :class="{
          invalid: !address && sendStart,
        }" class="address-tron__value">
          <input v-model="address" type="text">
        </div>
      </div>

      <AmountTrx :total-amount="userStore.user.total_staked_trx || 0" v-model:amount="exitAmount"/>

      <button @click="sendWithDrawal" class="button button_green py-14 w-100 br-8 mt-24">
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

      <div class="d-grid gap-8 mb-16">
        <span class="c-gray2">
          Адрес вывода
        </span>
        <p>
          {{ address }}
        </p>
      </div>

      <p class="mb-32">
        Количество
        <b>
          TRX: {{ exitAmount }}
        </b>
      </p>

      <div class="d-grid gap-8 mb-24">
        <p class="mb-32">
          Код подтверждения из
          <b>
            Telegram
          </b>
        </p>
        <div class="popup-confirm__actions">
          <input :class="{
            invalid: !confirmationCode && sendStart,
          }" v-model="confirmationCode" type="text" class="input">
          <button class="button button_green br-8">
            Выслать код
          </button>
        </div>
      </div>

      <button class="button button_green py-14 w-100 br-8" @click="confirmWithdrawal">
        Вывести
      </button>

    </div>

  </ModalWindow>

  <!-- Пополнение -->
   <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">
    <div class="popup-order">
      <div class="popup-order__title">
        Ваш адрес для пополнения баланса в TRX
      </div>
      <div v-if="paymentEndpoint.qr_code" class="popup-order__img" v-html="paymentEndpoint.qr_code"
           style="width: 162px; height: 160px" width="162"
           height="160" loading="lazy"
           alt="QR Code Balance"/>
      <AddressTron2 v-model="paymentEndpoint.address" read-only :hasTitle="false" customClass="_big mb-12"/>
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
import {useUserGlobal} from "@/store/userGlobal.js";
import {createEnergyService, createWalletService} from "@/services/index.js";
import AmountTrx from "@/components/AmountTrx/AmountTrx.vue";

export default {
  components: {
    AmountTrx,
    ModalWindow,
    AddressTron2
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
      isButtonsActive: false,
      // Добавляем новое состояние для управления классом
    };
  },
  setup() {
    const userStore = useUserGlobal()

    return {
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

  methods: {
    getPaymentEndpoint() {
      createWalletService().requestAddress().then((response) => {
        this.paymentEndpoint = response
        this.address = response.address
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
    openModal2() {
      this.isModalVisible2 = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // Переключаем состояние
    },
  }
}
;
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
