<template>
  <div class="address-tron d-grid gap-8">
    <div class="address-tron__row">
      <span>{{ $t('address') }} <b>TRON</b></span>
      <div class="address-tron__copy" @click="copyToClipboard">
        <img class="d-none d-desk-block" src="/images/document-copy2.svg" loading="lazy" width="21" height="22" >
        <img class="d-desk-none" src="/images/document-forward.svg" loading="lazy" width="20" height="20">
        <!-- Добавлен попап -->
        <div v-if="showPopup" class="popup">
          {{ popupMessage }}
        </div>
      </div>
    </div>
    <div class="address-tron__value">
      <input v-model="tronAddress" :placeholder="$t('enter_address')">
      <span class="address-tron__cross cross" @click="clearInput">
        <i class="cross__line"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue';
import {useI18n} from "vue-i18n";
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
@import './AddressTron.scss';

.popup {
  position: absolute;
  top: 180%;
  right: 0;
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
