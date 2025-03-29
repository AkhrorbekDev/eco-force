<template>
  <div
        class="table-wrapper"
        :class="{'_active': isTableWrapperVisible}"
  >
    <table>
      <thead>
        <tr>
          <th>Партнер</th>
          <th>Дата</th>
          <th>Действие</th>
          <th>Доход в TRX</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <td>{{ order.id }}</td>
          <td >{{ order.date }}</td>
          <td >{{ order.event }}</td>
          <td >{{ order.income }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button class="pagination__button _back _disable" @click="prevPage">
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.1127 5.99322C6.1127 6.18322 6.04853 6.37239 5.91936 6.52656L1.7527 11.5266C1.45853 11.8799 0.932698 
          11.9282 0.579365 11.6332C0.226031 11.3391 0.178531 10.8141 0.472698 10.4599L4.2027 5.98406L0.606865 1.51572C0.318531 1.15739 0.375198 0.632392 0.733531 
          0.344058C1.09186 0.0557252 1.61603 0.112392 1.9052 0.470724L5.92853 5.47072C6.05103 5.62322 6.1127 5.80822 6.1127 5.99322Z" fill=""/>
        </svg>
        Back
      </button>
      <div class="pagination__items">
        <span class="_active">
          {{ currentPage }}
        </span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>...</span>
        <span>
          {{ totalPages }}
        </span>
      </div>
      <button class="pagination__button" @click="nextPage">
        Next
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.1127 5.99322C6.1127 6.18322 6.04853 6.37239 5.91936 6.52656L1.7527 11.5266C1.45853 11.8799 0.932698 
          11.9282 0.579365 11.6332C0.226031 11.3391 0.178531 10.8141 0.472698 10.4599L4.2027 5.98406L0.606865 1.51572C0.318531 1.15739 0.375198 0.632392 0.733531 
          0.344058C1.09186 0.0557252 1.61603 0.112392 1.9052 0.470724L5.92853 5.47072C6.05103 5.62322 6.1127 5.80822 6.1127 5.99322Z" fill=""/>
        </svg>
      </button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: '***1234',
          date: '25.01.2025',
          event: 'Стейкинг',
          income: '1245',
        },
        {
          id: '***1234',
          date: '25.01.2025',
          event: 'Стейкинг',
          income: '1245',
        },
        {
          id: '***1234',
          date: '25.01.2025',
          event: 'Стейкинг',
          income: '1245',
        },
        {
          id: '***1234',
          date: '25.01.2025',
          event: 'Стейкинг',
          income: '1245',
        },
      ],
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 100,
      isTableWrapperVisible: false // Добавляем состояние для класса table-wrapper
    };
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