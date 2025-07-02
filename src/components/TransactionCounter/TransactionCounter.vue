<template>
  <div class="transaction-counter d-grid gap-8">
    <div class="row jc-sb">
      <span>
        {{ $t('transitions') }}
      </span>
      <span class="question d-desk-none">
        <i>
          ?
         </i>
      </span>
    </div>
    <div class="transaction-counter__row">
      <input class="transaction-counter__value" v-model="count" type="text" @input="filterInput">
      <div class="transaction-counter__controls">
        <div class="transaction-counter__button _minus" @click="decrement">-</div>
        <div class="transaction-counter__button _plus" @click="increment">+</div>
      </div>
    </div>
    <div v-if="isMultipleOf" class="transaction-counter__error">
      {{ $t('value_must_be_a_multiple_of') }} {{ step }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    };
  },
  computed: {
    isMultipleOf() {
      return this.modelValue % this.count === 0;
    }
  },
  methods: {
    increment() {
      this.count++;
      this.updateModelValue()
      this.$emit('increment', this.count)
    },
    decrement() {
      if (this.count > 1) {
        this.count--;
        this.updateModelValue()
        this.$emit('decrement', this.count)
      }
    },
    filterInput(event) {
      this.count = event.target.value.replace(/\D/g, '');
      this.updateModelValue(this.count);
    },
    updateModelValue() {
      this.$emit('update:modelValue', this.count);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './TransactionCounter.scss';
</style>
