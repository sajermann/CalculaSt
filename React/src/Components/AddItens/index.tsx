import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
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
import clsx from 'clsx';
import { ChangeEvent, forwardRef, useState } from 'react';
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
	handleAddItem: (data: TItem) => void;
	position: 'right' | 'center';
};

export function AddItens({
	calculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	ncmDataBase,
	fecpDataBase,
	handleAddItem,
	position,
}: Props) {
	const [open, setOpen] = useState(false);
	const [itemForAdd, setItemForAdd] = useState<TItem>(CONST.DEFAULT.ITEM);
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	function handleResetInfos() {
		setItemForAdd(CONST.DEFAULT.ITEM);
	}

	function addAndConfirm() {
		if (!isLoading) {
			setSuccess(false);
			setLoading(true);
			setTimeout(() => {
				setSuccess(true);
				setLoading(false);
				setTimeout(() => {
					handleAddItem(itemForAdd);
					setSuccess(false);
					handleResetInfos();
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

	const buttonClassname = clsx({
		'[classes.buttonSuccess]': success,
	});

	function calcItem(item: TItem) {
		const itemEditing = reCalcItem({
			calculaSt,
			item,
			icmsDataBase,
			mvaDataBase,
			ipiDataBase,
			fecpDataBase,
		});
		setItemForAdd(itemEditing);
	}

	function handleSelectNcm(data: TNcm) {
		const itemEditing = { ...itemForAdd };
		itemEditing.ncm = { ...data };
		setItemForAdd(itemEditing);
	}
	function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { value } = e.target;
		const { name } = e.target;
		const itemEditing = { ...itemForAdd };
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
		setItemForAdd(itemEditing);
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

	return (
		<div
			className={
				position === 'center'
					? 'classes.buttonAddInCenter'
					: 'classes.buttonAddInRight'
			}
		>
			<Fab
				color="primary"
				aria-label="add"
				disabled={
					!calculaSt.destinoMercadoria ||
					!calculaSt.estadoDestino ||
					!calculaSt.destinoMercadoria.name ||
					!calculaSt.estadoDestino.initials
				}
				onClick={handleOpen}
			>
				<AddIcon />
			</Fab>

			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar position="sticky">
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton
							disabled={isLoading}
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							size="large"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6">Incluir Item</Typography>

						<Box sx={{ m: 1, position: 'relative' }}>
							<Fab
								size="medium"
								aria-label="save"
								color="primary"
								disabled={!(itemForAdd.total > 0.01) || isLoading}
								className={buttonClassname}
								onClick={addAndConfirm}
								sx={buttonSx}
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
					</Toolbar>
				</AppBar>
				<Fade in={open}>
					<Grid container spacing={3} sx={{ padding: 2 }}>
						<Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
							<FormControl fullWidth>
								<TextField
									fullWidth
									value={itemForAdd.ncm.code}
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
								id="TextFieldDescricao"
								label="Descrição do Ncm"
								defaultValue=""
								name="description"
								onChange={handleInput}
								inputProps={{
									value: itemForAdd.ncm.description,
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
							<TextField
								fullWidth
								id="TextFieldQuantidade"
								label="Quantidade"
								defaultValue=""
								name="quantity"
								onChange={handleInput}
								type="number"
								InputProps={{
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
								id="TextFieldPreco"
								label="Preço"
								defaultValue=""
								name="price"
								onChange={handleInput}
								type="number"
								InputProps={{
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
								label="Total sem Impostos"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.total,
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
								label="Ipi"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.ipi,
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
								label="Base de Cálculo"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.baseCalculo,
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
								label="Icms"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.icms,
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
								label="Base Icms ST"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.baseIcmsSt,
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
								label="Substituição Tributária"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.st,
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
								label="Pis"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.pis,
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
								label="Cofins"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.cofins,
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
								label="Fecp"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.fecp,
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
								label="Total com Impostos"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.valorTotal,
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
								label="Porcentagem Icms"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.icmsPorcentagem,
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
								label="Alíquota Interestadual"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.intraPorcentagem,
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
								label="Margem de Valor Agregado"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.mvaPorcentagem,
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
								label="Acréscimo"
								defaultValue=""
								inputProps={{
									disabled: true,
									value: customFormat({
										valor: itemForAdd.acresc,
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
