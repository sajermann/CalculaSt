import { useState } from 'react';
import {
	Bar,
	BarChart,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';
import { SelectBrazilState } from '~/Components/SelectBrazilState';
import { useDataBase } from '~/Hooks/UseDataBase';
import { useSimulations } from '~/Hooks/UseSimulations';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { customFormat } from '~/Utils/CustomFormat';

export function Home() {
	const { simulations } = useSimulations();
	const { brazilStatesDataBase } = useDataBase();
	const [dataFiltred, setDataFiltred] = useState<TCalculaSt[]>([
		...simulations,
	]);

	const data = [
		{
			name: 'Base Calculo',
			value: dataFiltred.reduce(
				(accumulator, currentValue) =>
					accumulator + Number(currentValue.baseDeCalculo),
				0,
			),
		},
		{
			name: 'Icms',
			value: dataFiltred.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.icms),
				0,
			),
		},
		{
			name: 'B. ST',
			value: dataFiltred.reduce(
				(accumulator, currentValue) =>
					accumulator + Number(currentValue.baseDeCalculo),
				0,
			),
		},
		{
			name: 'ST',
			value: dataFiltred.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.st),
				0,
			),
		},
		{
			name: 'Total',
			value: dataFiltred.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.total),
				0,
			),
		},
		{
			name: 'Fecp',
			value: dataFiltred.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.fecp),
				0,
			),
		},
		{
			name: 'Pis',
			value: dataFiltred.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.pis),
				0,
			),
		},
		{
			name: 'Cofins',
			value: dataFiltred.reduce(
				(accumulator, currentValue) =>
					accumulator + Number(currentValue.cofins),
				0,
			),
		},
		{
			name: 'Ipi',
			value: dataFiltred.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.ipi),
				0,
			),
		},
		{
			name: 'Total Geral',
			value: dataFiltred.reduce(
				(accumulator, currentValue) =>
					accumulator + Number(currentValue.totalGeral),
				0,
			),
		},
	];
	return (
		<div className="flex w-full h-full flex-1 flex-col gap-4 p-4">
			<div>
				<SelectBrazilState
					states={brazilStatesDataBase}
					// value={calculaSt.estadoDestino}
					label="Estado"
					handleBrazilState={event => console.log({ event })}
				/>
			</div>
			<ResponsiveContainer width="100%" height="70%">
				<BarChart width={0} height={0} data={data}>
					<XAxis dataKey="name" stroke="#8884d8" />
					<YAxis />
					<Bar dataKey="value" fill="#8884d8">
						<LabelList
							dataKey="value"
							position="top"
							formatter={(e: number) =>
								customFormat({
									valor: e,
									casas: 2,
									cifrao: false,
									porcentagem: false,
								})
							}
						/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
