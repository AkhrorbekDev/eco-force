<template>
  <div class="my-staking">

    <div class="my-staking__header">
      <div class="my-staking__title">
        {{ $t('desc13') }}
      </div>
    </div>

    <div class="my-staking__body">

      <div class="my-staking__row">
        <span class="my-staking__name">
          {{ $t('desc14') }}
        </span>
        <p class="my-staking__value">
          <span>
            {{ staking.user_staked_trx }}
          </span>
          <b>
            TRX
          </b>
        </p>
      </div>
      <div class="my-staking__row">
        <span class="my-staking__name">
          {{ $t('desc15') }}
        </span>
        <p class="my-staking__value">
          <span>
            ~ {{ staking.daily_energy_earned }}
          </span>
          <img src="/images/lightning.svg" >
        </p>
      </div>
      <div class="my-staking__row">
        <span class="my-staking__name">
          {{ $t('desc16') }}
        </span>
        <p class="my-staking__value">
          <span>
            {{ staking.total_accrued_energy }}
          </span>
          <img src="/images/lightning.svg" >
        </p>
      </div>

    </div>

  </div>

</template>

<script>


import {createStakingService} from "@/services/index.js";

export default {
  name: 'MyStaking',
  components: {
  },
  data() {
    return {
      staking: {
        user_staked_trx: 0,
        daily_energy_earned: 0,
        total_accrued_energy: 0,
      }
    };
  },
  mounted() {
    this.getStaking();
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
  },
};
</script>

<style scoped lang="scss">
  @import './MyStaking.scss';



</style>
