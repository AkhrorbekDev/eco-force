<template>

    <div class="block">

      <div class="block__head">
        <div class="block__title">
          {{ $t('desc25') }}
        </div>
        <span class="d-none d-desk-block c-green font-14 weight-500">
          {{ $t('desc26') }}
        </span>
      </div>

      <CopyText :link="link" />

    </div>

</template>



<script>
import CopyText from '../CopyText/CopyText.vue';

export default {
  components: {
    CopyText
  },
  props: {
    link: {
      type: String,
      required: true,
      default: 'https://example.com'
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/vars';

.block  {
  gap: 32px;
  padding: 24px 24px 12px;
  background: var(--color4);
  border-radius: 16px;
  box-shadow: 0px 4px 12px 0px #0000000F;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
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

  @media (max-width: $mobile) {
    &__head {
      margin-bottom: 12px;
    }
  }

}

</style>
