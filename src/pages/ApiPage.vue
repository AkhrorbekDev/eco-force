<template>
  <main class="main">

    <section class="section-panels">

      <div class="container">
        <div class="section-panels__row">
          <PanelBalance />
          <PanelStaking />
          <PanelEnergy />
        </div>
      </div>

    </section>

    <section class="section-api">
      <div class="container">
        <div class="section-api__content">

          <h1 class="section-api__title">
            API
          </h1>

          <div class="block">
            <label class="block__label">
              <span>
                <b>
                  API
                </b>
                ключ
              </span>
              <input class="input" type="text">
            </label>
            <button class="button button_green br-8 py-14">
              Сгенерировать
            </button>
          </div>

          <div class="d-grid gap-12">
            <p>
              Данный функционал позволяет взаимодействовать с нашим сервисом через API.
            </p>
            <p>
              Вам доступно управление адресами кошельков, покупка энергии и другие функции.
            </p>
            <a class="c-green" href="#">
              Вся документация
            </a>
          </div>

          <a class="button-goto" href="/faq">
            FAQ
            <img src="/images/arrow-left.svg" width="24" height="24" loading="lazy" alt="Arrow Left">
          </a>

        </div>
      </div>
    </section>

  </main>
</template>

<script>
import PanelBalance from '@/components/PanelBalance/PanelBalance.vue';
import PanelEnergy from '@/components/PanelEnergy/PanelEnergy.vue';
import PanelStaking from '@/components/PanelStaking/PanelStaking.vue';

export default {
  name: 'ApiPage',
  components: {
      PanelBalance,
      PanelStaking,
      PanelEnergy,
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars';

  .main {
    padding-top: 22px;
    padding-bottom: 160px;
    @media (max-width: $mobile) {
      padding-top: 0;
      padding-bottom: 32px;
    }
  }

  .section-api {
    padding-top: 22px;
    &__title {
      margin-bottom: 22px;
    }
    &__content {
      max-width: 590px;
    }
    @media (max-width: $mobile) {
      padding-top: 0;
    }
  }

  .block {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 590px;
    width: 100%;
    margin-bottom: 30px;
    padding: 40px;
    border-radius: 16px;
    background: var(--color4);

    &__label {
      display: grid;
      gap: 8px;
    }
    @media (max-width: $mobile) {
      padding: 16px;
    }
  }

  .button-goto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 40px;
    padding: 25px 32px;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    background: var(--color4);
    box-shadow: 0px 2px 12px 0px #000A0014;
    border-radius: 16px;
    @media (max-width: $mobile) {
      padding: 16px;
    }

  }



</style>