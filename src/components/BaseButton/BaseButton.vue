<script setup lang="ts">
import {defineProps, ref} from 'vue';

const emit = defineEmits(['on:click']);
const startLoading = () => {

  loading.value.load = true;
}
const stopLoading = () => {
  loading.value.load = false;
}
const loading = ref({
  load: false,
  start: startLoading,
  stop: stopLoading,
})

const onClick = (e) => {
  if (loading.value.load) {
    return
  }

  loading.value.start()

  emit('on:click', {
    loading: loading.value,
    event: e
  })
};
</script>

<template>
  <button class="base-button__btn" @click="onClick">
    <img
        v-if="loading.load"
        width="25"
        height="25"
        src="@/assets/images/spin-circle.svg"
        alt=""
        class="base-button__loader"
    >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    animation: spin 1s infinite ease-in-out;

  }

}

@keyframes spin {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
