<template>
  <div class="amount-energy d-grid gap-8">
    <span> {{$t('energy_amount')}} </span>
    <div class="row">
      <div class="amount-energy__value">
        <input
            :value="modelValue"
            placeholder="0"
            @input="filterInput"
            type="text"
        />
        <span class="amount-energy__cross cross" @click="clearInput">
          <i class="cross__line"></i>
        </span>
      </div>
      <div class="amount-energy__button" @click="openModal">
        <img
            src="/images/calculator-one.svg"
            loading="lazy"
            width="24"
            height="24"
        />
      </div>
    </div>
  </div>

  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup">
      <div class="popup__header">{{ $t('transaction_calculator') }}</div>
      <div v-show="loading" class="loader-bar-container">
        <div class="loader-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="popup__body">
        <template v-for="(delegationAddress, index) in delegationAddresses" :key="index">
          <SendUsdt v-model="delegationAddress.address" @update:model-value="sendAddress(index)"
                    @on:delete="deleteAddress(index)"/>

          <p class="font-14 c-green mb-20">{{ $t('energy_required') }}: {{ delegationAddress.energy_cost }}</p>

        </template>

        <!--        <PreloaderCopy />-->

        <!-- Отображаем все PreloaderCopy -->
        <!--        <PreloaderCopy v-for="(preloader, index) in preloaders" :key="index" />-->

        <!-- Кнопка "добавить еще" -->
        <div v-if="delegationAddresses.length < 3" class="popup__add font-14" @click="addAddress">
          + {{ $t('add_more') }}
        </div>

        <div class="popup__total">
          <span class="font-14">
            {{ $t('total') }}:
          </span>
          <div class="row gap-10 ai-c">
            <span class="popup__amount">
              {{ totalEnergyCost }}
            </span>
            <img src="/images/lightning.svg" width="9" height="16" loading="lazy" >
          </div>
        </div>

        <button :disabled="disableSaveButton" class="button button_green py-12 w-100" @click="saveEnergyCosts">
          {{ $t('fill') }}
        </button>
      </div>
    </div>
  </ModalWindow>

</template>

<script>
import {ref} from "vue";
import ModalWindow from "../ModalWindow/ModalWindow.vue";
import SendUsdt from "../SendUsdt/SendUsdt.vue";
import PreloaderCopy from "../PreloaderCopy/PreloaderCopy.vue";
import {createEnergyService} from "@/services/index.js";

export default {
  components: {
    ModalWindow,
    SendUsdt,
    PreloaderCopy,
  },
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isModalVisible: false,
      delegationAddresses: [
        {
          address: '',
          energy_cost: 0,
        }
      ],
      timeout: null,
      intervalLoader: null,
      progress: 0,
      loading: false,
      disableSaveButton: false,
    };
  },
  setup(_, {emit}) {
    const amountEnergy = ref(_.modelValue); // Переменная для хранения значения ввода
    const preloaders = ref([]); // Массив для хранения компонентов PreloaderCopy

    const clearInput = () => {
      amountEnergy.value = 0;
      emit('update:modelValue', amountEnergy.value);

    };

    const filterInput = (event) => {
      // Убираем все символы, кроме цифр
      const filteredValue = event.target.value.replace(/[^\d]/g, "");
      // Обновляем значение amountEnergy с отфильтрованным значением
      amountEnergy.value = filteredValue;
      emit('update:modelValue', amountEnergy.value);
    };

    // Функция для добавления PreloaderCopy
    const addPreloader = () => {
      preloaders.value.push({}); // Добавляем новый элемент в массив
    };

    return {
      amountEnergy,
      clearInput,
      filterInput,
      preloaders,
      addPreloader,
    };
  },
  computed: {
    totalEnergyCost() {
      return this.delegationAddresses.reduce((acc, item) => acc + item.energy_cost, 0);
    }
  },
  methods: {
    addAddress() {
      this.delegationAddresses.push({
        address: '',
        energy_cost: 0,
      });
    },
    saveEnergyCosts() {
      if (this.disableSaveButton) {
        return
      }
      if (this.totalEnergyCost) {
        this.$emit('update:modelValue', Math.ceil(this.totalEnergyCost / 1000) * 1000);
      }
      this.closeModal();
    },
    sendAddress(index) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (this.delegationAddresses[index].address === '') {
        return;
      }
      this.disableSaveButton = true
      this.startLoading()
      this.timeout = setTimeout(() => {
        createEnergyService().getEnergyCostPerAddress(this.delegationAddresses[index].address)
            .then((response) => {
              if (this.isModalVisible) {
                this.delegationAddresses[index].energy_cost = response.energy_cost;
              }
            }).finally(() => {
          this.disableSaveButton = false
          this.finishLoading()
        });
      }, 500);
    },
    deleteAddress(index) {
      if (index === 0 && this.delegationAddresses.length === 1) {
        this.delegationAddresses[0].address = '';
        this.delegationAddresses[0].energy_cost = 0;
        return;

      }
      this.delegationAddresses.splice(index, 1);
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.delegationAddresses = [
        {
          address: '',
          energy_cost: 0,
        }
      ];
    },
    startLoading() {
      this.loading = true;
      this.progress = 0;
      this.intervalLoader = setInterval(() => {
        if (this.progress < 95) {
          this.progress += 5;
        }
      }, 100);
    },
    finishLoading() {
      clearInterval(this.intervalLoader);
      this.progress = 100;
      setTimeout(() => {
        this.loading = false;
        this.progress = 0;
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./amount-energy.scss";
.loader-bar-container {
  height: 2px;
  background-color: #f0f0f0;
  border-radius: 2px;
  margin-bottom: 20px;
  .loader-bar {
    background-color: var(--color2);
    height: 100%;
  }
}
.popup {
  gap: 20px;
  width: 418px;

  &__header {
    padding: 16px;
    border-bottom: 1px solid #dedee2;
  }

  &__body {
    padding: 16px;
  }

  &__add {
    width: fit-content;
    margin-bottom: 20px;
    padding: 10px 14px;
    border: 1px solid var(--color2);
    border-radius: 8px;
    cursor: pointer;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid #DEDEE2;
  }

  &__amount {
    font-size: 22px;
    line-height: 28px;
    font-weight: 700;
  }

}

</style>
