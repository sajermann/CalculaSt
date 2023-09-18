import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import { ChangeEvent, ReactElement, forwardRef, useEffect } from 'react';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TItem } from '~/Model/TItem';
import { TNcm } from '~/Model/TNcm';
import { customFormat } from '~/Utils/CustomFormat';
import { SelectionProducts } from '../SelectionProducts';

const Transition = forwardRef(
	(
		props: TransitionProps & {
			children: ReactElement;
		},
		ref: React.Ref<unknown>,
	) => <Slide direction="up" ref={ref} {...props} />,
);

type Props = {
	mode: 'create' | 'update';
	isOpen: boolean;
	onClose: (data: boolean) => void;
	onSave: () => void;

	isLoading: boolean;
	success: boolean;

	item: TItem;
	handleSelectNcm: (data: TNcm) => void;
	handleInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	deleteOptions?: {
		onDelete: () => void;
		isLoading: boolean;
		isSuccess: boolean;
	};
};

export function FormItem({
	mode,
	isOpen,
	onClose,
	onSave,
	isLoading,
	success,
	item,
	handleSelectNcm,
	handleInput,
	deleteOptions,
}: Props) {
	const { translate } = useTranslation();

	useEffect(() => {
		console.log({ isOpen });
	}, [isOpen]);

	return (
		<Dialog
			fullScreen
			open={isOpen}
			onClose={onClose}
			TransitionComponent={Transition}
		>
			<AppBar position="sticky">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton
						disabled={isLoading || deleteOptions?.isLoading}
						edge="start"
						color="inherit"
						onClick={() => onClose(false)}
						aria-label="close"
						size="large"
					>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6">
						{mode === 'update'
							? translate('UPDATE_ITEM')
							: translate('CREATE_ITEM')}
					</Typography>

					<Box sx={{ display: 'flex' }}>
						<Box sx={{ m: 1, position: 'relative' }}>
							<Fab
								data-testid="save-button"
								size="medium"
								aria-label="save"
								color="success"
								disabled={
									item.total < 0.01 || isLoading || deleteOptions?.isLoading
								}
								onClick={onSave}
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
						{deleteOptions && (
							<Box sx={{ m: 1, position: 'relative' }}>
								<Fab
									data-testid="delete-button"
									size="medium"
									aria-label="delete"
									color="error"
									disabled={
										item.total < 0.01 || isLoading || deleteOptions?.isLoading
									}
									onClick={deleteOptions.onDelete}
								>
									{deleteOptions?.isSuccess ? (
										<CheckIcon />
									) : (
										<DeleteForeverIcon />
									)}
								</Fab>
								{deleteOptions.isLoading && (
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
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Fade in={isOpen}>
				<Grid container spacing={3} sx={{ padding: 2 }}>
					<Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
						<FormControl fullWidth>
							<TextField
								variant="standard"
								fullWidth
								value={item.ncm.code}
								id="codigofamilia"
								type="text"
								label="N.C.M"
								InputProps={{
									autoComplete: 'off',
									autoFocus: true,
									endAdornment: (
										<SelectionProducts handleSelectNcm={handleSelectNcm} />
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
							name="description"
							onChange={handleInput}
							inputProps={{
								value: item.ncm.description,
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
						<TextField
							fullWidth
							variant="standard"
							id="TextFieldQuantidade"
							label="Quantidade"
							name="quantity"
							onChange={handleInput}
							type="number"
							InputProps={{
								value: item.quantity,
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
							name="price"
							onChange={handleInput}
							type="number"
							InputProps={{
								value: item.price,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.total,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.ipi,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.baseCalculo,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.icms,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.baseIcmsSt,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.st,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.pis,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.cofins,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.fecp,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.valorTotal,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.icmsPorcentagem,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.intraPorcentagem,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.mvaPorcentagem,
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
							inputProps={{
								disabled: true,
								value: customFormat({
									valor: item.acresc,
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
	);
}
