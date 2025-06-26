<template>
  <main class="main">

    <div class="page-order">

      <span class="page-order__cross cross">
        <i class="cross__line"></i>
      </span>

      <div class="page-order__title">
        {{ $t('order_№') }}
      </div>

      <div class="page-order__info">
        {{ $t('energy_purchase') }}: {{ energy }}
      </div>

      <img class="page-order__img" src="/images/order.svg" width="162" height="160" loading="lazy" :alt="$t('QR Code Order')">

      <AddressTron2 customClass="_big" />

      <CopyPrice />

      <div class="page-order__status">
        {{ $t('status') }} {{ status }}
      </div>

      <div class="page-order__block">
        <img class="page-order__img-warning" src="/images/warning.png" width="24" height="24" loading="lazy" :alt="$t('Warning')">
        <p>
          {{ $t('transfer_amount_hint') }}
        </p>
      </div>

    </div>

  </main>
</template>

<script>
import AddressTron2 from '@/components/AddressTron2/AddressTron2.vue';
import CopyPrice from '@/components/CopyPrice/CopyPrice.vue';
import {createUserService} from "@/services/index.js";
import publicServices from "@/services/publicServices.js";
export default {
  name: 'OrderPage',
  components: {
    AddressTron2,
    CopyPrice,
  },
  data() {
    return {
      energy: '130 000',
      status: 'Оплачено',
    }
  },
  mounted() {
    if (this.$route.query.order_id) {
      publicServices.order.getOrderInfo(this.$route.query.order_id)
        .then((response) => {
          this.energy = response.data.energy;
          this.status = response.data.status;
        })
        .catch((error) => {
          console.error('Error fetching order info:', error);
        });
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars';
  .page-order {
    position: relative;
    max-width: 1140px;
    margin: 68px auto 158px;
    padding: 40px;
    background: var(--color4);
    box-shadow: 0px 0px 16px 0px rgba(0, 10, 0, 0.0784313725);
    border-radius: 16px;

    &__cross {
      position: absolute;
      top: 14px;
      right: 14px;
    }

    &__title {
      margin-bottom: 12px;
      font-size: 22px;
      line-height: 30px;
      font-weight: 600;
    }

    &__info {
      display: flex;
      gap: 20px;
      margin-bottom: 12px;
    }

    &__img {
      display: block;
      margin: 0 auto 24px;
    }

    &__status {
      margin-bottom: 16px;
      color: var(--color5);
    }

    &__block {
      display: flex;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--color1);
      border-radius: 12px;
    }

    &__address {
      display: block;
      input {
        height: 52px;
      }
    }

    @media (max-width: $mobile) {
      margin: 0 16px 34px;
      padding: 16px;
    }

  }
</style>
