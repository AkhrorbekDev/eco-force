<template>

  <div class="panel">

    <div class="panel__head">
      <div class="panel__name">
        <span class="panel__icon">
          <img src="/images/p-icon3.svg" width="13" height="13" loading="lazy" alt="Lightning Icon">
        </span>
        Энергия:
      </div>
      <div class="panel__info">
        <span class="c-gray-light">24h</span>
        <span class="c-green">+{{ userStore.user.energy_24 || 0 }}</span>
      </div>
      <span class="panel__amount">
                {{ userStore.user.energy || 0 }}

      </span>
    </div>

    <div class="panel__buttons" :class="{ '_active': isButtonsActive }">
      <button @click="openModal" class="button button_bordered">Продать</button>
      <button @click="openModal2" class="button button_green">Получить</button>
    </div>

    <div class="panel__dots d-desk-none" @click="toggleButtonsClass">
      <img src="/images/dots.svg" loading="lazy" width="4" height="14" alt="Icon Dots">
    </div>

  </div>

  <ModalWindow :isVisible="isModalVisible" @close="closeModal">

    <div class="popup-sale">

      <div class="popup-sale__header">
        Продажа энергии
      </div>

      <EnergyCounter :total="userStore.user.energy || 0" v-model="sellEnergyAmount"/>

      <p class="my-12">
        Курс: {{ useEnergyStore.energyGlobal.buyback_cost }} SUN за 1 единицу энергии
      </p>

      <p class="mb-12">
        К зачислению на баланс:
        <b>
          {{ trx_received }} TRX
        </b>
      </p>

      <button class="button button_green py-14 w-100 br-8" @click="sellEnergy">
        Отправить
      </button>

    </div>

  </ModalWindow>

  <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">

    <div class="popup-energy">

      <div class="popup-energy__title">
        Энергия
      </div>

      <b class="mb-8 d-block">
        Введи промокод и получил <b>65000</b> энергии бесплатно!
      </b>

      <input v-model="promocode" class="input mb-8" placeholder="" type="text">

      <p v-if="error" class="font-14 c-red mb-16">
        {{ error }}
      </p>

      <button class="button button_green py-14 w-100 br-8" @click="buyEnergy">
        Отправить
      </button>

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

export default {
  components: {
    ModalWindow,
    EnergyCounter,
  },
  name: 'PanelEnergy',
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
      amount: '13 832',
      promocode: '',
      error: '',
      sellEnergyAmount: 0,
      isModalVisible: false,
      isModalVisible2: false,
      isButtonsActive: false, // Добавляем новое состояние для управления классом
    };
  },
  computed: {
    trx_received() {
      return (this.sellEnergyAmount * this.useEnergyStore.energyGlobal.buyback_cost) / 1_000_000
    }
  },
  mounted() {

  },
  methods: {

    buyEnergy() {
      if (!this.promocode) {
        this.error = 'Введите промокод'
      } else {
        createUserService().usePromoCode({code: this.promocode}).then((response) => {
          this.$emit('on:success', response)
        }).catch((error) => {
          this.error = error.data.detail || error.message
        });
      }
    },
    sellEnergy() {
      if (this.sellEnergyAmount <= 0) {
        this.error = 'Введите количество энергии'
        return
      }

      createEnergyService().sellEnergy(this.sellEnergyAmount).then((response) => {
        this.$emit('on:success', response)
      }).catch((error) => {
        this.error = error.data.detail || error.message
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
    closeModal2() {
      this.isModalVisible2 = false;
    },
    toggleButtonsClass() {
      this.isButtonsActive = !this.isButtonsActive; // Переключаем состояние
    },
  },
};
</script>

<style scoped lang="scss">
@import './PanelEnergy.scss';

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
