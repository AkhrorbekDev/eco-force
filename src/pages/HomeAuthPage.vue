<template>
  <main class="main">

    <section class="section-panels">

      <div class="container">
        <div class="section-panels__row">
          <PanelBalance :pricing="energyPricing" :balance="{amount: userStats.balance_trx}"/>
          <PanelStaking :pricing="energyPricing" :balance="{amount: userStats.balance_trx}" />
          <PanelEnergy :pricing="energyPricing" :balance="{amount: userStats.balance_energy}" @on:success="successEnergy" />
        </div>
      </div>

    </section>

    <section class="section-calc section">
      <div class="container">

          <h1 class="section-calc__title">
            {{ $t('home_heading') }}
          </h1>

          <div class="section-calc__row">
            <BuyEnergy2 :user="userStats" :pricing="energyPricing" />
            <StakingCalculator customClass="d-none d-desk-block" />
          </div>

      </div>
    </section>

    <section class="section-history">
      <div class="container">
        <h2 class="section-history__title">
          {{ $t('operations_history') }}
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
  import {createEnergyService, createUserService} from "@/services/index.js";

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
    },
    data () {
      return {
        userStats: {
          tron_address: "",
          balance_trx: 0,
          balance_energy: 0,
          referral_code: '0',
          registration_date: '',
        },
        energyPricing: {
          "cost_per_hour": 0,
          "cost_per_day": 0,
          "cost_per_week": 0,
          "buyback_cost": 0,
          "tron_cost_per_hour": 0,
          "tron_cost_per_day": 0,
          "tron_cost_per_week": 0
        }
      }
    },
    mounted() {
      this.getUserDetails()
      this.getEnergyPricing()
    },
    methods: {
      getEnergyPricing() {
        createEnergyService().getEnergyPricing().then((response) => {
          this.energyPricing = response
        });
      },
      getUserDetails() {
        createUserService().getUserDetails().then((response) => {
          this.userStats = response
        });
      },
      successEnergy(response) {
        this.getUserDetails()
      },
      successStaking(response) {
        this.getUserDetails()
      },
      successTRX(response) {
        this.getUserDetails()
      }
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
