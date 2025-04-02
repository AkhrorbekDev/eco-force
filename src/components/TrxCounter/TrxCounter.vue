<template>
  <div class="trx-counter d-grid gap-8">
    <span>
      {{ $t('TRX') }}
    </span>
    <div class="trx-counter__row">

      <div class="trx-counter__wrapper">
        <input class="trx-counter__value" :value="modelValue" type="text" @input="filterInput">
        <span class="trx-counter__max" @click="setMaxValue">
          {{ $t('max') }}
        </span>
      </div>

      <div class="trx-counter__controls">
        <div class="trx-counter__button _minus" @click="decrement">{{ $t('–') }}</div>
        <div class="trx-counter__button _plus" @click="increment">{{ $t('+') }}</div>
      </div>
    </div>

    <div v-if="!isMultipleOf" class="font-14 c-red">
      {{ $t('Значение должно быть кратно') }} {{ step }}
    </div>

  </div>
</template>

<script>
import {useEnergyGlobal} from "@/store/energyGlobal.js";
import {useUserGlobal} from "@/store/userGlobal.js";
import {useTrxGlobal} from "@/store/trxGlobal.js";

export default {
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      count: 0,
      step: 100,
    };
  },
  setup() {
    const useUserStore = useUserGlobal();
    const useTrxStore = useTrxGlobal();
    return {
      useUserStore,
    }
  },
  computed: {
    isMultipleOf() {
      return this.modelValue % this.step === 0;
    },
    maxValue () {
      return this.$props.max
    }
  },
  methods: {
    increment() {
      let count = this.modelValue
      count += this.step;
      this.$emit('update:modelValue', count);
    },
    decrement() {
      let count = this.modelValue
      if (count >= this.step) {
        count -= this.step;
        this.$emit('update:modelValue', count);
      }
    },
    filterInput(event) {

      const value = event.target.value.replace(/\D/g, '');
      let count = value ? parseInt(value, 10) : 0;
      if (count > this.maxValue) {
        count = this.maxValue;
        event.target.value = count;
      }
      this.$emit('update:modelValue', count);

    },
    setMaxValue() {
      let count = this.maxValue;
      this.$emit('update:modelValue', count);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './TrxCounter.scss';
</style>
