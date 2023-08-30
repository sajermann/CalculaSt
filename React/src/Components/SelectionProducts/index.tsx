/* eslint-disable camelcase */
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import {
	AppBar,
	Dialog,
	Fade,
	IconButton,
	InputAdornment,
	Slide,
	Toolbar,
	Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
	MRT_ColumnDef,
	MRT_RowSelectionState,
	MaterialReactTable,
} from 'material-react-table';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TNcm } from '~/Model/TNcm';

const Transition = forwardRef(
	(
		props: TransitionProps & {
			children: JSX.Element;
		},
		ref: React.Ref<unknown>,
	) => <Slide direction="up" ref={ref} {...props} />,
);

type Props = {
	ncmDataBase: TNcm[];
	handleSelectNcm: (data: TNcm) => void;
};
export function SelectionProducts({ handleSelectNcm, ncmDataBase }: Props) {
	const [isFirstUseEffect, setIsFirstUseEffect] = useState(true);
	const [products] = useState<TNcm[]>(ncmDataBase);
	const [open, setOpen] = useState(false);
	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
	const { localizationMTR } = useTranslation();

	useEffect(() => {
		if (isFirstUseEffect) {
			setIsFirstUseEffect(false);
			return;
		}
		const indexItem = Object.getOwnPropertyNames(rowSelection)[0];
		handleSelectNcm(
			!indexItem
				? { code: '', description: '', id: '' }
				: products[Number(indexItem)],
		);
		setOpen(false);
	}, [rowSelection]);

	const columns = useMemo<MRT_ColumnDef<TNcm>[]>(
		() => [
			{
				accessorKey: 'code',
				header: 'N.C.M',
				width: 110,
			},
			{
				accessorKey: 'description',
				header: 'Descrição',
			},
		],
		[],
	);

	return (
		<>
			<InputAdornment position="end">
				<IconButton aria-label="search ncm" onClick={() => setOpen(true)}>
					<SearchIcon />
				</IconButton>
			</InputAdornment>

			<Dialog
				fullScreen
				open={open}
				onClose={() => setOpen(false)}
				TransitionComponent={Transition}
			>
				<AppBar position="sticky">
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setOpen(false)}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className="flex-1 text-center">
							Selecionar Produtos
						</Typography>
					</Toolbar>
				</AppBar>
				<Fade in={open}>
					<div>
						<MaterialReactTable
							columns={columns}
							data={products}
							enableMultiRowSelection={false}
							enableRowSelection
							muiTableBodyRowProps={({ row }) => ({
								onClick: row.getToggleSelectedHandler(),
								sx: { cursor: 'pointer' },
							})}
							onRowSelectionChange={setRowSelection}
							state={{ rowSelection }}
							initialState={{
								density: 'compact',
							}}
							localization={localizationMTR}
						/>
					</div>
				</Fade>
			</Dialog>
		</>
	);
}
