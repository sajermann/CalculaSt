/* eslint-disable camelcase */
import { MRT_TableInstance } from 'material-react-table';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { customFormat } from '~/Utils/CustomFormat';

export function FooterTotal({
	table,
	keyValue,
}: {
	table: MRT_TableInstance<TCalculaSt>;
	keyValue: keyof TCalculaSt;
}) {
	const myRows = table.getRowModel().rows.map(item => item.original);
	const result = myRows.reduce(
		(accumulator, currentValue) => accumulator + Number(currentValue[keyValue]),
		0,
	);

	return (
		<div className="w-full flex justify-center">
			{customFormat({
				valor: result,
				casas: 2,
				cifrao: false,
				porcentagem: false,
			})}
		</div>
	);
}
