import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TAutocompleteDefault } from '~/Model/TAutocompleteDefault';
import { TBrazilState } from '~/Model/TBrazilState';

type Props = {
	handleBrazilState: (data: TBrazilState | null) => void;
	states: TBrazilState[];
	value: TBrazilState | null;
	disabled: boolean;
	label: string;
};

export function SelectBrazilState({
	handleBrazilState,
	value,
	states,
	disabled,
	label,
}: Props) {
	const [defaultProps, setDefaultProps] = useState<
		TAutocompleteDefault<TBrazilState>
	>({
		options: states,
		getOptionLabel: (option: TBrazilState) =>
			`${option.initials} - ${option.name}`,
	});

	function handleAutoComplete(newValue: TBrazilState | null) {
		handleBrazilState(newValue);
	}

	useEffect(() => {
		setDefaultProps({
			options: states,
			getOptionLabel: (option: TBrazilState) =>
				`${option.initials} - ${option.name}`,
		});
	}, [states]);

	return (
		<Autocomplete
			isOptionEqualToValue={(option, valueTemp) =>
				option.name === valueTemp.name
			}
			fullWidth
			disabled={disabled}
			{...defaultProps}
			value={value}
			onChange={(_, newValue) => {
				handleAutoComplete(newValue);
			}}
			renderInput={params => (
				<TextField {...params} label={label} margin="normal" />
			)}
		/>
	);
}
