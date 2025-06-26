<template>
  <main class="main">

    <section class="section-api">
      <div class="container">
        <div class="section-api__content">

          <h1 class="section-api__title">
            {{ $t('desc42') }}
          </h1>
          <div class="row gap-8">
            <button @click="openModal" class="button button_green">{{ $t('popup 1') }}</button>
            <button @click="openModal2" class="button button_green">{{ $t('popup 2') }}</button>
            <button @click="openModal3" class="button button_green">{{ $t('popup 3') }}</button>
          </div>

          <ModalWindow :isVisible="isModalVisible" @close="closeModal">
            <div class="popup1">

              <p>
                {{ $t('Короткий текст.') }}
              </p>

              <a class="button button_green py-14 w-100 br-8" href="#"> {{ $t('Кнопка') }} </a>

            </div>
          </ModalWindow>

          <ModalWindow :isVisible="isModalVisible2" @close="closeModal2">
            <div class="popup2">
              <div class="popup2__title">
                {{ $t('Заголовок сообщения может быть длинным') }}
              </div>

              <p class="mb-20">
                {{ $t('Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке направлений прогрессивного развития.') }}
              </p>

              <a class="button button_green py-14 w-100 br-8" href="#"> {{ $t('Кнопка') }} </a>

            </div>
          </ModalWindow>

          <ModalWindow :isVisible="isModalVisible3" @close="closeModal3">
            <div class="popup3">
              <p class="mb-20">
                {{ $t('Длинный текст. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке направлений прогрессивного развития.') }}
              </p>

              <div class="row gap-12">
                <a class="button button_green py-14 w-100 br-8" href="#"> {{ $t('Кнопка') }} </a>
                <a class="button button_bordered py-14 w-100 br-8" href="#"> {{ $t('Кнопка') }} </a>
              </div>

            </div>
          </ModalWindow>



        </div>
      </div>
    </section>

  </main>
</template>

<script>
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';

export default {
  name: 'AboutPage',
  components: {
    ModalWindow
  },
  data() {
    return {
      isModalVisible: false,
      isModalVisible2: false,
      isModalVisible3: false,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openModal2() {
      this.isModalVisible2 = true;
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
  },
}
</script>

<style scoped lang="scss">
.popup1 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 480px;
  padding: 40px;
}

.popup2 {
  width: 480px;
  padding: 40px;

  &__title {
    margin-bottom: 8px;
    font-size: 22px;
    line-height: 30px;
    font-weight: 600;
  }

  &__info {
    margin-bottom: 12px;
  }

  &__img {
    display: block;
    margin: 0 auto 24px;
  }

  &__status {
    margin-bottom: 16px;
    color: var(--color5);
  }

  &__block {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px;
    border: 1px solid var(--color1);
    border-radius: 12px;
  }
}

.popup3 {
  width: 480px;
  padding: 40px;
}
</style>
