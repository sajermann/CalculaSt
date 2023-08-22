import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	AppBar,
	Box,
	CircularProgress,
	Dialog,
	Fab,
	Fade,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { TransitionProps } from '@mui/material/transitions';
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { CONST } from '~/Constants';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { TNcm } from '~/Model/TNcm';
import { customFormat } from '~/Utils/CustomFormat';
import { reCalcItem } from '~/Utils/ReCalcItem';
import { SelectionProducts } from '../SelectionProducts';

const Transition = forwardRef(
	(
		props: TransitionProps & {
			children: JSX.Element;
		},
		ref: React.Ref<unknown>,
	) => <Slide direction="up" ref={ref} {...props} />,
);

type Props = {
	calculaSt: TCalculaSt;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	ncmDataBase: TNcm[];
	fecpDataBase: TFecp[];
	handleEditItem: (data: TItem, mode: 'edit' | 'delete') => boolean;
	itemForEditId: string;
};

export default function EditItens({
	calculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	ncmDataBase,
	fecpDataBase,
	handleEditItem,
	itemForEditId,
}: Props) {
	const [open, setOpen] = useState(false);
	const [itemForEdit, setItemForEdit] = useState<TItem>(CONST.DEFAULT.ITEM);
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [successDelete, setSuccessDelete] = useState(false);

	useEffect(() => {
		const itemSearch = calculaSt.itens.find(item => item.id === itemForEditId);
		if (!itemSearch) {
			return;
		}
		setItemForEdit({ ...itemSearch });
	}, [itemForEditId]);

	function handleEditAndConfirm() {
		if (isLoading) return;
		setSuccess(false);
		setLoading(true);

		setTimeout(() => {
			setSuccess(true);
			setLoading(false);
			setTimeout(() => {
				handleEditItem(itemForEdit, 'edit');
				setSuccess(false);
				setOpen(false);
			}, 500);
		}, 2000);
	}
	function handleDeleteAndConfirm() {
		if (!isLoadingDelete) {
			setSuccessDelete(false);
			setIsLoadingDelete(true);
			setTimeout(() => {
				setSuccessDelete(true);
				setIsLoadingDelete(false);
				setTimeout(() => {
					handleEditItem(itemForEdit, 'delete');
					setSuccessDelete(false);
					setOpen(false);
				}, 500);
			}, 2000);
		}
	}

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function calcItem(item: TItem) {
		const itemEditing = reCalcItem({
			calculaSt,
			item,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			fecpDataBase,
		});
		setItemForEdit(itemEditing);
	}

	function handleSelectNcm(data: TNcm) {
		const itemEditing = { ...itemForEdit };
		itemEditing.ncm = { ...data };
		setItemForEdit({ ...itemEditing });
	}
	function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { value } = e.target;
		const { name } = e.target;
		const itemEditing = { ...itemForEdit };
		switch (name) {
			case 'quantity':
				itemEditing.quantity = parseFloat(value) || 0;
				break;
			case 'price':
				itemEditing.price = parseFloat(value) || 0;
				break;
			case 'description':
				itemEditing.ncm.description = value;
				break;
			default:
				console.log('Nothing');
		}
		itemEditing.total = itemEditing.price * itemEditing.quantity;
		setItemForEdit(itemEditing);
		calcItem(itemEditing);
	}

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	const buttonSxDelete = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	return (
		<div className="flex justify-center">
			<IconButton aria-label="delete" onClick={handleOpen}>
				<VisibilityIcon fontSize="small" />
			</IconButton>

			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar position="sticky">
					<Toolbar>
						<IconButton
							disabled={isLoading || isLoadingDelete}
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6">Editar Item</Typography>

						<Box sx={{ m: 1, position: 'relative' }}>
							<Fab
								aria-label="save"
								color="primary"
								disabled={!(itemForEdit.total > 0.01) || isLoadingDelete}
								sx={buttonSx}
								onClick={handleEditAndConfirm}
							>
								{success ? <CheckIcon /> : <SaveIcon />}
							</Fab>
							{isLoading && (
								<CircularProgress
									size={61}
									sx={{
										color: green[500],
										position: 'absolute',
										top: -6,
										left: -6,
										zIndex: 1,
									}}
								/>
							)}
						</Box>
						<Box sx={{ m: 1, position: 'relative' }}>
							<Fab
								aria-label="delete"
								color="primary"
								disabled={!(itemForEdit.total > 0.01) || isLoading}
								onClick={handleDeleteAndConfirm}
								sx={buttonSxDelete}
							>
								{successDelete ? <CheckIcon /> : <DeleteForeverIcon />}
							</Fab>
							{isLoadingDelete && (
								<CircularProgress
									size={61}
									sx={{
										color: green[500],
										position: 'absolute',
										top: -6,
										left: -6,
										zIndex: 1,
									}}
								/>
							)}
						</Box>
					</Toolbar>
				</AppBar>
				<Fade in={open}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
							<FormControl fullWidth>
								<TextField
									variant="standard"
									fullWidth
									value={itemForEdit.ncm.code}
									id="codigofamilia"
									type="text"
									label="N.C.M"
									InputProps={{
										autoComplete: 'off',
										autoFocus: true,
										endAdornment: (
											<SelectionProducts
												handleSelectNcm={handleSelectNcm}
												ncmDataBase={ncmDataBase}
											/>
										),
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
								fullWidth
								variant="standard"
								id="TextFieldDescricao"
								label="Descrição do Ncm"
								defaultValue=""
								name="description"
								onChange={handleInput}
								inputProps={{
									value: itemForEdit.ncm.description,
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								id="TextFieldQuantidade"
								label="Quantidade"
								defaultValue=""
								name="quantity"
								onChange={handleInput}
								type="number"
								InputProps={{
									value: itemForEdit.quantity,
									autoComplete: 'off',
									endAdornment: (
										<InputAdornment position="end">MT / KG</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								id="TextFieldPreco"
								label="Preço"
								defaultValue=""
								name="price"
								onChange={handleInput}
								type="number"
								InputProps={{
									value: itemForEdit.price,
									autoComplete: 'off',
									endAdornment: (
										<InputAdornment position="end">R$</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Total sem Impostos"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.total,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Ipi"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.ipi,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Base de Cálculo"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.baseCalculo,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Icms"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.icms,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Base Icms ST"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.baseIcmsSt,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Substituição Tributária"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.st,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Pis"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.pis,
										casas: 2,
										cifrao: false,
										porcentagem: true,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Cofins"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.cofins,
										casas: 2,
										cifrao: false,
										porcentagem: true,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Fecp"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.fecp,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Total com Impostos"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.valorTotal,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Porcentagem Icms"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.icmsPorcentagem,
										casas: 2,
										cifrao: false,
										porcentagem: true,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Alíquota Interestadual"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.intraPorcentagem,
										casas: 2,
										cifrao: false,
										porcentagem: true,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Margem de Valor Agregado"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.mvaPorcentagem,
										casas: 2,
										cifrao: false,
										porcentagem: true,
									}),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<TextField
								fullWidth
								variant="standard"
								label="Acréscimo"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForEdit.acresc,
										casas: 2,
										cifrao: false,
										porcentagem: true,
									}),
								}}
							/>
						</Grid>
					</Grid>
				</Fade>
			</Dialog>
		</div>
	);
}
