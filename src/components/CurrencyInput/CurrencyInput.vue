<template>
  <div class="currency-input">
    <input
      type="text"
      :value="modelValue"
      @input="validateAmount"
      placeholder="Введите сумму"
      class="amount-input"
    />
    <select v-model="selectedCurrency">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CurrencyInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      amount: '0',
      selectedCurrency: 'TRX',
      currencies: ['TRX', 'BTC', 'ETH', 'USDT'],  // Добавьте дополнительные валюты по мере необходимости
    };
  },
  methods: {
    validateAmount(event) {
      const value = event.target.value;

      if (/^\d*$/.test(value)) {
        this.amount = value;
      } else {
        // Если ввели что-то неверное, просто игнорируем ввод
        event.target.value = this.amount; // Возвращаем значение поля к предыдущему значению
      }
      this.$emit('update:model-value', this.amount);
    },
  },
};
</script>

<style scoped lang="scss">
@import './currency-input.scss';
</style>
