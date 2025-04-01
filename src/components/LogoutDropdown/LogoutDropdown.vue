<template>

  <div class="logout-dropdown" ref="dropdown">

    <button class="logout-dropdown__button" @click="handleButtonClick">
      <img src="/images/user-white.svg" loading="lazy" width="18" height="20" alt="User Icon">
    </button>

    <div class="logout-dropdown__list" v-if="isOpen" @click="logout">
      <img src="/images/logout.svg" width="24" height="24" loading="lazy" alt="Icon Logout">
      Выход
    </div>

  </div>

  <ModalWindow :isVisible="isModalVisible" :disableContent="true"/>
</template>

<script>
import ModalWindow from '../ModalWindow/ModalWindow.vue';
import {logout} from "@/services/authService.js";
import {useUserGlobal} from "@/store/userGlobal.js";

export default {
  components: {
    ModalWindow
  },
  setup() {
    const userStore = useUserGlobal();
    return {
      userStore
    }
  },
  data() {
    return {
      isOpen: false,
      selectedLanguage: 'Russia',
      languages: ['Russia', 'English'],
      languageAbbreviations: {
        Russia: 'Ru',
        English: 'En',
      },
      isModalVisible: false
    };
  },
  methods: {
    logout() {
      logout();
      this.userStore.setLoggedIn(false)
      this.userStore.setUser({
        tron_address: "",
        balance_trx: 0,
        balance_energy: 0,
        referral_code: '0',
        registration_date: '',
        energy:
            0,
        energy_24:
            0,
        staking_apr:
            0,
        total_staked_trx:
            0,
        trx_balance:
            0
      })
    },
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
          appElement.classList.add('modal-open_logout');
        } else {
          appElement.classList.remove('modal-open_logout');
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
@import './LogoutDropdown';

.modal-open_logout {
  .header {
    position: relative;
    z-index: calc(var(--z-index-modal) + 1);
  }

  .language-dropdown {
    pointer-events: none;
  }
}

</style>
