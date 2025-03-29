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
            2000
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
            ~ 11 203
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
            150 000
          </span>
          <img src="/images/lightning.svg" alt="Icon Lightning">
        </p>
      </div>

    </div>

  </div>

</template>

<script>


export default {
  name: 'MyStaking',
  components: {
  },
  data() {
    return {
   
    };
  },
};
</script>

<style scoped lang="scss">
  @import './MyStaking.scss';

 

</style>