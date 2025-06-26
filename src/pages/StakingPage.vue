<template>
  <main class="main">

    <section v-if="loggedIn" class="section-panels">

      <div class="container">
        <div class="section-panels__row">
          <PanelBalance :pricing="energyPricing" :balance="{amount: userStats.balance_trx}"/>
          <PanelStaking :pricing="energyPricing" :balance="{
            totalTrxStaked: staking.user_staked_trx,
            tron_address: userStats.tron_address,
            amount: userStats.balance_trx
          }"/>
          <PanelEnergy :pricing="energyPricing" :balance="{
            amount: userStats.balance_energy,
            perDayEarned: staking.daily_energy_earned,
            }" @on:success="successEnergy"/>
        </div>
      </div>

    </section>

    <section class="section-staking">
      <div class="container">
        <h1 class="section-staking__title">
          {{ $t('staking') }}
        </h1>

        <div class="section-staking__row">
          <MyStaking :balance="userStats"/>
          <TronNetwork/>
        </div>

        <div class="section-staking__items">
          <PercentStaking/>
          <StakingCalculator/>
        </div>

      </div>
    </section>

    <section v-if="loggedIn" class="section-history">
      <div class="container">
        <h2 class="section-history__title">
          {{ $t('operations_history') }}
        </h2>

        <TableStakingActions/>

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
import PercentStaking from '@/components/PercentStaking/PercentStaking.vue'
import TableStakingActions from "@/components/TableStakingActions/TableStakingActions.vue";
import {createEnergyService, createStakingService, createUserService} from "@/services/index.js";
import {useUserGlobal} from "@/store/userGlobal.js";

export default {
  name: 'StakingPage',
  components: {
    PanelBalance,
    PanelStaking,
    PanelEnergy,
    TableStakingActions,
    TableOperation,
    StakingCalculator,
    MyStaking,
    TronNetwork,
    PercentStaking,
  },
  setup() {
    const userStore = useUserGlobal()
    return {
      userStore
    }
  },
  computed: {
    loggedIn() {
      return this.userStore.loggedIn;
    },
  },
  data() {
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
      },
      staking: {
        user_staked_trx: 0,
        daily_energy_earned: 0,
        total_accrued_energy: 0,
      }
    }
  },
  mounted() {
    this.getUserDetails()
    this.getEnergyPricing()
    this.getStaking()
  },
  methods: {
    getStaking() {
      createStakingService().getStakingSummary()
          .then((response) => {
            this.staking = response;
          })
          .catch((error) => {
            console.log(error)
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
