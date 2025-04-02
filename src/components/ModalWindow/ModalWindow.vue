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
  emits: ['close'],
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    disableContent: {
      type: Boolean,
      default: false
    },
    overlayClass: {
      type: [String, Array, Object],
      default: ''
    },
    contentClass: {
      type: [String, Array, Object],
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
@import './modal-window.scss';
</style>