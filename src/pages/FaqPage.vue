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

    <section class="section-faq">
      <div class="container">

          <h1 class="section-faq__title">
            FAQ
          </h1>

          <AccordionMain />

      </div>
    </section>

  </main>
</template>

<script>
import AccordionMain from '@/components/AccordionMain/AccordionMain.vue';
import PanelBalance from '@/components/PanelBalance/PanelBalance.vue';
import PanelEnergy from '@/components/PanelEnergy/PanelEnergy.vue';
import PanelStaking from '@/components/PanelStaking/PanelStaking.vue';

export default {
  name: 'FaqPage',
  components: {
      PanelBalance,
      PanelStaking,
      PanelEnergy,
      AccordionMain,
    }
}
</script>

<style scoped lang="scss">
  @import '../assets/styles/vars';

  .main {
    padding-top: 22px;
    padding-bottom: 280px;
    @media (max-width: $mobile) {
      padding-bottom: 0;
    }
  }

  .section-faq {
    padding-top: 22px;
    &__title {
      margin-bottom: 24px;
    }
  }



</style>