/* eslint-disable camelcase */
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { TNcm } from '~/Model/TNcm';
import { customFormat } from '~/Utils/CustomFormat';
import { AddItens } from '../AddItens';
import EditItens from '../EditItens';

type Props = {
	items: TItem[];
	isLoading?: boolean;

	calculaSt: TCalculaSt;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	ncmDataBase: TNcm[];
	fecpDataBase: TFecp[];
	handleEditItem: (data: TItem, mode: 'edit' | 'delete') => boolean;
	handleAddItem: (item: TItem) => void;
};
type TCell<T> = {
	row: {
		original: T;
	};
};
export function MainItems({
	items,
	isLoading,
	calculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	ncmDataBase,
	fecpDataBase,
	handleEditItem,
	handleAddItem,
}: Props) {
	const columns = useMemo<MRT_ColumnDef<TItem>[]>(
		() => [
			{
				accessorKey: 'ncm.description',
				header: 'Descrição',
				Cell: ({ row }: TCell<TItem>) => (
					<div className="max-w-sm truncate">
						{row.original.ncm.description as string}
					</div>
				),
			},
			{
				accessorKey: 'ncm.code',
				header: 'N.C.M',
				size: 130,
			},
			{
				accessorKey: 'quantity',
				header: 'Quant.',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.quantity,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				size: 100,
			},
			{
				accessorKey: 'price',
				header: 'Preço',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.price,
						casas: 4,
						cifrao: true,
						porcentagem: false,
					}),
				size: 100,
			},
			{
				accessorKey: 'total',
				header: 'Total',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.total,
						casas: 2,
						cifrao: true,
						porcentagem: false,
					}),
				size: 120,
			},
			{
				accessorKey: 'ipi',
				header: 'IPI',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.ipi,
						casas: 2,
						cifrao: true,
						porcentagem: false,
					}),
				size: 120,
			},
			{
				accessorKey: 'st',
				header: 'ST',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.st,
						casas: 2,
						cifrao: true,
						porcentagem: false,
					}),
				size: 120,
			},
			{
				accessorKey: 'valorTotal',
				header: 'V. Total',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.valorTotal,
						casas: 2,
						cifrao: true,
						porcentagem: false,
					}),
				size: 120,
			},
			{
				accessorKey: 'acresc',
				header: 'Acrésc.',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.acresc,
						casas: 2,
						porcentagem: true,
						cifrao: false,
					}),
				size: 20,
			},
			{
				accessorKey: 'mvaPorcentagem',
				header: 'MVA',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.mvaPorcentagem,
						casas: 2,
						porcentagem: true,
						cifrao: false,
					}),
				size: 20,
			},
			{
				accessorKey: 'icmsPorcentagem',
				header: 'ICMS',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.icmsPorcentagem,
						casas: 0,
						porcentagem: true,
						cifrao: false,
					}),
				size: 20,
			},
			{
				accessorKey: 'intraPorcentagem',
				header: 'Intra',
				Cell: ({ row }: TCell<TItem>) =>
					customFormat({
						valor: row.original.intraPorcentagem,
						casas: 1,
						porcentagem: true,
						cifrao: false,
					}),
				size: 20,
			},
		],
		[],
	);

	return (
		<MaterialReactTable
			getRowId={row => row.id}
			enablePagination={false}
			columns={columns}
			data={items}
			initialState={{
				density: 'compact',
				isLoading,
			}}
			displayColumnDefOptions={{
				'mrt-row-actions': {
					muiTableHeadCellProps: {
						align: 'center', // change head cell props
					},
				},
			}}
			enableRowActions
			renderRowActions={({ row }) => (
				<EditItens
					calculaSt={calculaSt}
					icmsDataBase={icmsDataBase}
					ipiDataBase={ipiDataBase}
					mvaDataBase={mvaDataBase}
					ncmDataBase={ncmDataBase}
					fecpDataBase={fecpDataBase}
					handleEditItem={handleEditItem}
					itemForEditId={row.id}
				/>
			)}
			renderTopToolbarCustomActions={() => (
				<AddItens
					calculaSt={calculaSt}
					icmsDataBase={icmsDataBase}
					ipiDataBase={ipiDataBase}
					mvaDataBase={mvaDataBase}
					ncmDataBase={ncmDataBase}
					fecpDataBase={fecpDataBase}
					handleAddItem={handleAddItem}
				/>
			)}
		/>
	);
}
