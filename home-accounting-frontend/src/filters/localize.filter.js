import store from "@/store"
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

/*
 * Параметр locale только ради страницы логина, потому что store не успевает прогреться, как я понимаю
 */
export default function localizeFilter(key, locale = store.getters.info.locale || 'ru-RU') {
    return locales[locale][key] || `${key}`
}