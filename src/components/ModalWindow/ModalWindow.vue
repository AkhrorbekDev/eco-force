<template>
  <Teleport to="#app">
    <div v-if="isVisible" :class="['modal-overlay', overlayClass]" @click="close">
      <div v-if="!disableContent" :class="['modal-content', contentClass]" @click.stop>
        <span class="modal-content__cross cross" @click="close">
          <i class="cross__line"></i>
        </span>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  emits: ['close'], // Объявляем событие close
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    disableContent: {
      type: Boolean,
      default: false // По умолчанию контент включен
    },
    overlayClass: {
      type: [String, Array, Object], // Позволяет передавать строку, массив или объект
      default: '' // По умолчанию пустой
    },
    contentClass: {
      type: [String, Array, Object], // Позволяет передавать строку, массив или объект
      default: '' // По умолчанию пустой
    }
  },
  methods: {
    close() {
      this.$emit('close'); // Генерируем событие close
    }
  }
};
</script>

<style scoped lang="scss">
@import './modal-window.scss';
</style>