<template>
  <div class="tron-network">

    <div class="tron-network__header">
      <div class="tron-network__title">
        Статистика сети TRON
      </div>
    </div>

    <div class="tron-network__body">

      <div class="tron-network__row">

        <div class="tron-network__name">
          <i class="tron-network__icon _1">
            <img src="/images/n-icon1.svg" width="26" height="21" loading="lazy" alt="Icon TRX">
          </i>
          <span>
            Курс TRX:
          </span>
          <p class="tron-network__value d-desk-none">
            0,2439 USDT
          </p>
        </div>

        <p class="tron-network__value d-none d-desk-block">
          0,2439 USDT
        </p>

        <div class="tron-network__info">
          <span>
            24H
          </span>
          <span>
            +0.0001
          </span>
        </div>

      </div>

      <div class="tron-network__row">

        <div class="tron-network__name">
          <i class="tron-network__icon _2">
            <img src="/images/n-icon2.svg" width="25" height="25" loading="lazy" alt="Icon Lightning">
          </i>
          <span>
            Энергии за 1 TRX:
          </span>
          <p class="tron-network__value d-desk-none">
            11,156179707
          </p>
        </div>

        <p class="tron-network__value d-none d-desk-block">
          11,156179707
        </p>

        <div class="tron-network__info">
          <span>
            10m
          </span>
          <span>
            -0,000000707
          </span>
        </div>

      </div>

      <div class="tron-network__row">

        <div class="tron-network__name">
          <i class="tron-network__icon _3">
            <img src="/images/n-icon3.svg" width="25" height="25" loading="lazy" alt="Icon Wallet">
          </i>
          В стейкинге TRX:
          <p class="tron-network__value d-desk-none">
            16 134 555 442
          </p>
        </div>

        <p class="tron-network__value d-none d-desk-block">
          16 134 555 442
        </p>

        <div class="tron-network__info">
          <span>
            10m
          </span>
          <span>
            +0.0001
          </span>
        </div>

      </div>

    </div>

  </div>
</template>

<script>


export default {
  name: 'TronNetwork',
  components: {
  },
  data() {
    return {
   
    };
  },
};
</script>

<style scoped lang="scss">
  @import './TronNetwork.scss';

 

</style>