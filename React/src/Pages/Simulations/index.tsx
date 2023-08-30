/* eslint-disable camelcase */
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FooterTotal } from '~/Components/FooterTotal';
import { StatusIcon } from '~/Components/StatusIcon';
import { useSimulations } from '~/Hooks/UseSimulations';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFooterTable } from '~/Model/TFooterTable';
import { customFormat } from '~/Utils/CustomFormat';

type TCell<T> = {
	row: {
		original: T;
	};
};
export function Simulations() {
	const { simulations } = useSimulations();
	const { translate, localizationMTR } = useTranslation();
	const columns = useMemo<MRT_ColumnDef<TCalculaSt>[]>(
		() => [
			{
				accessorKey: 'estadoOrigem.initials',
				header: 'De',
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
			},
			{
				accessorKey: 'estadoDestino.initials',
				header: 'Para',
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
			},
			{
				accessorKey: 'destinoMercadoria.name',
				header: 'Destino',
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
			},
			{
				accessorKey: 'tipoCalculo.name',
				header: 'Tipo',
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
			},
			{
				accessorKey: 'clienteContribuinte',
				header: 'Contribuinte',
				Cell: ({ row }: TCell<TCalculaSt>) => (
					<StatusIcon status={String(row.original.clienteContribuinte)} />
				),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
			},
			{
				accessorKey: 'simplesNacional',
				header: 'S. Nacional',
				Cell: ({ row }: TCell<TCalculaSt>) => (
					<StatusIcon status={String(row.original.simplesNacional)} />
				),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: () => <div className="w-full flex justify-center">Total</div>,
			},
			{
				accessorKey: 'baseDeCalculo',
				header: 'Base',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.baseDeCalculo,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="baseDeCalculo" />
				),
			},
			{
				accessorKey: 'icms',
				header: 'Icms',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.icms,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="icms" />
				),
			},
			{
				accessorKey: 'baseIcmsSt',
				header: 'B. ST',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.baseIcmsSt,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="baseIcmsSt" />
				),
			},
			{
				accessorKey: 'st',
				header: 'ST',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.st,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="st" />
				),
			},
			{
				accessorKey: 'total',
				header: 'Total',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.total,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="total" />
				),
			},
			{
				accessorKey: 'fecp',
				header: 'FECP',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.fecp,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="fecp" />
				),
			},
			{
				accessorKey: 'pis',
				header: 'Pis',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.pis,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="pis" />
				),
			},
			{
				accessorKey: 'cofins',
				header: 'Cofins',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.cofins,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="cofins" />
				),
			},
			{
				accessorKey: 'ipi',
				header: 'Ipi',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.ipi,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="ipi" />
				),
			},
			{
				accessorKey: 'totalGeral',
				header: 'Total Geral',
				Cell: ({ row }: TCell<TCalculaSt>) =>
					customFormat({
						valor: row.original.total,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					}),
				muiTableHeadCellProps: {
					align: 'center',
				},
				muiTableBodyCellProps: {
					align: 'center',
				},
				Footer: ({ table }: TFooterTable<TCalculaSt>) => (
					<FooterTotal table={table} keyValue="totalGeral" />
				),
			},
		],
		[],
	);

	return (
		<Grid container sx={{ padding: 2, gap: 4 }}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12} display="flex">
				<div className="flex-1">
					<Typography variant="h6">Simulações</Typography>
				</div>
				<div className="flex gap-4">
					<Link to="/simulation">
						<Button>{translate('CREATE')}</Button>
					</Link>
				</div>
			</Grid>

			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<MaterialReactTable
					columns={columns}
					data={simulations}
					initialState={{
						density: 'compact',
					}}
					displayColumnDefOptions={{
						'mrt-row-actions': {
							muiTableHeadCellProps: {
								align: 'center',
							},
						},
					}}
					enableRowActions
					renderRowActions={({ row }) => (
						<Link to={`/simulation/${row.original.id}`}>
							<IconButton>
								<VisibilityIcon />
							</IconButton>
						</Link>
					)}
					localization={localizationMTR}
				/>
			</Grid>
		</Grid>
	);
}
