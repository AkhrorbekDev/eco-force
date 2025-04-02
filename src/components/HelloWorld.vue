<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ $t('count is') }} {{ count }}</h1>

  <div class="card">
    <button type="button" @click="count++">{{ $t('Edit') }} {{ $t('components/HelloWorld.vue') }} {{ $t('to test HMR') }}</button>
    <p>
      {{ $t('Check out') }}
      <a href="https://github.com/vuejs/create-vue" target="_blank">{{ $t('create-vue') }}</a>,
      {{ $t('the official Vue + Vite starter') }}
    </p>
  </div>

  <p>
    {{ $t('Learn more about IDE Support for Vue in the') }}
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">{{ $t('Vue Docs Scaling up Guide') }}</a>
  </p>
  <p class="read-the-docs">{{ $t('Click on the Vite and Vue logos to learn more') }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
