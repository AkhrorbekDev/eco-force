<template>
  <div class="pagination">
    <button class="pagination__button _back _disable" @click="selectPage(currentPage - 1)"
            :disabled="currentPage === 1">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.1127 5.99322C6.1127 6.18322 6.04853 6.37239 5.91936 6.52656L1.7527 11.5266C1.45853 11.8799 0.932698
          11.9282 0.579365 11.6332C0.226031 11.3391 0.178531 10.8141 0.472698 10.4599L4.2027 5.98406L0.606865 1.51572C0.318531 1.15739 0.375198 0.632392 0.733531
          0.344058C1.09186 0.0557252 1.61603 0.112392 1.9052 0.470724L5.92853 5.47072C6.05103 5.62322 6.1127 5.80822 6.1127 5.99322Z"
              fill="#1AC200"/>
      </svg>
      {{ $t('Back') }}
    </button>
    <div class="pagination__items">
      <span
          v-for="page in pages"
          :key="page"
          @click="selectPage(page)"
          :class="{ active: currentPage === page, disabled: page === '...' }"
      >
        {{ page }}
      </span>
    </div>
    <button class="pagination__button" @click="selectPage(currentPage + 1)" :disabled="currentPage === totalPages">
      {{ $t('Next') }}
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.1127 5.99322C6.1127 6.18322 6.04853 6.37239 5.91936 6.52656L1.7527 11.5266C1.45853 11.8799 0.932698
          11.9282 0.579365 11.6332C0.226031 11.3391 0.178531 10.8141 0.472698 10.4599L4.2027 5.98406L0.606865 1.51572C0.318531 1.15739 0.375198 0.632392 0.733531
          0.344058C1.09186 0.0557252 1.61603 0.112392 1.9052 0.470724L5.92853 5.47072C6.05103 5.62322 6.1127 5.80822 6.1127 5.99322Z"
              fill="#1AC200"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
});

const emit = defineEmits(["update:currentPage"]);
const pages = computed(() => {
  const { totalPages, currentPage } = props;
  let range = [];

  range.push(1);

  if (currentPage > 4) {
    range.push("...");
  }

  let minPage = Math.max(1, currentPage - 1);
  let maxPage = Math.min(totalPages - 1, currentPage + 1);
  console.log(minPage, maxPage);

  for (let i = minPage; i <= maxPage; i++) {
    range.push(i);
  }

  if (maxPage < totalPages - 2) {
    range.push("...");
  }

  range.push(totalPages);
  return range;
});

const selectPage = (page) => {
  if (typeof page === "number") {
    emit("update:currentPage", page);
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/vars';

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
      border-radius: 8px;

      &.active {
        background: #1AC20010;

      }
    }
  }

  @media (max-width: $tabletMin) {
    display: none;
  }


}
</style>
