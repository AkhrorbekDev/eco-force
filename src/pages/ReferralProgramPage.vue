<template>
  <main class="main">

    <section class="section-panels">

      <div class="container">
        <div class="section-panels__row">
          <PanelBalance :pricing="energyPricing" :balance="{amount: userStats.balance_trx}"/>
          <PanelStaking :pricing="energyPricing" :balance="{
            totalTrxStaked: staking.user_staked_trx,
            amount: userStats.balance_trx
          }"/>
          <PanelEnergy :pricing="energyPricing" :balance="{
            amount: userStats.balance_energy,
            perDayEarned: staking.daily_energy_earned,
            }" @on:success="successEnergy"/>
        </div>
      </div>

    </section>

    <section class="section-intro">
      <div class="container">
        <h1 class="section-intro__title">
          Реферальная программа
        </h1>

        <div class="section-intro__row">
          <ProfitBlock/>
          <div class="section-intro__col">
            <ReferralQuantity :quantity="referralsStats.used_count"/>
            <ReferralLink :link="referralsStats.referral_url"/>
            <PromoCode :code="referralsStats.promo_code" />
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
import {createEnergyService, createUserService} from "@/services/index.js";

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
  },
  data() {
    return {
      referralsStats: {

        promo_code:
            "",
        referral_count:
            0,
        referral_url:
            "https://ecoforce.com/",
        usage_limit:
            0,
        used_count:
            0
      },
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
      },
      staking: {
        user_staked_trx: 0,
        daily_energy_earned: 0,
        total_accrued_energy: 0,
      }
    }
  },
  mounted() {
    this.getReferralStats()
    this.getUserDetails()
    this.getEnergyPricing()
  },
  methods: {
    getReferralStats() {
      createUserService().getReferralStats().then((response) => {
        this.referralsStats = response
      });
    },
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
