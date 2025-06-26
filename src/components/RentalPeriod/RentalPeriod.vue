<template>
  <div class="rental-period d-grid gap-8">
    <span>
      {{ $t('desc28') }}
    </span>
    <div class="rental-period__row">
      <div
          v-for="(period, index) in periods"
          :key="index"
          @click="setActivePeriod(index)"
          :class="['rental-period__button', { _active: activePeriod === index }]"
      >
        {{ $t(period) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RentalPeriod",
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      periods: ['desc31', 'desc29', 'desc30'],
      activePeriod: 0
    };
  },
  methods: {
    setActivePeriod(index) {
      this.activePeriod = index;
      this.$emit('update:modelValue', index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './RentalPeriod.scss';
</style>
