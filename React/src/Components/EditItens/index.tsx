/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions';
import SelectionProducts from '../SelectionProducts';
import customFormat from '../../../../Utils/customFormat';
import CalculoSt from '../../../../Models/CalculoSt';
import Icms from '../../../../Models/Icms';
import Ipi from '../../../../Models/Ipi';
import Fecp from '../../../../Models/Fecp';
import Mva from '../../../../Models/Mva';
import Ncm from '../../../../Models/Ncm';
import Item from '../../../../Models/Item';
import { itemDefault } from '../../../../Utils/defaultsValues';
import recalcItem from '../utils/recalcItem';

const Transition = forwardRef(
	// eslint-disable-next-line react/require-default-props
	(props: TransitionProps & { children?: ReactElement }, ref: Ref<unknown>) => (
		<Slide direction="up" ref={ref} {...props} />
	)
);

type Props = {
	calculoSt: CalculoSt;
	dataBaseIcms: Icms[];
	dataBaseIpis: Ipi[];
	dataBaseMvas: Mva[];
	dataBaseNcms: Ncm[];
	dataBaseFecps: Fecp[];
	handleEditItem: (data: Item, mode: 'edit' | 'delete') => boolean;
	itemForEditId: string;
};

export default function EditItens({
	calculoSt,
	dataBaseIcms,
	dataBaseIpis,
	dataBaseMvas,
	dataBaseNcms,
	dataBaseFecps,
	handleEditItem,
	itemForEditId,
}: Props) {
	const useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1,
			background: 'black',
		},
		wrapper: {
			margin: theme.spacing(1),
			position: 'relative',
		},
		header: {
			borderBottom: '1px solid',
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper2: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		buttonAdd: {
			position: 'fixed',
			bottom: 15,
			right: 15,
		},
		buttonAdd1: {
			margin: '0px 10px',
		},
		appBar: {
			position: 'sticky',
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
		buttonTeste: {
			background: '#4caf50',
			borderRadius: 3,
			border: 0,
			color: 'white',
			height: 42,
			padding: '0 30px',
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			margin: '0px 10px',
			'&:hover': {
				opacity: 0.9,
				background: '#4caf50',
			},
		},
		label: {},
		buttonSave: {
			background: '#4caf50',
			color: 'white',
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			'&:hover': {
				opacity: 0.9,
				background: '#4caf50',
			},
		},
		buttonSuccess: {
			backgroundColor: green[500],
			'&:hover': {
				backgroundColor: green[700],
			},
		},
		fabProgress: {
			color: green[500],
			position: 'absolute',
			top: -6,
			left: -6,
			zIndex: 1,
		},
		container: {
			padding: 10,
			margin: 10,
		},
		margin: {
			margin: theme.spacing(1),
		},
		withoutLabel: {
			marginTop: theme.spacing(3),
		},
		textField: {
			// width: '25ch',
		},
		input: {},
		inputSimilar: {},
		fundo: {},
		buttonDelete: {
			background: '#F50057',
			color: 'white',
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			'&:hover': {
				opacity: 0.9,
				background: '#F50057',
			},
		},
		buttonSuccessDelete: {
			backgroundColor: '#F50057',
			'&:hover': {
				backgroundColor: '#F50057',
			},
		},
		fabProgressDelete: {
			color: red[500],
			position: 'absolute',
			top: -6,
			left: -6,
			zIndex: 1,
		},
	}));
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [itemForEdit, setItemForEdit] = useState<Item>(itemDefault);
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [successDelete, setSuccessDelete] = useState(false);

	useEffect(() => {
		const itemSearch = calculoSt.itens.find(item => item.id === itemForEditId);
		if (!itemSearch) {
			return;
		}
		setItemForEdit(itemSearch);
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
		if (!loadingDelete) {
			setSuccessDelete(false);
			setLoadingDelete(true);
			setTimeout(() => {
				setSuccessDelete(true);
				setLoadingDelete(false);
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

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
	});

	const buttonClassnameDelete = clsx({
		[classes.buttonSuccessDelete]: successDelete,
	});

	function calcItem(item: Item) {
		const itemEditing = recalcItem({
			calculoSt,
			item,
			dataBaseIcms,
			dataBaseIpis,
			dataBaseMvas,
			dataBaseFecps,
		});
		setItemForEdit(itemEditing);
	}

	function handleSelectNcm(data: Ncm) {
		const itemEditing = { ...itemForEdit };
		itemEditing.ncm = { ...data };
		setItemForEdit(itemEditing);
	}
	function handleInput(e) {
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

	return (
		<div>
			<IconButton
				aria-label="delete"
				className={classes.margin}
				onClick={handleOpen}
			>
				<VisibilityIcon fontSize="small" />
			</IconButton>

			<Dialog
				className={classes.fundo}
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							disabled={isLoading || loadingDelete}
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Editar Item
						</Typography>

						<div className={classes.wrapper}>
							<Fab
								aria-label="save"
								color="primary"
								disabled={!(itemForEdit.total > 0.01) || loadingDelete}
								className={buttonClassname}
								onClick={handleEditAndConfirm}
								classes={{
									root: classes.buttonSave,
								}}
							>
								{success ? <CheckIcon /> : <SaveIcon />}
							</Fab>
							{isLoading && (
								<CircularProgress size={68} className={classes.fabProgress} />
							)}
						</div>
						<div className={classes.wrapper}>
							<Fab
								aria-label="delete"
								color="primary"
								disabled={!(itemForEdit.total > 0.01) || isLoading}
								className={buttonClassnameDelete}
								onClick={handleDeleteAndConfirm}
								classes={{
									root: classes.buttonDelete,
								}}
							>
								{successDelete ? <CheckIcon /> : <DeleteForeverIcon />}
							</Fab>
							{loadingDelete && (
								<CircularProgress
									size={68}
									className={classes.fabProgressDelete}
								/>
							)}
						</div>
					</Toolbar>
				</AppBar>
				<Fade in={open}>
					<div className={classes.container}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
								<FormControl fullWidth className={classes.input}>
									<InputLabel htmlFor="codigofamilia">N.C.M</InputLabel>
									<Input
										fullWidth
										value={itemForEdit.ncm.code}
										id="codigofamilia"
										type="text"
										inputProps={{
											autoComplete: 'off',
											autoFocus: true,
										}}
										endAdornment={
											<SelectionProducts
												handleSelectNcm={handleSelectNcm}
												dataBaseNcms={dataBaseNcms}
											/>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
								<TextField
									fullWidth
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
									className={classes.input}
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
					</div>
				</Fade>
			</Dialog>
		</div>
	);
}
