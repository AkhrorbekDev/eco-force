<template>
  <main class="main">

    <section class="section-calc section">
      <div class="container">

          <h1 class="section-calc__title">
            Отправляйте USDT в сети Tron в 2 раза дешевле!
          </h1>

          <div class="section-calc__row">
            <BuyEnergy />
            <StakingCalculator customClass="d-none d-desk-block"/>
          </div>

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
  import BuyEnergy from '@/components/BuyEnergy/BuyEnergy.vue';
  import ForWho from '@/components/ForWho/ForWho.vue';
  import PassiveIncome from '@/components/PassiveIncome/PassiveIncome.vue';
  import StakingCalculator from '@/components/StakingCalculator/StakingCalculator.vue';
  import VideoEco from '@/components/VideoEco/VideoEco.vue';

  export default {
    name: 'HomePage',
    components: {
      BuyEnergy,
      StakingCalculator,
      PassiveIncome,
      VideoEco,
      ForWho,
    }
  }
</script>

<style scoped lang="scss">
@import '../assets/styles/vars';

  .main {
    padding: 44px 0;
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
</style>
