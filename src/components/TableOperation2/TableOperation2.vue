<template>
  <div
      class="table-wrapper"
      :class="{'_active': isTableWrapperVisible}"
  >
    <table>
      <thead>
      <tr>
        <th>{{ $t('Партнер') }}</th>
        <th>{{ $t('Дата') }}</th>
        <th>{{ $t('Действие') }}</th>
        <th>{{ $t('Доход в TRX') }}</th>
      </tr>
      </thead>
      <tbody>

      <template v-if="orders?.length > 0">
        <tr v-for="(order, index) in orders" :key="index">
          <td>{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.event }}</td>
          <td>{{ order.income }}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="7" style="text-align: center">{{ $t('Нет данных') }}</td>
        </tr>
      </template>
      </tbody>
    </table>

    <Pagination v-if="false" :total-pages="totalPages" :current-page="currentPage"
                @update:current-page="getUserOrders({page: $event})"/>


  </div>
</template>

<script>
import {createEnergyService, createUserService} from "@/services/index.js";
import {useUserGlobal} from "@/store/userGlobal.js";
import Pagination from "@/components/Pagination/Pagination.vue";

export default {
  components: {Pagination},
  data() {
    return {
      orders: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 100,
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
          this.getUserOrders({page: 1})
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
    getUserOrders(query) {
      createUserService().getReferrals(query).then((response) => {
        this.orders = response.results;
        this.totalPages = Math.ceil(response.count / 10);
        this.currentPage = query.page;
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

    svg {
      fill: #1AC200;
    }

    &._disable {
      pointer-events: none;
      opacity: .5;
    }

    &._back {
      svg {
        transform: scale(-1, -1);
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
    &__button {
      font-size: 0;

      svg {
        fill: var(--color1);
      }
    }
    &__items {
      span._active {
        color: var(--color4);
        background: var(--color2);
        border-radius: 8px;
      }
    }
  }

}
</style>
