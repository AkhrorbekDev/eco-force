<template>
  <div  :class="['copy-text', 'd-grid', 'gap-8', customClass]">
    <div class="copy-text__value">
      <input :value="link" readonly :placeholder="$t('enter_address')">
      <span class="copy-text__copy" @click="copyToClipboard">
        <img src="/images/icon-copy.svg" width="16" height="16" loading="lazy" :alt="$t('Иконка копирования')">
      </span>
      <div v-if="showPopup" class="popup">
        {{ popupMessage }}
      </div>
    </div>
    <button @click="copyToClipboard" class="button button_green py-12 d-desk-none br-8">
      {{ $t('copy') }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    link: {
      type: String,
      default: ''
    },
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
    const { t } = useI18n();
    const text = ref('https://ecoforce.com?invite=12345678');
    const showPopup = ref(false);
    const popupMessage = ref('');

    const copyToClipboard = async () => {
      if (text.value) {
        try {
          await navigator.clipboard.writeText(text.value);
          showPopupMessage(t('copied'));
        } catch (err) {
          showPopupMessage(t('failed_to_copy'));
        }
      } else {
        showPopupMessage(t('Поле ввода пустое'));
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
