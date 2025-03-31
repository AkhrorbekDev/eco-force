<template>
  <div class="my-staking">

    <div class="my-staking__header">
      <div class="my-staking__title">
        Мой стейкинг
      </div>
    </div>

    <div class="my-staking__body">

      <div class="my-staking__row">
        <span class="my-staking__name">
          В стейкиге:
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
          Доходность в день:
        </span>
        <p class="my-staking__value">
          <span>
            ~ {{ staking.daily_energy_earned }}
          </span>
          <img src="/images/lightning.svg" alt="Icon Lightning">
        </p>
      </div>
      <div class="my-staking__row">
        <span class="my-staking__name">
          Заработано всего:
        </span>
        <p class="my-staking__value">
          <span>

            {{ staking.total_accrued_energy }}
          </span>
          <img src="/images/lightning.svg" alt="Icon Lightning">
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
