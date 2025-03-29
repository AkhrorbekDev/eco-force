<template>
  <div class="transaction-counter d-grid gap-8">
    <div class="row jc-sb">
      <span>
        Транзакций
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
        <div class="transaction-counter__button _minus" @click="decrement">–</div>
        <div class="transaction-counter__button _plus" @click="increment">+</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 2
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      if (this.count > 0) {
        this.count--;
      }
    },
    filterInput(event) {
      this.count = event.target.value.replace(/\D/g, '');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './TransactionCounter.scss';
</style>