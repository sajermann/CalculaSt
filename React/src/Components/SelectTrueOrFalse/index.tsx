import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TAutocompleteDefault } from '~/Model/TAutocompleteDefault';
import { TIdName } from '~/Model/TIdName';

const optionsList = [
	{
		id: '1',
		name: 'Sim',
	},
	{
		id: '2',
		name: 'Não',
	},
];
type Props = {
	handleTrueOrFalse: (data: boolean) => void;
	disabled: boolean;
	label: string;
	value: boolean;
};

export function SelectTrueOrFalse({
	handleTrueOrFalse,
	disabled,
	label,
	value,
}: Props) {
	const defaultProps: TAutocompleteDefault<TIdName> = {
		options: optionsList,
		getOptionLabel: option => `${option.name}`,
	};
	const [valueHere, setValueHere] = useState<TIdName | null>(null);

	function handleAutoComplete(newValue: TIdName | null) {
		if (!newValue) return;
		if (newValue.name === 'Sim') handleTrueOrFalse(true);
		if (newValue.name === 'Não') handleTrueOrFalse(false);
	}

	useEffect(() => {
		if (value) {
			setValueHere({
				id: '1',
				name: 'Sim',
			});
			return;
		}
		setValueHere({
			id: '2',
			name: 'Não',
		});
	}, [value]);

	return (
		<Autocomplete
			isOptionEqualToValue={(option, valueTemp) =>
				option.name === valueTemp.name
			}
			fullWidth
			{...defaultProps}
			id="controlled-trueOrfalse"
			value={valueHere}
			disabled={disabled}
			onChange={(_, newValue) => {
				handleAutoComplete(newValue);
			}}
			renderInput={params => (
				<TextField {...params} label={label} margin="normal" />
			)}
		/>
	);
}
