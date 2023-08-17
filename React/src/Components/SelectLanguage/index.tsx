import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from '../../Hooks/UseTranslation';

const LANGUAGES_LIST = [
	{ id: 'en', text: 'English' },
	{ id: 'pt-BR', text: 'Português' },
];

export function SelectLanguage() {
	const { changeLanguage, currentLanguage, translate } = useTranslation();
	const [language, setLanguage] = useState(currentLanguage);

	function handleChangeLanguage(e: SelectChangeEvent) {
		const { value } = e.target;
		setLanguage(value);
		changeLanguage(value);
	}

	return (
		<FormControl className="w-min">
			<InputLabel id="demo-simple-select-label">
				{translate('LANGUAGE')}
			</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={language}
				label={translate('LANGUAGE')}
				onChange={handleChangeLanguage}
			>
				{LANGUAGES_LIST.map(item => (
					<MenuItem value={item.id} key={item.id}>
						{item.text}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
