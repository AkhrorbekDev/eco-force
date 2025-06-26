<template>
  <div class="trx-counter d-grid gap-8">
    <span>
      {{$t('amount')}} TRX
    </span>
    <div class="trx-counter__row">
      <div class="trx-counter__wrapper">
        <input class="trx-counter__value" :value="amount" type="text" @input="filterInput">
        <span class="trx-counter__max" @click="setMaxValue">
          {{ $t('max') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalAmount: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: 0,
      step: 100,
      maxValue: 10000,
    };
  },
  mounted() {
    this.count = this.$props.amount;
  },
  methods: {
    filterInput(event) {
      const value = event.target.value.replace(/\D/g, '');
      this.count = value ? parseInt(value, 10) : 0;
      this.updateModel()

    },
    setMaxValue() {
      this.count = this.$props.totalAmount;
      this.updateModel()
    },
    updateModel() {
      this.$emit('update:amount', this.count);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './AmountTrx.scss';
</style>
