<template>

    <div class="block">

      <div class="block__info">
        <div class="block__title">
          Рефералов
        </div>
        <span class="block__number">
          {{ quantity || 0 }}
        </span>
      </div>

      <div class="block__icon">
        <img src="/images/users.svg" width="32" height="32" loading="lazy" alt="Icon Users">
      </div>

    </div>

</template>



<script setup>
defineProps({
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>

<style scoped lang="scss">

.section {
  padding: 22px 0 0;
}
.h2 {
  margin-bottom: 40px;
}

.block  {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  padding: 24px;
  background: var(--color4);
  border-radius: 16px;
  box-shadow: 0px 4px 12px 0px #0000000F;

  &__info {
    display: grid;
    gap: 12px;
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
