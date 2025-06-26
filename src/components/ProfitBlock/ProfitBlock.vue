<template>

  <div class="items">
    <div v-for="(item, index) in items" :key="index" class="item">
        <span class="item__icon">
          <img :src="item.imageUrl" :alt="$t(item.altText)" class="item__image" width="22" height="22" loading="lazy"/>
        </span>
      <div class="item__title">
        {{ $t(item.title) }}
      </div>
      <p v-html="item.text"></p>
    </div>
  </div>

</template>


<script>
export default {
  data() {
    return {
      items: [
        {
          imageUrl: '/images/r-icon1.svg',
          altText: 'Icon Dollar',
          title: 'desc19',
          text: 'desc20',
        },
        {
          imageUrl: '/images/r-icon2.svg',
          altText: 'Icon Energy',
          title: 'desc21',
          text: 'desc22',
        },
        {
          imageUrl: '/images/r-icon3.svg',
          altText: 'Icon Energy',
          title: 'desc23',
          text: 'desc24',
        },
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/vars';

.section {
  padding: 22px 0 0;
}

.h2 {
  margin-bottom: 40px;
}

.items {
  display: grid;
  gap: 40px;
  padding: 40px;
  background: var(--color4);
  border-radius: 16px;
  box-shadow: 0px 4px 12px 0px #0000000F;
  @media (max-width: $mobile) {
    padding: 10px;
  }
}

.item {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 4px 20px;

  &__icon {
    grid-column: 1;
    grid-row: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: #1AC2001F;
  }

  &__title {
    font-weight: 600;
    color: #1C1C1C;
  }

  &__text {
    color: #1C1C1C;
  }

}

</style>
