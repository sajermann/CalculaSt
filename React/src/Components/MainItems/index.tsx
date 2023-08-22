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
			},
			{
				accessorKey: 'quantity',
				header: 'Quant.',
			},
			{
				accessorKey: 'price',
				header: 'Preço',
			},
			{
				accessorKey: 'total',
				header: 'Total',
			},
			{
				accessorKey: 'ipi',
				header: 'IPI',
			},
			{
				accessorKey: 'st',
				header: 'ST',
			},
			{
				accessorKey: 'valorTotal',
				header: 'V. Total',
			},
			{
				accessorKey: 'acresc',
				header: 'Acrésc.',
			},
			{
				accessorKey: 'mvaPorcentagem',
				header: 'MVA',
			},
			{
				accessorKey: 'icmsPorcentagem',
				header: 'ICMS',
			},
			{
				accessorKey: 'intraPorcentagem',
				header: 'Intra',
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
