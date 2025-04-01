<template>
  <div
        class="table-wrapper"
        :class="{'_active': isTableWrapperVisible}"
  >
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Действие</th>
          <th>Сумма</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
      <template v-if="orders?.length > 0">
        <tr v-for="(order, index) in orders" :key="index">
          <td data-label="Дата:">{{ order.date }}</td>
          <td data-label="Действие:">{{ order.action_type }}</td>
          <td data-label="Сумма:">{{ order.energy_amount }}</td>
          <td data-label="Статус:">{{ order.status }}</td>
        </tr>
      </template>
        <template v-else>
          <tr>
            <td colspan="7" style="text-align: center">Нет данных</td>
          </tr>
        </template>
      </tbody>
    </table>

    <button class="table-wrapper__more button button_bordered py-12 br-8" @click="toggleTableWrapper">
      Показать еще
    </button>
    <Pagination v-if="false" :total-pages="10" v-model:current-page="currentPage" />

  </div>
</template>

<script>
import {createEnergyService, createStakingService, createUserService} from "@/services/index.js";
import Pagination from "@/components/Pagination/Pagination.vue";
import {useUserGlobal} from "@/store/userGlobal.js";

export default {
  components: {Pagination},
  data() {
    return {
      actions: [],
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
          createStakingService().getStakingActions().then((response) => {
            this.actions = response;
            this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
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
    }
  }
};
</script>

<style scoped lang="scss">
@import './TableStakingActions';
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
