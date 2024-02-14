import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import config from "../../config";
import storage from "../storage";
import kr from '../../assets/lang/kr.json'
import uz from '../../assets/lang/uz.json'
import ru from '../../assets/lang/ru.json'


const resources = {
    Kr: {
        translation: kr
    },
    Uz: {
        translation: uz
    },
    Ru: {
        translation: ru
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: storage.get("lang") || config.DEFAULT_APP_LANG,
        fallbackLng: storage.get("lang") || config.DEFAULT_APP_LANG,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
