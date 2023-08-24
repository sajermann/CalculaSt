/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from '@mui/material';
import { TAutocompleteDefault } from '~/Model/TAutocompleteDefault';
import { TTypeCalc } from '~/Model/TTypeCalc';

const optionsList = [
	{
		id: '1',
		name: 'Fora',
	},
	{
		id: '2',
		name: 'Dentro',
	},
	{
		id: '3',
		name: 'BS Dupla',
	},
	{
		id: '4',
		name: 'Não Aplicado',
	},
];

type Props = {
	handleTypeCalc: (data: TTypeCalc | null) => void;
	value: TTypeCalc | null;
	disabled: boolean;
};

export function SelectTypeCalc({ handleTypeCalc, value, disabled }: Props) {
	const defaultProps: TAutocompleteDefault<TTypeCalc> = {
		options: optionsList,
		getOptionLabel: (option: TTypeCalc) => `${option.name}`,
	};

	return (
		<Autocomplete
			isOptionEqualToValue={(option, valueTemp) =>
				option.name === valueTemp.name
			}
			fullWidth
			{...defaultProps}
			id="controlled-TypeCalc"
			value={value}
			onChange={(_, newValue) => {
				handleTypeCalc(newValue);
			}}
			disabled={disabled}
			renderInput={params => (
				<TextField
					{...params}
					label="Tipo Cálculo"
					margin="normal"
					variant="standard"
				/>
			)}
		/>
	);
}
