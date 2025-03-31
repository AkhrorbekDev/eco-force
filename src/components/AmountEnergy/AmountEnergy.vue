<template>
  <div class="amount-energy d-grid gap-8">
    <span> Количество энергии </span>
    <div class="row">
      <div class="amount-energy__value">
        <input
          v-model="amountEnergy"
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
          alt="calculator"
        />
      </div>
    </div>
  </div>

  <ModalWindow :isVisible="isModalVisible" @close="closeModal">
    <div class="popup">
      <div class="popup__header">Калькулятор транзакций</div>

      <div class="popup__body">
        <SendUsdt />

        <p class="font-14 c-green mb-20">Необходимо энергии: 64285</p>

        <PreloaderCopy />

        <!-- Отображаем все PreloaderCopy -->
        <PreloaderCopy v-for="(preloader, index) in preloaders" :key="index" />

        <!-- Кнопка "добавить еще" -->
        <div class="popup__add font-14" @click="addPreloader">
          + добавить еще
        </div>

        <div class="popup__total">
          <span class="font-14">
            Итого:
          </span>
          <div class="row gap-10 ai-c">
            <span class="popup__amount">
              200 000
            </span>
            <img src="/images/lightning.svg" width="9" height="16" loading="lazy" alt="lightning">
          </div>
        </div>

        <a class="button button_green py-12 w-100" href="#"> Заполнить </a>
      </div>
    </div>
  </ModalWindow>

</template>

<script>
import { ref } from "vue";
import ModalWindow from "../ModalWindow/ModalWindow.vue";
import SendUsdt from "../SendUsdt/SendUsdt.vue";
import PreloaderCopy from "../PreloaderCopy/PreloaderCopy.vue";

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
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./amount-energy.scss";

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
