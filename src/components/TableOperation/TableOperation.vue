<template>
  <div
        class="table-wrapper"
        :class="{'_active': isTableWrapperVisible}"
  >
    <table>
      <thead>
        <tr>
          <th>{{ $t('order_№') }}</th>
          <th>{{ $t('date') }}</th>
          <th>{{ $t('address') }}</th>
          <th>{{ $t('energy') }}</th>
          <th>{{ $t('term') }}</th>
          <th>{{ $t('status') }}</th>
          <th>{{ $t('cost') }}</th>
        </tr>
      </thead>
      <tbody>
      <template v-if="orders?.length > 0">
        <tr v-for="(order, index) in orders" :key="index">
          <td :data-label="$t('order_№')">: {{ order.order_number }}</td>
          <td :data-label="$t('date')">: {{ order.date }}</td>
          <td :data-label="$t('address')">: {{ order.delegation_address }}</td>
          <td :data-label="$t('energy')">: {{ order.energy_amount }}</td>
          <td :data-label="$t('term')">: {{ order.duration }}</td>
          <td :data-label="$t('status')">: {{ order.status }}</td>
          <td :data-label="$t('cost')">: {{ order.required_trx_amount }}</td>
        </tr>
      </template>
        <template v-else>
          <tr>
            <td colspan="7" style="text-align: center">{{ $t('no_data') }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <button class="table-wrapper__more button button_bordered py-12 br-8" @click="toggleTableWrapper">
      {{ $t('show_more') }}
    </button>
    <Pagination v-if="false" :total-pages="totalPages" v-model:current-page="currentPage" />

  </div>
</template>

<script>
import {createEnergyService, createUserService} from "@/services/index.js";
import Pagination from "@/components/Pagination/Pagination.vue";
import {useUserGlobal} from "@/store/userGlobal.js";

export default {
  components: {Pagination},
  data() {
    return {
      orders: [],
      currentPage: 1,
      itemsPerPage: 1,
      totalPages: 1,
      isTableWrapperVisible: false // Добавляем состояние для класса table-wrapper
    };
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
  watch: {
    loggedIn: {
      immediate: true,
      handler(value) {
        if (value) {
          createEnergyService().getUserOrders().then((response) => {
            this.orders = response;
            console.log(response)
            this.totalPages =  Math.ceil(response.count / 10);
          });
        }
      }
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    toggleTableWrapper() {
      this.isTableWrapperVisible = !this.isTableWrapperVisible; // Переключаем состояние
    },
    getUserOrders() {
      createEnergyService().getUserOrders({page: this.currentPage + 1}).then((response) => {
        this.orders = response;
        this.totalPages = Math.ceil(response.count / 10);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import './TableOperation';
@import '../../assets/styles/vars';

.pagination {
  display: flex;
  justify-content: space-between;
  max-width: 430px;
  width: 100%;
  margin-inline: auto;
  color: var(--color2);
  text-align: center;

  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 20px;

    &._disable {
      pointer-events: none;
      opacity: .5;
    }

    &._back {
      svg {
        transform: scale(-1,-1);
      }
    }
  }

  &__items {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  @media (max-width: $tabletMin) {
    display: none;
  }

}
</style>
