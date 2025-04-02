<template>
  <div
      :class="customClass"
      class="staking-calculator">

    <div class="staking-calculator__header">
      <div class="staking-calculator__title">
        Стейкинг: Калькулятор доходности
      </div>
    </div>

    <div class="staking-calculator__body">

      <CurrencyInput v-model="amountCurrency"/>

      <CustomSlider v-model="amountCurrency" :usd="energyPerPeriod.usd" min="1000" max="50000"/>

      <TableStaking :data="energyPerPeriod"/>

      <button class="button button_green w-100 py-8 py-mob-12 br-8" @click="openModal">
        Начать стейкинг
      </button>

      <ModalWindow :isVisible="isModalVisible" @close="closeModal">

        <div class="popup">

          <div class="popup__header">
            Стейкинг TRX
          </div>

          <TrxCounter v-model="amountCurrency" :max="useUserStore.user.trx_balance"/>

          <!-- class for error check_error -->
          <label class="check">
            <input v-model="agree" class="check__input" type="checkbox">
            <i class="check__square"></i>
            <span class="check__text font-14">
              С
              <span class="c-green" @click="openModal3">правилами</span>
              стейкинга ознакомлен
            </span>
          </label>

          <button class="button button_green py-12 w-100" @click="stake">
            Начать стейкинг
          </button>

        </div>

      </ModalWindow>


      <ModalWindow overlayClass="overflow" :isVisible="isModalVisible3" @close="closeModal3">

        <div class="popup-rule">

          <div class="popup-rule__header">
            Условия и правила стейкинга
          </div>

          <div class="popup-rule__body">
            <div>
              <b>
                1. Общие положения
              </b>
              <p>
                1.1. Стейкинг осуществляется на платформе EcoForce и позволяет пользователям замораживать токены TRX для
                получения энергии и дохода.
              </p>
              <p>
                1.2. Участие в стейкинге является добровольным, и пользователь несёт ответственность за понимание
                связанных рисков.
              </p>
              <p>
                1.3. Стейкинг регулируется настоящими условиями и правилами, которые пользователь принимает при
                добавлении токенов в стейкинг.
              </p>
            </div>
            <div>
              <b>
                2. Порядок стейкинга
              </b>
              <p>
                2.1. Пользователь добавляет токены TRX в стейкинг через личный кабинет на платформе..
              </p>
              <p>
                2.2. Замороженные токены TRX автоматически участвуют в общем пуле стейкинга платформы.
              </p>
              <p>
                2.3. Энергия начисляется динамически и рассчитывается на основе общей суммы TRX, находящихся в стейкинге
                сети Tron.
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
    stake() {
      if (!this.agree) {
        return;
      }
      createStakingService().stakeAmount(this.amountCurrency)
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
