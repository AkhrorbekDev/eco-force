<template>
  <main class="main">
    <section v-if="userStore.loggedIn" class="section-panels">

      <div class="container">
        <div class="section-panels__row">
          <PanelBalance :is-open="active === 'balance'" @on:click="toggleTransition('balance')"
                        ref="panelBalance"/>
          <PanelStaking :is-open="active === 'staking'" @on:click="toggleTransition('staking')"/>
          <PanelEnergy :is-open="active === 'energy'" @on:click="toggleTransition('energy')"
                       @on:success="successEnergy"/>
        </div>
      </div>

    </section>
    <section class="section-calc section">
      <div class="container">

        <h1 class="section-calc__title">
          {{ $t('send_usdt_on_the_tron_network_for_2_times_cheaper') }}
        </h1>

        <div class="section-calc__row">
          <BuyEnergy2 :user="userStats" :pricing="energyPricing" @show-add-balance-modal="showBalanceAddModal"/>
          <StakingCalculator customClass="d-none d-desk-block"/>
        </div>

      </div>
    </section>

    <section v-if="userStore.loggedIn" class="section-history">
      <div class="container">
        <h2 class="section-history__title">
          {{ $t('history') }}
        </h2>

        <TableOperation/>

      </div>
    </section>

    <PassiveIncome/>

    <div class="container">
      <StakingCalculator customClass="d-desk-none"/>
    </div>

    <VideoEco/>

    <ForWho/>

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
import {useUserGlobal} from "@/store/userGlobal.js";

export default {
  name: 'HomePage',
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
  setup() {
    const userStore = useUserGlobal()
    return {
      userStore
    }
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
      active: ''
    }
  },
  methods: {
    toggleTransition(e) {
      console.log('Toggle transition for:', e);
      if (this.active === e) {
        this.active = ''
      } else {
        this.active = e
      }
    },
    successEnergy(response) {
      this.getUserDetails()
    },
    showBalanceAddModal() {
      this.$refs.panelBalance.isModalVisible = true
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
