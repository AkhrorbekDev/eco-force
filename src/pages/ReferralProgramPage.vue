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

    <section class="section-intro">
      <div class="container">
        <h1 class="section-intro__title">
          Реферальная программа
        </h1>

        <div class="section-intro__row">
          <ProfitBlock />
          <div class="section-intro__col">
            <ReferralQuantity />
            <ReferralLink />
            <PromoCode />
          </div>
        </div>
      </div>
    </section>

    <section class="section-history">
      <div class="container">
        <h2 class="section-history__title">
          Мои партнеры
        </h2>

        <TableOperation2 />

      </div>
    </section>

  </main>
</template>

<script>
import PanelBalance from '@/components/PanelBalance/PanelBalance.vue';
import PanelEnergy from '@/components/PanelEnergy/PanelEnergy.vue';
import PanelStaking from '@/components/PanelStaking/PanelStaking.vue';
import TableOperation2 from '@/components/TableOperation2/TableOperation2.vue';
import ProfitBlock from '@/components/ProfitBlock/ProfitBlock.vue';
import ReferralQuantity from '@/components/ReferralQuantity/ReferralQuantity.vue';
import ReferralLink from '@/components/ReferralLink/ReferralLink.vue';
import PromoCode from '@/components/PromoCode/PromoCode.vue';

export default {
  name: 'ReferralProgramPage',
  components: {
      PanelBalance,
      PanelStaking,
      PanelEnergy,
      TableOperation2,
      ProfitBlock,
      ReferralQuantity,
      ReferralLink,
      PromoCode
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars';

  .main {
    padding-top: 22px;
  }

  .section-intro {
    padding-top: 22px;
    &__title {
      margin-bottom: 22px;
    }
    &__row {
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 26px;
      align-items: flex-start;
    }
    &__col {
      display: grid;
      gap: 12px;
    }
    @media (max-width: $tablet) {
      &__row {
        display: flex;
        flex-direction: column-reverse;
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