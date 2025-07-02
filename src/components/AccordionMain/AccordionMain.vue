<template>
  <div class="accordion">

    <div
        class="accordion-item"
        :class="{ '_active': isOpen(index) }"
        v-for="(item, index) in items"
        :key="index">
      <div class="accordion-header" @click="toggleAccordion(index)">
        <h3>{{ item.title }}</h3>
        <img class="accordion-check" src="/images/check.svg">
      </div>
      <div v-if="isOpen(index)" class="accordion-content">
        <p>{{ item.content }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import {useI18n} from "vue-i18n";

export default {
  setup() {
    const openIndex = ref(null);
    const { t } = useI18n();
    const items = ref([
      {
        title: t('faq.questions.1.title'),
        content: t('faq.questions.1.content')
      },
      {
        title: t('faq.questions.2.title'),
        content: t('faq.questions.2.content')
      },
      {
        title: t('faq.questions.3.title'),
        content: t('faq.questions.3.content')
      },
      {
        title: t('faq.questions.4.title'),
        content: t('faq.questions.4.content')
      }
    ]);

    const toggleAccordion = (index) => {
      openIndex.value = openIndex.value === index ? null : index;
    };

    const isOpen = (index) => {
      return openIndex.value === index;
    };

    return {
      items,
      openIndex,
      toggleAccordion,
      isOpen
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/vars';
.accordion {

  &-item {
    border: 1px solid transparent;
    margin-bottom: 16px;
    border-radius: 24px;
    background: var(--color4);
    box-shadow: 0px 4px 12px 0px #0000000F;
    transition: .2s;
    h3 {
      margin-bottom: 0;
    }

    &._active {
      border-color: var(--color2);

      .accordion-check {
        transform: rotate(180deg);
      }
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    cursor: pointer;
  }

  &-check {
    transition: .2s;
  }

  &-content {
    padding: 0 24px 24px;
    color: #1C1C1C;
  }

  @media (max-width: $mobile) {
    &-item {
      border-radius: 16px;
      h3 {
        font-size: 20px;
        line-height: 32px;
      }
    }
    &-header {
      padding: 16px 24px;
    }
  }

}
</style>
