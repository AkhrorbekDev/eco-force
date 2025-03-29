<template>
  <div class="custom-slider">
    <div class="custom-slider__track">
      <input
        type="range"
        :min="min"
        :max="max"
        @input="onInput"
        :style="sliderStyle"
        :value="localValue"
        class="custom-slider__input"
      />
    </div>
    <span class="custom-slider__price">
      ~ {{ localValue }} $
    </span>
  </div>
</template>

<script>
export default {
  name: 'CustomSlider',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1500,
    },
  },

  emits: ['update:modelValue'],
  data() {
    return {
      localValue: this.modelValue || 500, // Инициализация localValue значением modelValue
    };
  },
  watch: {
    // Следим за изменением modelValue извне и обновляем localValue
    modelValue(newValue) {
      this.localValue = newValue;
    },
  },
  computed: {
    // Вычисляем стиль для input
    sliderStyle() {
      const progress = (this.localValue / this.max) * 100;
      return {
        background: `linear-gradient(to right, #1AC200 ${progress}%, #CCCDCE ${progress}%)`,
      };
    },
  },
  methods: {
    // Обработчик изменения значения input
    onInput(event) {
      const value = Number(event.target.value);
      this.localValue = value; // Обновляем localValue
      this.$emit('update:modelValue', value); // Эмитим событие для обновления modelValue
    },
  },
};
</script>

<style scoped lang="scss">
@import './custom-slider.scss';
</style>