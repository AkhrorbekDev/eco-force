<template>
  <div class="trx-counter d-grid gap-8">
    <span>
      Доступно:
      <b>

        {{total}}
      </b>
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
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: 0,
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
      const lastCount = this.count += this.step;
      if (lastCount >= this.$props.total) {
        this.count = this.$props.total;
      } else {
        this.count = lastCount;
      }
      this.updateModel();

    },
    decrement() {
      if (this.count >= this.step) {
        this.count -= this.step;
        this.updateModel();
      }
    },
    filterInput(event) {
      const value = event.target.value.replace(/\D/g, '');
      if (value > this.$props.total) {
        this.count = this.$props.total;
      } else {
        this.count = value ? parseInt(value, 10) : 0;
      }
      this.updateModel();

    },
    setMaxValue() {
      this.count = this.$props.total;
      this.updateModel();
    },
    updateModel() {
      this.$emit('update:modelValue', this.count);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './EnergyCounter.scss';
</style>
