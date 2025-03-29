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

    <section class="section-calc section">
      <div class="container">

          <h1 class="section-calc__title">
            Отправляйте USDT в сети Tron в 2 раза дешевле!
          </h1>

          <div class="section-calc__row">
            <BuyEnergy2 />
            <StakingCalculator customClass="d-none d-desk-block" />
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

    <PassiveIncome />

    <div class="container">
      <StakingCalculator customClass="d-desk-none"/>
    </div>

    <VideoEco />

    <ForWho />

  </main>
</template>

<script>
  import BuyEnergy2 from '@/components/BuyEnergy2/BuyEnergy2.vue';
  import ForWho from '@/components/ForWho/ForWho.vue';
  import PanelBalance from '@/components/PanelBalance/PanelBalance.vue';
  import PanelEnergy from '@/components/PanelEnergy/PanelEnergy.vue';
  import PanelStaking from '@/components/PanelStaking/PanelStaking.vue';
  import PassiveIncome from '@/components/PassiveIncome/PassiveIncome.vue';
  import StakingCalculator from '@/components/StakingCalculator/StakingCalculator.vue';
  import TableOperation from '@/components/TableOperation/TableOperation.vue';
  import VideoEco from '@/components/VideoEco/VideoEco.vue';

  export default {
    name: 'HomeAuthPage',
    components: {
      BuyEnergy2,
      StakingCalculator,
      PassiveIncome,
      VideoEco,
      ForWho,
      PanelBalance,
      PanelStaking,
      PanelEnergy,
      TableOperation
    }
  }
</script>

<style scoped lang="scss">
@import '../assets/styles/vars';
  .main {
    padding: 20px 0;
    @media (max-width: $mobile) {
      padding: 14px 0 28px;
    }
  }

  .section-calc {
    &__title {
      margin-bottom: 44px;
    }
    &__row {
      display: flex;
      gap: 20px;
    }
    @media (max-width: $mobile) {
      &__title {
        margin-bottom: 16px;
      }
    }
    @media (max-width: $tablet) {
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
    @media (max-width: $mobile) {
      &__title {
        margin-bottom: 16px;
      }
    }
  }

</style>