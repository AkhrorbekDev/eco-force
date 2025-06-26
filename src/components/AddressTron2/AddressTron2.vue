<template>
  <div  :class="['address-tron', 'd-grid', 'gap-8', customClass]">
    <div class="address-tron__row" v-if="hasTitle">
      <span>{{ $t('address') }} <b>TRX</b></span>
    </div>
    <div class="address-tron__value">
      <input v-model="tronAddress" :readonly="readOnly" :placeholder="$t('enter_address')" />
      <span class="address-tron__copy" @click="copyToClipboard">
        <img src="/images/document-copy.svg" width="20" height="20" loading="lazy" :alt="$t('Иконка документа')">
      </span>
      <div v-if="showPopup" class="popup">
        {{ popupMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue';
import {useI18n} from "vue-i18n";
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
    modelValue: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) { // Передаем props в setup
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

    return {
      tronAddress,
      showPopup,
      popupMessage,
      copyToClipboard,
    };
  }
};
</script>

<style scoped lang="scss">
@import './AddressTron2.scss';

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
