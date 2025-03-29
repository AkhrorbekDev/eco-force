<template>
  <div class="accordion">

    <div 
        class="accordion-item"
        :class="{ '_active': isOpen(index) }"
        v-for="(item, index) in items" 
        :key="index">
      <div class="accordion-header" @click="toggleAccordion(index)">
        <h3>{{ item.title }}</h3>
        <img class="accordion-check" src="/images/check.svg" alt="Icon Check">
      </div>
      <div v-if="isOpen(index)" class="accordion-content">
        <p>{{ item.content }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const openIndex = ref(null);

    const items = ref([
      {
        title: 'Что такое стейкинг',
        content: 'Стейкинг — это процесс хранения и валидации криптовалюты в блокчейне для поддержания работы сети и получения вознаграждений.'
      },
      {
        title: 'Как это работает?',
        content: 'Продвижение продаж неестественно оправдывает тактический потребительский рынок. Стратегическое планирование развивает имидж, позиционирование на рынке искажает эмпирический имидж, реализуя социальную ответственность бизнеса.'
      },
      {
        title: 'Что такое API',
        content: 'API (Application Programming Interface) — это набор протоколов и инструментов для создания программного обеспечения, который позволяет различным приложениям взаимодействовать друг с другом.'
      },
      {
        title: 'Как рассчитывается энергия',
        content: 'Энергия рассчитывается на основе различных физических формул, в зависимости от контекста. Например, в физике энергия может быть рассчитана как произведение массы на квадрат скорости света (E=mc²).'
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