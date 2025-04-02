<template>

  <div class="block">

    <div class="block__head">
      <div class="block__title">
        {{ $t('Промокод для бесплатной энергии') }}
      </div>
    </div>

    <CopyPromoCode v-model:code="promocode"/>

  </div>

</template>


<script>
import CopyPromoCode from '../CopyPromoCode/CopyPromoCode.vue';

export default {
  components: {
    CopyPromoCode
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  computed: {
    promocode: {
      get () {
        return this.$props.code;
      },
      set (value) {
        this.$emit('update:code', value);
      }
    }
  }
};
</script>

<style scoped lang="scss">

.block {
  gap: 32px;
  padding: 24px 24px 12px;
  background: var(--color4);
  border-radius: 16px;
  box-shadow: 0px 4px 12px 0px #0000000F;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }

  &__number {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: var(--color2);
  }

}

</style>
