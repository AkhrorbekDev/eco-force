<template>
  <div class="preloader-copy d-grid gap-8">
    <div class="preloader-copy__row jc-sb">
      <span>
        {{ $t('Прелоадер') }}
      </span>
      <div class="preloader-copy__copy" @click="copyToClipboard">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.16683 14.1668L10.8335 12.5002L9.16683 10.8335L10.8335 12.5002H5.8335" stroke="#909096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3332 8.33317V12.4998C18.3332 16.6665 16.6665 18.3332 12.4998 18.3332H7.49984C3.33317 18.3332 1.6665 16.6665 1.6665 12.4998V7.49984C1.6665 3.33317 3.33317 1.6665 7.49984 1.6665H11.6665" stroke="#909096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3332 8.33317H14.9998C12.4998 8.33317 11.6665 7.49984 11.6665 4.99984V1.6665L18.3332 8.33317Z" stroke="#909096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- Добавлен попап -->
        <div v-if="showPopup" class="popup-min">
          {{ popupMessage }}
        </div>
      </div>
    </div>
    <div class="preloader-copy__value mb-8">
      <input v-model="field">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const field = ref('');
    const showPopup = ref(false);
    const popupMessage = ref('');
    const { t } = useI18n();

    const copyToClipboard = async () => {
      if (field.value) {
        try {
          await navigator.clipboard.writeText(field.value);
          showPopupMessage(t('copied'));
        } catch (err) {
          showPopupMessage(t('failed_to_copy'));
        }
      } else {
        showPopupMessage(t('Поле ввода пустое.'));
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
      field,
      showPopup,
      popupMessage,
      copyToClipboard,
    };
  },
};
</script>

<style scoped lang="scss">
@import './preloader-copy.scss';

.popup-min {
  position: absolute;
  top: 180%;
  left: 50%;
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
