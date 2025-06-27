<template>
  <div class="language-dropdown" ref="dropdown">
    <button class="language-dropdown__button" @click="handleButtonClick">
      {{ languageAbbreviations[selectedLanguage.name] }}
    </button>
    <ul class="language-dropdown__list" v-if="isOpen">
      <li
          v-for="language in languages"
          :key="language"
          @click="handleLanguageClick(language)"
          :class="{ 'language-dropdown__item': true, '_active': language.code === selectedLanguage.code }"
      >
        {{ language.name }}
      </li>
    </ul>
  </div>

  <ModalWindow :isVisible="isModalVisible" :disableContent="true"/>
</template>

<script>
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import {useI18n} from "vue-i18n";
import {Language} from "@/i18n/index.js";

export default {
  components: {
    ModalWindow
  },
  data() {
    return {
      isOpen: false,
      selectedLanguage: {
        name: 'Russia',
        code: Language.RU
      },
      languages: [{
        name: 'Russia',
        code: Language.RU
      }, {
        name: 'English',
        code: Language.EN
      }],
      languageAbbreviations: {
        Russia: 'Ru',
        English: 'En',
      },
      isModalVisible: false
    };
  },
  setup() {
    const {locale} = useI18n({useScope: 'global'});

    return {
      locale
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    selectLanguage(language) {
      this.selectedLanguage = language;
      this.locale = language.code;
      this.toggleDropdown()
    },
    handleButtonClick() {
      this.toggleDropdown();
    },
    handleLanguageClick(language) {
      this.selectLanguage(language);
    },
    openModal() {
      this.isModalVisible = true;
      this.toggleAppClass(true);
    },
    closeModal() {
      this.isModalVisible = false;
      this.toggleAppClass(false);
    },
    toggleAppClass(shouldAdd) {
      const appElement = document.getElementById('app');
      if (appElement) {
        if (shouldAdd) {
          appElement.classList.add('modal-open_language');
        } else {
          appElement.classList.remove('modal-open_language');
        }
      }
    },
    handleClickOutside(event) {
      // Проверяем, был ли клик вне дропдауна
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.toggleDropdown();
        document.removeEventListener('click', this.handleClickOutside); // Убираем обработчик
      }
    }
  },
  // Отслеживаем открытие дропдауна
  watch: {
    isOpen(newVal) {
      if (!newVal) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }
};
</script>

<style lang="scss">
@import './language-dropdown';

.modal-open_language {
  .header {
    position: relative;
    z-index: calc(var(--z-index-modal) + 1);
  }

  .logout-dropdown {
    pointer-events: none;
  }
}

</style>
