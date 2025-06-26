<template>
  <div class="percent-staking">

    <div class="percent-staking__title">
      {{ $t('desc17') }}
    </div>

    <p class="percent-staking__text">
      {{ $t('desc18') }}
    </p>

    <img class="percent-staking__img" src="/images/hand-with-monets.svg" loading="lazy" width="295" height="248" :alt="$t('Hand with monets')">

  </div>

</template>

<script>


export default {
  name: 'PercentStaking',
  components: {
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped lang="scss">
  @import './PercentStaking.scss';



</style>
