import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TBrazilState } from '~/Model/TBrazilState';

type Props = {
	handleBrazilState: (data: TBrazilState) => void;
	states: TBrazilState[];
	value: TBrazilState;
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
	const [valueHere, setValueHere] = useState<TBrazilState | null>(null);
	const [defaultProps, setDefaultProps] = useState<any>({
		options: states,
		getOptionLabel: (option: TBrazilState) =>
			`${option.initials} - ${option.name}`,
	});

	function handleAutoComplete(newValue: TBrazilState) {
		handleBrazilState({ ...newValue });
	}

	useEffect(() => {
		if (value.initials === '') {
			setValueHere(null);
			return;
		}
		setValueHere({ ...value });
	}, [value]);

	useEffect(() => {
		setDefaultProps({
			options: states,
			getOptionLabel: (option: TBrazilState) =>
				`${option.initials} - ${option.name}`,
		});
	}, [states]);

	return (
		<Autocomplete
			fullWidth
			disabled={disabled}
			{...defaultProps}
			value={valueHere}
			onChange={(_, newValue: TBrazilState) => {
				handleAutoComplete(newValue);
			}}
			renderInput={params => (
				<TextField {...params} label={label} margin="normal" />
			)}
		/>
	);
}
