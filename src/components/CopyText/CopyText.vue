<template>
  <div  :class="['copy-text', 'd-grid', 'gap-8', customClass]">
    <div class="copy-text__value">
      <input v-model="text" placeholder="Введите адрес">
      <span class="copy-text__copy" @click="copyToClipboard">
        <img src="/images/icon-copy.svg" width="16" height="16" loading="lazy" alt="Icon Copy">
      </span>
      <div v-if="showPopup" class="popup">
        {{ popupMessage }}
      </div>
    </div>
    <button @click="copyToClipboard" class="button button_green py-12 d-desk-none br-8">
      Скопировать
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    customClass: {
      type: String,
      default: ''
    },
    hasTitle: {
      type: Boolean,
      default: true,
    },
  },
  setup() { // Передаем props в setup
    const text = ref('https://ecoforce.com?invite=12345678');
    const showPopup = ref(false);
    const popupMessage = ref('');

    const copyToClipboard = async () => {
      if (text.value) {
        try {
          await navigator.clipboard.writeText(text.value);
          showPopupMessage('Скопировано!');
        } catch (err) {
          console.error('Ошибка при копировании:', err);
          showPopupMessage('Не удалось скопировать.');
        }
      } else {
        showPopupMessage('Поле ввода пустое.');
      }
    };

    const showPopupMessage = (message) => {
      popupMessage.value = message;
      showPopup.value = true;
      setTimeout(() => {
        showPopup.value = false;
      }, 2000);
    };

    return {
      text,
      showPopup,
      popupMessage,
      copyToClipboard,
    };
  }
};
</script>

<style scoped lang="scss">
@import './CopyText.scss';

.popup {
  position: absolute;
  top: 100%;
  right: 0;
  transform: translateX(-50%);
  z-index: 1;
  width: fit-content;
  color: var(--color1);
  background-color: var(--color3);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  margin-top: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

</style>