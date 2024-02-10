import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import config from "../../config";
import storage from "../storage";
import kr from '../../assets/lang/kr.json'
import uz from '../../assets/lang/uz.json'


const resources = {
    Kr: {
        translation: kr
    },
    Uz: {
        translation: uz
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
