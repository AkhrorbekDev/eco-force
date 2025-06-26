<template>
  <div class="send-usdt d-grid gap-8">
    <div class="send-usdt__row jc-sb">
      <span>
        {{ $t('where_are_you_sending') }} <b>USDT</b>
      </span>
      <div class="send-usdt__copy" @click="copyToClipboard">
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
    <div class="send-usdt__value mb-8">
      <input v-model="tronAddress" :placeholder="$t('enter_address')">
      <span class="send-usdt__cross cross" @click="clearInput">
        <i class="cross__line"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, {emit}) {
    const { t } = useI18n();
    const tronAddress = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      }
    });
    const showPopup = ref(false);
    const popupMessage = ref('');

    const copyToClipboard = async () => {
      if (tronAddress.value) {
        try {
          await navigator.clipboard.writeText(tronAddress.value);
          showPopupMessage(t('addressCopied'));
        } catch (err) {
          console.error(t('addressCopyError'), err);
          showPopupMessage(t('addressErrorMessage'));
        }
      } else {
        showPopupMessage(t('addressFieldEmpty'));
      }
    };

    const showPopupMessage = (message) => {
      popupMessage.value = message;
      showPopup.value = true;
      setTimeout(() => {
        showPopup.value = false;
      }, 2000);
    };

    const clearInput = () => {
      tronAddress.value = '';
    };

    return {
      tronAddress,
      showPopup,
      popupMessage,
      copyToClipboard,
      clearInput,
    };
  },
};
</script>

<style scoped lang="scss">
@import './send-usdt.scss';

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
