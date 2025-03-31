<template>
  <div class="copy-price">
    <span class="copy-price__cost">
      Стоимость
      <b>
        {{ cost }}
      </b>
    </span>
    <div @click="copyToClipboard" class="copy-price__button">Скопировать</div>
    <div v-if="showPopup" class="popup-min">
      {{ popupMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    cost: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const showPopup = ref(false);
    const popupMessage = ref('');

    const copyToClipboard = async () => {
      if (props.cost) {
        try {
          await navigator.clipboard.writeText(props.cost);
          showPopupMessage('Скопировано!');
        } catch (err) {
          console.error('Ошибка при копировании:', err);
          showPopupMessage('Не удалось скопировать.');
        }
      } else {
        showPopupMessage('Поле пустое.');
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
      showPopup,
      popupMessage,
      copyToClipboard,
    };
  },
};
</script>

<style scoped lang="scss">
@import './copy-price.scss';
.popup-min {
  position: absolute;
  top: 80%;
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
