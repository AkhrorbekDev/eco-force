<template>

  <div class="panel" @click.stop="$emit('on:click')">

    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon3.svg" width="13" height="13" loading="lazy" >
        </span>
        {{ $t('energy') }}:
      </div>
      <div class="panel__info">
        <span class="c-gray-light">24h</span>
        <span class="c-green">+{{ userStore.user.energy_24 || 0 }}</span>
      </div>
      <span class="panel__amount">
                {{ userStore.user.energy || 0 }}

      </span>
      <div ref="btnDots" class="panel__dots d-desk-none">
        <img src="/images/dots.svg" loading="lazy" width="4" height="14" >
      </div>
    </div>
    <transition name="panel-buttons-transition">
      <div v-if="windowWidth > 768 || isOpen" ref="controlBtns" class="panel__buttons">
        <button @click="openModal" class="button button_bordered">{{ $t('sell') }}</button>
        <button @click="openModal2" class="button button_green">{{ $t('get') }}</button>
      </div>
    </transition>


  </div>

  <ModalWindow :isVisible="isModalVisible" @close="closeModal">

    <div class="popup-sale">

      <div class="popup-sale__header">
        {{ $t('energy_sale') }}
      </div>

      <EnergyCounter :total="userStore.user.energy || 0" v-model="sellEnergyAmount"/>

      <p class="my-12">
        {{ $t('rate') }}: {{ useEnergyStore.energyGlobal.buyback_cost }} {{ $t('SUN') }} {{ $t('per_1_energy_unit') }}
      </p>

      <p class="mb-12">
        {{ $t('to_be_credited_to_the_balance') }}:
        <b>
          {{ trx_received }} TRX
        </b>
      </p>

      <BaseButton class="button button_green py-14 w-100 br-8" @on:click="sellEnergy">
        {{ $t('send') }}
      </BaseButton>

    </div>

  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">

    <div class="popup-energy">

      <div class="popup-energy__title">
        {{ $t('energy') }}
      </div>

      <b class="mb-8 d-block">
        {{ $t('enter_promo_code_and_get') }} <b>65000</b> {{ $t('free_energy') }}!
      </b>

      <input v-model="promocode" class="input mb-8" :placeholder="$t('enter_promo_code')" type="text">

      <p v-if="error" class="font-14 c-red mb-16">
        {{ error }}
      </p>

      <BaseButton class="button button_green py-14 w-100 br-8" @on:click="buyEnergy">
        {{ $t('send') }}
      </BaseButton>

    </div>

  </ModalWindow>

</template>

<script>
import EnergyCounter from '../EnergyCounter/EnergyCounter.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import {createUserService, createEnergyService} from "@/services";
import {useUserGlobal} from "@/store/userGlobal.js";
import {useEnergyGlobal} from "@/store/energyGlobal.js";
import {useTrxGlobal} from "@/store/trxGlobal.js";
import BaseButton from "@/components/BaseButton/BaseButton.vue";
import {useToast} from "vue-toastification";

export default {
  components: {
    BaseButton,
    ModalWindow,
    EnergyCounter,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  name: 'PanelEnergy',
  setup() {
    const userStore = useUserGlobal()
    const useEnergyStore = useEnergyGlobal()
    const useTrxStore = useTrxGlobal()
    const toast = useToast()
    return {
      toast,
      userStore,
      useEnergyStore,
      useTrxStore
    }
  },
  data() {
    return {
      amount: '13 832',
      promocode: '',
      error: '',
      sellEnergyAmount: 0,
      isModalVisible: false,
      isModalVisible2: false,
      windowWidth: window.innerWidth,
      isButtonsActive: false, // Добавляем новое состояние для управления классом

    };
  },
  computed: {
    trx_received() {
      return (this.sellEnergyAmount * this.useEnergyStore.energyGlobal.buyback_cost) / 1_000_000
    }
  },
  mounted() {
    this.onResizeBtnClose()
    window.addEventListener('resize', this.updateWindowWidth);

  },
  unmounted() {
    window.removeEventListener('resize', this.onResizeBtnClose);
    document.removeEventListener('click', this.clickOutside);
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
      if ((this.isButtonsActive && !this.$refs.controlBtns.contains(e.target))) {
        this.isButtonsActive = false
      }
    },
    buyEnergy(e) {
      if (!this.promocode) {
        this.error = this.$t('enter_promo_code')
      } else {
        e.loading.start()
        createUserService().usePromoCode(this.promocode).then((response) => {
          this.$emit('on:success', response)
        }).catch((error) => {
          this.error = error.data.error || error.message
        }).finally(() => {
          e.loading.stop()
        });
      }
    },
    sellEnergy(e) {
      if (this.sellEnergyAmount <= 0) {
        this.error = this.$t('enter_energy_amount')
        return
      }
      e.loading.start()
      createEnergyService().sellEnergy(this.sellEnergyAmount).then((response) => {
        this.$emit('on:success', response)
        this.toast.success(response.message || this.$t('successful_process'))
        this.closeModal()
      }).catch((error) => {
        this.error = error.data.detail || error.message
      }).finally(() => {
        e.loading.stop()
      });
    },
    openModal() {
      this.isModalVisible = true;
      this.isButtonsActive = false
    },
    closeModal() {
      this.isModalVisible = false;
      this.isButtonsActive = false
    },
    openModal2() {
      this.isModalVisible2 = true;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // Переключаем состояние
      if (this.isButtonsActive) {
        window.addEventListener('resize', this.onResizeBtnClose);

      } else {
        window.removeEventListener('resize', this.onResizeBtnClose);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import './PanelEnergy.scss';

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

.popup-sale {
  width: 480px;
  padding: 40px;

  &__header {
    margin-bottom: 24px;
    font-size: 22px;
    line-height: 30px;
    font-weight: 600;
  }

}

.popup-energy {
  width: 480px;
  padding: 40px;

  &__title {
    margin-bottom: 24px;
    font-size: 22px;
    line-height: 30px;
    font-weight: 600;
  }

}

</style>
