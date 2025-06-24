<template>

  <section class="section">
    <div class="container">
      <h2 class="h2">
        {{ $t('desc9') }}
      </h2>

      <div class="items">
        <div v-for="(item, index) in items" :key="index" class="item">
          <img :src="item.imageUrl" :alt="$t(item.altText)" class="image" width="88" height="88" loading="lazy"/>
          <div class="item__text">
            {{ $t(item.text) }}
          </div>
        </div>
      </div>

    </div>
  </section>

</template>


<script>
export default {
  data() {
    return {
      items: [
        {
          imageUrl: '/images/icon-1.svg',
          altText: 'Lightning',
          text: 'desc6'
        },
        {
          imageUrl: '/images/icon-2.svg',
          altText: 'Safe',
          text: 'desc7'
        },
        {
          imageUrl: '/images/icon-3.svg',
          altText: 'Money',
          text: 'desc8'
        },
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/vars';

.section {
  padding: 22px 0;
}

.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  background: var(--color4);
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px #000A0014;

  &__text {
    font-size: 18px;
    line-height: 26px;
  }
}

@media (max-width: $tabletMin) {
  .items {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .item {
    padding: 12px;

    &__text {
      font-size: 16px;
      line-height: 22px;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }
}

</style>
