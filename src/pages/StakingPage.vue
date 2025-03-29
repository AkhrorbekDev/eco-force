<template>
  <main class="main">

    <section class="section-panels">

      <div class="container">
        <div class="section-panels__row">
          <PanelBalance />
          <PanelStaking />
          <PanelEnergy />
        </div>
      </div>

    </section>

    <section class="section-staking">
      <div class="container">
        <h1 class="section-staking__title">
          Стейкинг
        </h1>

        <div class="section-staking__row">
          <MyStaking />
          <TronNetwork />
        </div>

        <div class="section-staking__items">
          <PercentStaking />
          <StakingCalculator />
        </div>

      </div>
    </section>

    <section class="section-history">
      <div class="container">
        <h2 class="section-history__title">
          История операций
        </h2>

        <TableOperation />

      </div>
    </section>

  </main>
</template>

<script>
  import MyStaking from '@/components/MyStaking/MyStaking.vue';
  import PanelBalance from '@/components/PanelBalance/PanelBalance.vue';
  import PanelEnergy from '@/components/PanelEnergy/PanelEnergy.vue';
  import PanelStaking from '@/components/PanelStaking/PanelStaking.vue';
  import StakingCalculator from '@/components/StakingCalculator/StakingCalculator.vue';
  import TableOperation from '@/components/TableOperation/TableOperation.vue';
  import TronNetwork from '@/components/TronNetwork/TronNetwork.vue';
  import PercentStaking from '@/components/PercentStaking/PercentStaking,.vue'

  export default {
    name: 'StakingPage',
    components: {
      PanelBalance,
      PanelStaking,
      PanelEnergy,
      TableOperation,
      StakingCalculator,
      MyStaking,
      TronNetwork,
      PercentStaking,
    }
  }
</script>

<style scoped lang="scss">
@import '../assets/styles/vars';

  .section-staking {
    padding-top: 22px;
    &__title {
      margin-bottom: 44px;
    }
    &__row {
      display: flex;
      gap: 20px;
      margin-bottom: 34px;
    }
    &__items {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
    }
    @media (max-width: $mobile) {
      &__title {
        display: none;
      }
      &__row {
        flex-wrap: wrap;
      }
    }
  }

  .section-history {
    padding: 58px 0;
    &__title {
      margin-bottom: 32px;
    }
  }

</style>