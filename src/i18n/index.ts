import app_en from './locales/app_en.json'
import app_ru from './locales/app_ru.json'

import {createI18n} from "vue-i18n";

export enum Language {
    EN = 'en-US',
    RU = 'ru-RU',
}

const defaultLanguage = Language.EN

const i18n = createI18n({
    locale: defaultLanguage,
    messages: {
        en: app_en,
        ru: app_ru,
    },
    fallbackLocale: defaultLanguage,
    legacy: false,
    globalInjection: true
})

export default i18n
