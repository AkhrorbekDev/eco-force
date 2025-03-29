<template>

  <section class="section">
    <div class="container">
      <h2 class="h2">
        Для кого может быть полезен этот сервис
      </h2>

      <div class="items">
        <div v-for="(item, index) in items" :key="index" class="item">
          <img :src="item.imageUrl" :alt="item.altText" class="item__image" width="94" height="94" loading="lazy" />
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
          altText: 'Users',
          title: 'Пользователи сети Tron',
          text: 'Если вы регулярно отправляете USDT или другие токены в сети Tron, сервис поможет значительно снизить расходы на комиссии, делая транзакции более выгодными.',
        },
        {
          imageUrl: '/images/line_icon2.svg',
          altText: 'Shedule',
          title: 'Инвесторы с минимальным капиталом',
          text: 'Даже небольшие вложения в стейкинг позволят ежедневно накапливать энергию. Вы сможете использовать её для экономии на транзакциях или получать доход, продавая её обратно.',
        },
        {
          imageUrl: '/images/line_icon3.svg',
          altText: 'Crypto processing',
          title: 'Крипто-процессинговые сервисы (через API)',
          text: 'Для сервисов, обрабатывающих большой объём транзакций в сети Tron, использование энергии через наш сервис позволит снизить затраты на комиссии.',
        },
        {
          imageUrl: '/images/line_icon4.svg',
          altText: 'Exchange',
          title: 'Обменные пункты криптовалют (через API)',
          text: 'Онлайн-обменники могут арендовать энергию для оптимизации издержек.',
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
.items  {
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
  .items  {
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