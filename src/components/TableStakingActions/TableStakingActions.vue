<template>
  <div
      class="table-wrapper"
      :class="{'_active': isTableWrapperVisible}"
  >
    <table>
      <thead>
      <tr>
        <th>{{ $t('date') }}</th>
        <th>{{ $t('desc32') }}</th>
        <th>{{ $t('desc35') }}</th>
        <th>{{ $t('status') }}</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="actions?.length > 0">
        <tr v-for="(order, index) in actions" :key="index">
          <td :data-label="$t('date')">{{ order.created_at }}</td>
          <td :data-label="$t('desc32')">{{ order.action_type }}</td>
          <td :data-label="$t('desc35')">{{ order.amount }}</td>
          <td :data-label="$t('status')">{{ order.status }}</td>
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
    <Pagination v-if="actions.length > 0" :total-pages="totalPages" :current-page="currentPage"
                @update:current-page="getUserOrders({page: $event})"/>

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
          this.getUserOrders({page: 1});
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
      this.isTableWrapperVisible = !this.isTableWrapperVisible;
      createStakingService().getStakingActions({page: this.currentPage + 1}).then((response) => {
        this.actions = [...this.actions, ...response.results];
        this.totalPages = Math.ceil(response.count / 10);
        this.currentPage = this.currentPage + 1;
      }); // Переключаем состояние
    },
    getUserOrders(query) {
      createStakingService().getStakingActions(query).then((response) => {
        this.actions = response.results;
        this.totalPages = Math.ceil(response.count / 10);
        this.currentPage = query.page;
      });
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
    display: none;
  }

}
</style>
