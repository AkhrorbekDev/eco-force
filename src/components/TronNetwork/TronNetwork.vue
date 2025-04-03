<template>
  <div class="tron-network">

    <div class="tron-network__header">
      <div class="tron-network__title">
        {{ $t('Статистика сети TRON') }}
      </div>
    </div>

    <div class="tron-network__body">

      <div class="tron-network__row">

        <div class="tron-network__name">
          <i class="tron-network__icon _1">
            <img src="/images/n-icon1.svg" width="26" height="21" loading="lazy" :alt="$t('Icon TRX')">
          </i>
          <span>
            {{ $t('Курс TRX:') }}
          </span>
          <p class="tron-network__value d-desk-none">
            {{ stats.trx_price }} USDT
          </p>
        </div>

        <p class="tron-network__value d-none d-desk-block">
          {{ stats.trx_price }} USDT
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
            <img src="/images/n-icon2.svg" width="25" height="25" loading="lazy" :alt="$t('Icon Lightning')">
          </i>
          <span>
            {{ $t('Энергии за 1 TRX:') }}
          </span>
          <p class="tron-network__value d-desk-none">
            {{ stats.energy_per_trx }}
          </p>
        </div>

        <p class="tron-network__value d-none d-desk-block">
          {{ stats.energy_per_trx }}
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
            <img src="/images/n-icon3.svg" width="25" height="25" loading="lazy" :alt="$t('Icon Wallet')">
          </i>
          {{ $t('В стейкинге TRX:') }}
          <p class="tron-network__value d-desk-none">
            {{ stats.total_staked_trx }}
          </p>
        </div>

        <p class="tron-network__value d-none d-desk-block">
          {{ stats.total_staked_trx }}

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


import {networkService} from "@/services/index.js";

export default {
  name: 'TronNetwork',
  components: {
  },
  data() {
    return {
      stats: {
        "trx_price": 0,
        "energy_per_trx": 0,
        "total_staked_trx": 0
      }
    };
  },
  mounted() {
    networkService.getTronNetworkStats().then((response) => {
      this.stats = response;
    });
  }
};
</script>

<style scoped lang="scss">
  @import './TronNetwork.scss';



</style>
