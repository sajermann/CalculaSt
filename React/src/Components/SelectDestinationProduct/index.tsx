import { Autocomplete, TextField } from '@mui/material';
import { TAutocompleteDefault } from '~/Model/TAutocompleteDefault';
import { TDestinationProduct } from '~/Model/TDestinationProduct';

const optionsList = [
	{
		id: '1',
		name: 'Consumo',
	},
	{
		id: '2',
		name: 'Revenda',
	},
];

type Props = {
	handleDestinationProduct: (data: TDestinationProduct | null) => void;
	value: TDestinationProduct | null;
	disabled: boolean;
};
export function SelectDestinationProduct({
	handleDestinationProduct,
	value,
	disabled,
}: Props) {
	const defaultProps: TAutocompleteDefault<TDestinationProduct> = {
		options: optionsList,
		getOptionLabel: option => `${option.name}`,
	};

	return (
		<Autocomplete
			isOptionEqualToValue={(option, valueTemp) =>
				option.name === valueTemp.name
			}
			fullWidth
			{...defaultProps}
			id="controlled-DestinationProduct"
			value={value}
			onChange={(_, newValue) => {
				handleDestinationProduct(newValue);
			}}
			disabled={disabled}
			renderInput={params => (
				<TextField
					{...params}
					label="Destino Mercadoria"
					margin="normal"
					variant="standard"
				/>
			)}
		/>
	);
}
