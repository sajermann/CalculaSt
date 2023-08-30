/* eslint-disable camelcase */
import i18next from 'i18next';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useTranslation as useTranslationOficial } from 'react-i18next';

export function useTranslation() {
	const { t, i18n } = useTranslationOficial();
	const { language: currentLanguage } = i18next;

	function translate(text: string) {
		return t(text);
	}

	function changeLanguage(language: string) {
		i18n.changeLanguage(language);
	}

	const translateMaterialTable = {
		'pt-BR': MRT_Localization_PT_BR,
		en: MRT_Localization_EN,
	};

	return {
		translate,
		changeLanguage,
		currentLanguage,
		localizationMTR: translateMaterialTable[currentLanguage as 'en' | 'pt-BR'],
	};
}
