<template>

  <section class="section">
    <div class="container">
      <h2 class="h2">
        {{ $t('who_can_benefit_from_this_service') }}
      </h2>

      <div class="items">
        <div v-for="(item, index) in items" :key="index" class="item">
          <img :src="item.imageUrl" :alt="item.altText" class="item__image" width="94" height="94" loading="lazy"/>
          <div class="item__title">
            {{ item.title }}
          </div>
          <div class="item__text">
            {{ item.text }}
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
          imageUrl: '/images/line_icon1.svg',
          altText: this.$t('users'),
          title: this.$t('tron_network_users'),
          text: this.$t('desc1'),
        },
        {
          imageUrl: '/images/line_icon2.svg',
          altText: this.$t('schedule'),
          title: this.$t('investors_with_minimal_capital'),
          text: this.$t('desc2'),
        },
        {
          imageUrl: '/images/line_icon3.svg',
          altText: this.$t('Crypto processing'),
          title: this.$t('crypto_processing_services_(via_api)'),
          text: this.$t('desc3'),
        },
        {
          imageUrl: '/images/line_icon4.svg',
          altText: this.$t('Exchange'),
          title: this.$t('cryptocurrency_exchange_points_(via_api)'),
          text: this.$t('online_exchangers_can_rent_energy_to_optimize_costs'),
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

.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.item {
  padding: 32px 40px 40px;
  background: var(--color4);
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px #000A0014;

  &__image {
    margin-bottom: 8px;
  }

  &__title {
    margin-bottom: 8px;
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
  }

  &__text {
    font-size: 18px;
    line-height: 26px;
  }

}

@media (max-width: $mobile) {
  .section {
    padding: 24px 0;
  }
  .items {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .item {
    padding: 12px;

    &__image {
      width: 78px;
      height: 78px;
    }

    &__title {
      font-size: 18px;
      line-height: 26px;
    }

    &__text {
      font-size: 16px;
      line-height: 24px;
    }
  }
}

</style>
