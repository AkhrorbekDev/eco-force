<template>
  <div class="trx-counter d-grid gap-8">
    <span>
      Количество TRX
    </span>
    <div class="trx-counter__row">
      <div class="trx-counter__wrapper">
        <input class="trx-counter__value" v-model="count" type="text" @input="filterInput">
        <span class="trx-counter__max" @click="setMaxValue">
          max
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 156,
      step: 100,
      maxValue: 10000, // Максимальное значение
    };
  },
  computed: {
    isMultipleOf() {
      return this.count % this.step === 0;
    }
  },
  methods: {
    filterInput(event) {
      const value = event.target.value.replace(/\D/g, '');
      this.count = value ? parseInt(value, 10) : 0;
    },
    setMaxValue() {
      this.count = this.maxValue;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './AmountTrx.scss';
</style>