<template>
  <div class="currency-input">
    <input
      type="text"
      :value="modelValue"
      @input="validateAmount"
      :placeholder="$t('enter_amount')"
      class="amount-input"
    />
    <select v-model="selectedCurrency">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ $t(currency) }}
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
      currencies: ['TRX', 'BTC', 'ETH', 'USDT'],  // {{ $t('Добавьте дополнительные валюты по мере необходимости') }}
    };
  },
  methods: {
    validateAmount(event) {
      const value = event.target.value;

      if (/^\d*$/.test(value)) {
        this.amount = value;
      } else {
        // {{ $t('Если ввели что-то неверное, просто игнорируем ввод') }}
        event.target.value = this.amount; // {{ $t('Возвращаем значение поля к предыдущему значению') }}
      }
      this.$emit('update:model-value', this.amount);
    },
  },
};
</script>

<style scoped lang="scss">
@import './currency-input.scss';
</style>
