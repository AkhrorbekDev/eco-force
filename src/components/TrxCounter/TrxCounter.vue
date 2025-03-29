<template>
  <div class="trx-counter d-grid gap-8">
    <span>
      TRX
    </span>
    <div class="trx-counter__row">

      <div class="trx-counter__wrapper">
        <input class="trx-counter__value" v-model="count" type="text" @input="filterInput">
        <span class="trx-counter__max" @click="setMaxValue">
          max
        </span>
      </div>

      <div class="trx-counter__controls">
        <div class="trx-counter__button _minus" @click="decrement">–</div>
        <div class="trx-counter__button _plus" @click="increment">+</div>
      </div>
    </div>

    <div v-if="!isMultipleOf" class="font-14 c-red">
      Сумма должна быть кратна {{ step }}
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 2056,
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
    increment() {
      this.count += this.step;
    },
    decrement() {
      if (this.count >= this.step) {
        this.count -= this.step;
      }
    },
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
@import './TrxCounter.scss';
</style>