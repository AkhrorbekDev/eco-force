<template>
  <div
      :class="customClass"
      class="staking-calculator">

    <div class="staking-calculator__header">
      <h3>{{ $t('Калькулятор стейкинга') }}</h3>
      <p>{{ $t('Рассчитайте доходность от стейкинга TRX') }}</p>
    </div>

    <div class="staking-calculator__body">

      <div class="staking-calculator__input">
        <CurrencyInput
          v-model="amount"
          :max="maxAmount"
          :placeholder="$t('Введите сумму')"
          :currency="$t('TRX')"
        />
      </div>

      <div class="staking-calculator__slider">
        <CustomSlider
          v-model="amount"
          :max="maxAmount"
          :step="1000"
        />
      </div>

      <div class="staking-calculator__table">
        <div class="staking-calculator__table-header">
          <span>{{ $t('Период') }}</span>
          <span>{{ $t('Доходность') }}</span>
        </div>
        <div class="staking-calculator__table-row">
          <span>{{ $t('1 месяц') }}</span>
          <span>{{ monthlyIncome }} {{ $t('TRX') }}</span>
        </div>
        <div class="staking-calculator__table-row">
          <span>{{ $t('3 месяца') }}</span>
          <span>{{ quarterlyIncome }} {{ $t('TRX') }}</span>
        </div>
        <div class="staking-calculator__table-row">
          <span>{{ $t('6 месяцев') }}</span>
          <span>{{ halfYearlyIncome }} {{ $t('TRX') }}</span>
        </div>
        <div class="staking-calculator__table-row">
          <span>{{ $t('1 год') }}</span>
          <span>{{ yearlyIncome }} {{ $t('TRX') }}</span>
        </div>
      </div>

      <div class="staking-calculator__info">
        <p>{{ $t('APR') }}: {{ apr }}%</p>
        <p>{{ $t('Минимальная сумма') }}: 1000 {{ $t('TRX') }}</p>
      </div>

      <button class="button button_green w-100 py-8 py-mob-12 br-8" @click="openModal">
        {{ $t('Начать стейкинг') }}
      </button>

      <ModalWindow :isVisible="isModalVisible" @close="closeModal">

        <div class="popup">

          <div class="popup__header">
            {{ $t('Стейкинг TRX') }}
          </div>

          <TrxCounter v-model="amount" :max="useUserStore.user.trx_balance"/>

          <!-- class for error check_error -->
          <label class="check">
            <input v-model="agree" class="check__input" type="checkbox">
            <i class="check__square"></i>
            <span class="check__text font-14">
              {{ $t('С правилами стейкинга ознакомлен') }}
              <span class="c-green" @click="openModal3">{{ $t('правилами') }}</span>
            </span>
          </label>

          <button class="button button_green py-12 w-100" @click="stake">
            {{ $t('Начать стейкинг') }}
          </button>

        </div>

      </ModalWindow>


      <ModalWindow overlayClass="overflow" :isVisible="isModalVisible3" @close="closeModal3">

        <div class="popup-rule">

          <div class="popup-rule__header">
            {{ $t('Условия и правила стейкинга') }}
          </div>

          <div class="popup-rule__body">
            <div>
              <b>
                {{ $t('1. Общие положения') }}
              </b>
              <p>
                {{ $t('1.1. Стейкинг осуществляется на платформе EcoForce и позволяет пользователям замораживать токены TRX для получения энергии и дохода.') }}
              </p>
              <p>
                {{ $t('1.2. Участие в стейкинге является добровольным, и пользователь несёт ответственность за понимание связанных рисков.') }}
              </p>
              <p>
                {{ $t('1.3. Стейкинг регулируется настоящими условиями и правилами, которые пользователь принимает при добавлении токенов в стейкинг.') }}
              </p>
            </div>
            <div>
              <b>
                {{ $t('2. Порядок стейкинга') }}
              </b>
              <p>
                {{ $t('2.1. Пользователь добавляет токены TRX в стейкинг через личный кабинет на платформе..') }}
              </p>
              <p>
                {{ $t('2.2. Замороженные токены TRX автоматически участвуют в общем пуле стейкинга платформы.') }}
              </p>
              <p>
                {{ $t('2.3. Энергия начисляется динамически и рассчитывается на основе общей суммы TRX, находящихся в стейкинге сети Tron.') }}
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

export default {
  name: 'BuyEnergy',
  components: {
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
    return {
      useEnergyStore,
      useUserStore,
      useTrxStore
    }
  },
  data() {
    return {
      normalCost: 18,
      amount: 0,
      discountCost: 8,
      savingsPercentage: 52,
      savingsAmount: 312,
      agree: false,
      isModalVisible: false,
      isModalVisible2: false,
      isModalVisible3: false,
      energy: '130 000',
      status: this.$t('Ожидание оплаты'),
      staking: {
        user_staked_trx: 0,
        daily_energy_earned: 0,
        total_accrued_energy: 0,
      },
      maxAmount: 50000,
      monthlyIncome: 0,
      quarterlyIncome: 0,
      halfYearlyIncome: 0,
      yearlyIncome: 0,
      apr: 0
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

      const usd = (this.amount * trxPrice).toFixed(2);
      const dailyEnergy = (this.amount * energyPerTrx).toFixed(2);

      const weeklyEnergy = dailyEnergy * 7;
      const monthlyEnergy = dailyEnergy * 30;
      const yearlyEnergy = dailyEnergy * 365;

      const weeklyTrx = (weeklyEnergy * buybackCost / 1_000_000).toFixed(2);
      const monthlyTrx = (monthlyEnergy * buybackCost / 1_000_000).toFixed(2);
      const yearlyTrx = (yearlyEnergy * buybackCost / 1_000_000).toFixed(2);

      this.monthlyIncome = monthlyTrx;
      this.quarterlyIncome = weeklyTrx * 3;
      this.halfYearlyIncome = weeklyTrx * 6;
      this.yearlyIncome = yearlyTrx;
      this.apr = (yearlyEnergy * 100 / this.amount).toFixed(2);

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
    stake() {
      if (!this.agree) {
        return;
      }
      createStakingService().stakeAmount(this.amount)
          .then((response) => {
            this.useUserStore.getUserDetails();
            this.isModalVisible = false;
          })
          .catch((error) => {
            console.log(error)
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
