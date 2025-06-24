<template>
  <div
      :class="customClass"
      class="staking-calculator">

    <div class="staking-calculator__header">
      <div class="staking-calculator__title">
        {{ $t('staking_f_calculator') }}
      </div>
    </div>

    <div class="staking-calculator__body">

      <CurrencyInput v-model="amountCurrency"/>

      <CustomSlider v-model="amountCurrency" :usd="energyPerPeriod.usd" min="1000" max="50000"/>

      <TableStaking :data="energyPerPeriod"/>

      <button class="button button_green w-100 py-8 py-mob-12 br-8" @click="openModal">
        {{ $t('start_staking') }}
      </button>

      <ModalWindow :isVisible="isModalVisible" @close="closeModal">

        <div class="popup">

          <div class="popup__header">
            {{ $t('staking') }}TRX
          </div>

          <TrxCounter v-model="amountCurrency" :max="useUserStore.user.trx_balance"/>

          <!-- class for error check_error -->
          <label class="check">
            <input v-model="agree" class="check__input" type="checkbox">
            <i class="check__square"></i>
            <span class="check__text font-14">
              {{ $t('i_have_read_and_agree_to_the_staking_rules') }}
              <span class="c-green" @click="openModal3">{{ $t('staking_read') }}</span>
              {{ $t('rules') }}
            </span>
          </label>

          <BaseButton class="button button_green py-12 w-100" @on:click="stake">
            {{ $t('start_staking') }}
          </BaseButton>

        </div>

      </ModalWindow>


      <ModalWindow overlayClass="overflow" :isVisible="isModalVisible3" @close="closeModal3">

        <div class="popup-rule">

          <div class="popup-rule__header">
            {{ $t('staking_terms_and_conditions') }}
          </div>

          <div class="popup-rule__body">
            <div>
              <b>
                1.{{ $t('terms_and_conditions.general_provisions.title') }}
              </b>
              <p>
                1.1.{{
                  $t('terms_and_conditions.general_provisions.text1')
                }}
              </p>
              <p>
                1.2.{{
                  $t('terms_and_conditions.general_provisions.text2')
                }}
              </p>
              <p>
                1.3.{{
                  $t('terms_and_conditions.general_provisions.text3')
                }}
              </p>
            </div>
            <div>
              <b>
                1.{{ $t('terms_and_conditions.staking_procedure.title') }}
              </b>
              <p>
                1.1.{{
                  $t('terms_and_conditions.staking_procedure.text1')
                }}
              </p>
              <p>
                1.2.{{
                  $t('terms_and_conditions.staking_procedure.text2')
                }}
              </p>
              <p>
                1.3.{{
                  $t('terms_and_conditions.staking_procedure.text3')
                }}
              </p>
            </div>
          </div>


        </div>

      </ModalWindow>

    </div>

  </div>
</template>

<script>
import CalculatorProfit from '../CalculatorProfit/CalculatorProfit.vue';
import CustomSlider from '../CustomSlider/CustomSlider.vue';
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import TableStaking from '../TableStaking/TableStaking.vue';
import TrxCounter from '../TrxCounter/TrxCounter.vue';
import {createStakingService} from "@/services/index.js";
import {useEnergyGlobal} from "@/store/energyGlobal.js";
import {useTrxGlobal} from "@/store/trxGlobal.js";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import {useUserGlobal} from "@/store/userGlobal.js";
import {useToast} from "vue-toastification";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

export default {
  name: 'StakingCalculator',
  components: {
    BaseButton,
    CurrencyInput,
    CalculatorProfit,
    ModalWindow,
    CustomSlider,
    TableStaking,
    TrxCounter,
  },
  props: {
    customClass: {
      type: String,
      default: ''
    }
  },
  setup() {
    const useEnergyStore = useEnergyGlobal();
    const useUserStore = useUserGlobal();
    const useTrxStore = useTrxGlobal();
    const toast = useToast();
    return {
      toast,
      useEnergyStore,
      useUserStore,
      useTrxStore
    }
  },
  data() {
    return {
      normalCost: 18,
      amountCurrency: 0,
      discountCost: 8,
      savingsPercentage: 52,
      savingsAmount: 312,
      agree: false,
      isModalVisible: false,
      isModalVisible2: false,
      isModalVisible3: false,
      energy: '130 000',
      status: 'Ожидание оплаты',
      staking: {
        user_staked_trx: 0,
        daily_energy_earned: 0,
        total_accrued_energy: 0,
      }
    };
  },
  computed: {
    energyPerPeriod() {

      let trxPrice = 0;
      let energyPerTrx = 0;
      let buybackCost = 0;

      trxPrice = parseFloat(this.useTrxStore.trxGlobal.trx_price);
      energyPerTrx = parseFloat(this.useTrxStore.trxGlobal.energy_per_trx);
      buybackCost = this.useEnergyStore.energyGlobal.buyback_cost;

      const usd = (this.amountCurrency * trxPrice).toFixed(2);
      const dailyEnergy = (this.amountCurrency * energyPerTrx).toFixed(2);

      const weeklyEnergy = dailyEnergy * 7;
      const monthlyEnergy = dailyEnergy * 30;
      const yearlyEnergy = dailyEnergy * 365;

      const weeklyTrx = (weeklyEnergy * buybackCost / 1_000_000).toFixed(2);
      const monthlyTrx = (monthlyEnergy * buybackCost / 1_000_000).toFixed(2);
      const yearlyTrx = (yearlyEnergy * buybackCost / 1_000_000).toFixed(2);


      return {
        energy: {
          weekly: Math.floor(weeklyEnergy),
          yearly: Math.floor(yearlyEnergy),
          monthly: Math.floor(monthlyEnergy)
        },
        trx: {
          weekly: weeklyTrx,
          yearly: yearlyTrx,
          monthly: monthlyTrx
        },
        usd
      }
    }
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
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    stake(e) {
      if (!this.agree) {
        this.toast.error(this.$t('desc5'));
        e.loading.stop()
        return;
      }
      if (this.amountCurrency <= 0) {
        this.toast.error(this.$t('enter_staking_amount'));
        e.loading.stop()
        return;
      }
      e.loading.start()
      createStakingService().stakeAmount(this.amountCurrency)
          .then((response) => {
            this.useUserStore.initUserGlobal();
            this.isModalVisible = false;
          })
          .catch((error) => {
                this.toast.error(error.message || this.$t('an_error_occurred'));
              }
          ).finally(() => {
        e.loading.stop()
      });

    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    openModal3() {
      this.isModalVisible3 = true;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
  }
};
</script>

<style scoped lang="scss">
@import './staking-calculator.scss';

.popup {
  width: 480px;
  padding: 40px;

  &__header {
    margin-bottom: 24px;
    font-size: 22px;
    line-height: 30px;
    font-weight: 600;
  }

}

.popup-rule {
  max-width: 800px;
  padding: 40px;

  &__header {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
  }

  &__body {
    display: grid;
    gap: 20px;

    b {
      display: block;
      margin-bottom: 16px;
    }

    p {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

</style>
