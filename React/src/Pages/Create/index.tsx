import { Grid, Hidden, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddItens } from '~/Components/AddItens';
import { MoreOptions } from '~/Components/MoreOptions';
import { SelectBrazilState } from '~/Components/SelectBrazilState';
import { SelectDestinationProduct } from '~/Components/SelectDestinationProduct';
import { SelectTrueOrFalse } from '~/Components/SelectTrueOrFalse';
import { SelectTypeCalc } from '~/Components/SelectTypeCalc';
import { CONST } from '~/Constants';
import { useDataBase } from '~/Hooks/UseDataBase';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TBrazilState } from '~/Model/TBrazilState';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TDestinationProduct } from '~/Model/TDestinationProduct';
import { TItem } from '~/Model/TItem';
import { TTypeCalc } from '~/Model/TTypeCalc';
import { customFormat } from '~/Utils/CustomFormat';
import Guid from '~/Utils/GenerateGuid';
import { obsCalc } from '~/Utils/ObsCalc';
import { reCalcAll } from '~/Utils/ReCalcAll';
import { reCalcHeader } from '~/Utils/ReCalcHeader';

export default function Create() {
	const { translate } = useTranslation();
	const { BRAZIL_STATES_DB, FECP_DB, ICMS_DB, IPI_DB, MVA_DB, OBS_DB, NCM_DB } =
		useDataBase();
	const [calculaSt, setCalculaSt] = useState<TCalculaSt>(
		CONST.DEFAULT.CALCULA_ST,
	);

	useEffect(() => {
		setCalculaSt(prev => ({
			...prev,
			estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
		}));
	}, []);

	function mustDisabled(dataForVerify: string): boolean {
		if (dataForVerify === 'DestinoMercadoria') {
			if (calculaSt.estadoDestino && calculaSt.estadoDestino.initials === 'SP')
				return true;
		}
		if (dataForVerify === 'TipoCalculo') {
			if (
				(calculaSt.destinoMercadoria?.name === 'Consumo' &&
					!calculaSt.clienteContribuinte) ||
				calculaSt.destinoMercadoria?.name === 'Revenda'
			)
				return true;
		}
		if (dataForVerify === 'ClienteContribuinte') {
			if (calculaSt.destinoMercadoria?.name === 'Revenda') return true;
		}

		if (dataForVerify === 'SimplesNacional') {
			if (calculaSt.destinoMercadoria?.name === 'Consumo') return true;
		}

		if (dataForVerify === 'SimplesNacional') {
			if (
				calculaSt.destinoMercadoria?.name === 'Consumo' ||
				calculaSt.estadoDestino?.initials === 'SP'
			)
				return true;
		}

		return false;
	}

	function handleBrazilStateOrigin(e: TBrazilState | null) {
		const calc = { ...calculaSt };
		calc.estadoOrigem = e;

		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase: IPI_DB,
			mvaDataBase: MVA_DB,
			obsDataBase: OBS_DB,
			setCalculaSt,
		});
	}

	function handleBrazilStateDestiny(e: TBrazilState | null) {
		const calc = { ...calculaSt };
		calc.estadoDestino = e;

		if (e?.initials === 'SP') {
			calc.destinoMercadoria = { id: '2', name: 'Revenda' };
			calc.clienteContribuinte = true;
			calc.tipoCalculo = { id: '4', name: 'Não Aplicado' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase: IPI_DB,
			mvaDataBase: MVA_DB,
			obsDataBase: OBS_DB,
			setCalculaSt,
		});
	}

	function handleDestinationProduct(event: TDestinationProduct | null) {
		console.log({ event });
		if (!event) return;
		const calc = { ...calculaSt };
		calc.destinoMercadoria = { ...event };
		if (event.name === 'Consumo') {
			calc.simplesNacional = false;
		}
		if (event.name === 'Revenda') {
			calc.clienteContribuinte = true;
			calc.tipoCalculo = { id: '4', name: 'Não Aplicado' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase: IPI_DB,
			mvaDataBase: MVA_DB,
			obsDataBase: OBS_DB,
			setCalculaSt,
		});
	}

	function handleTypeCalc(e: TTypeCalc | null) {
		const calc = { ...calculaSt };
		calc.tipoCalculo = e;
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase: IPI_DB,
			mvaDataBase: MVA_DB,
			obsDataBase: OBS_DB,
			setCalculaSt,
		});
	}

	function handleClienteContribuinte(data: boolean) {
		const calc = { ...calculaSt };
		calc.clienteContribuinte = data;
		if (!data) {
			calc.destinoMercadoria = { id: '1', name: 'Consumo' };
			calc.tipoCalculo = { id: '4', name: 'Não Aplicado' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase: IPI_DB,
			mvaDataBase: MVA_DB,
			obsDataBase: OBS_DB,
			setCalculaSt,
		});
	}

	function handleSimplesNacional(data: boolean) {
		const calc = { ...calculaSt };
		calc.simplesNacional = data;
		if (!data) {
			calc.destinoMercadoria = { id: '2', name: 'Revenda' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase: IPI_DB,
			mvaDataBase: MVA_DB,
			obsDataBase: OBS_DB,
			setCalculaSt,
		});
	}

	function handleAddItem(item: TItem) {
		const itemForAdd = { ...item };
		itemForAdd.id = Guid.new();
		const calculaStEditing = { ...calculaSt };
		calculaStEditing.itens.push(itemForAdd);
		calculaStEditing.obs = obsCalc({
			calculaSt: calculaStEditing,
			obsDataBase: OBS_DB,
		});
		reCalcHeader({
			calculaStForRecalc: calculaStEditing,
			setCalculaSt,
		});
	}

	// function handleEditItem(itemForEdit: Item, mode: 'edit' | 'delete'): boolean {
	// 	const calculaStEditing = { ...calculoSt };
	// 	const itemsForKeep = calculaStEditing.itens.filter(
	// 		itemHere => itemHere.id !== itemForEdit.id,
	// 	);
	// 	if (mode === 'edit')
	// 		calculaStEditing.itens = [...itemsForKeep, itemForEdit];
	// 	if (mode === 'delete') calculaStEditing.itens = [...itemsForKeep];
	// 	calculaStEditing.obs = obsCalc(calculaStEditing);
	// 	return recalcHeader(calculaStEditing);
	// }

	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
					<SelectBrazilState
						states={[...BRAZIL_STATES_DB]}
						label={translate('FROM')}
						handleBrazilState={handleBrazilStateOrigin}
						value={calculaSt.estadoOrigem}
						disabled
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
					<SelectBrazilState
						states={[...BRAZIL_STATES_DB]}
						value={calculaSt.estadoDestino}
						label={translate('TO')}
						handleBrazilState={handleBrazilStateDestiny}
						disabled={false}
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
					<SelectDestinationProduct
						handleDestinationProduct={handleDestinationProduct}
						value={calculaSt.destinoMercadoria}
						disabled={mustDisabled('DestinoMercadoria')}
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
					<SelectTypeCalc
						handleTypeCalc={handleTypeCalc}
						value={calculaSt.tipoCalculo}
						disabled={mustDisabled('TipoCalculo')}
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
					<SelectTrueOrFalse
						disabled={mustDisabled('ClienteContribuinte')}
						value={calculaSt.clienteContribuinte}
						handleTrueOrFalse={handleClienteContribuinte}
						label="Cliente Contribuinte"
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
					<SelectTrueOrFalse
						disabled={mustDisabled('SimplesNacional')}
						handleTrueOrFalse={handleSimplesNacional}
						label="Simples Nacional"
						value={calculaSt.simplesNacional}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={1}>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<div>Base de Cál</div>
					<div>
						{customFormat({
							valor: calculaSt.baseDeCalculo,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<div>Icms</div>
					<div>
						{customFormat({
							valor: calculaSt.icms,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
					<div>Base Icms ST</div>
					<div>
						{customFormat({
							valor: calculaSt.baseIcmsSt,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<div>St</div>
					<div>
						{customFormat({
							valor: calculaSt.st,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
					<div>Total</div>
					<div>
						{customFormat({
							valor: calculaSt.total,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Hidden only={['sm', 'md']}>
					<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
						<div>Fecp</div>
						<div>
							{customFormat({
								valor: calculaSt.fecp,
								casas: 2,
								cifrao: false,
								porcentagem: false,
							})}
						</div>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<div>Pis</div>
					<div>
						{customFormat({
							valor: calculaSt.pis,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
					<div>Cofins</div>
					<div>
						{customFormat({
							valor: calculaSt.cofins,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<div>Ipi</div>
					<div>
						{customFormat({
							valor: calculaSt.ipi,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
					<div>Total Geral</div>
					<div>
						{customFormat({
							valor: calculaSt.totalGeral,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
				{calculaSt.obs.length > 0 && (
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<div>OBS</div>
						<div>{calculaSt.obs}</div>
					</Grid>
				)}
			</Grid>

			{calculaSt.itens.length > 0 && (
				<Grid container>
					<AddItens
						calculaSt={calculaSt}
						fecpDataBase={FECP_DB}
						icmsDataBase={ICMS_DB}
						ipiDataBase={IPI_DB}
						mvaDataBase={MVA_DB}
						ncmDataBase={NCM_DB}
						handleAddItem={handleAddItem}
						position="right"
					/>

					<MoreOptions />

					<Grid container>
						<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
							<div>Ação</div>
						</Grid>
						<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
							<div>Descrição</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>N.C.M.</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>Quant.</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>Preço</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>Total</div>
							</Grid>
						</Grid>
					</Hidden>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>Ipi</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>ST</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={3} sm={3} md={1} lg={1} xl={1}>
							<div>V. Total</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>Acrésc.</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>MVA</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>ICMS</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>Intra</div>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
			)}

			{calculaSt.itens.map(item => (
				<Grid container>
					<Grid container>
						<Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
							<div>
								{/* <EditItens
									calculaSt={calculaSt}
									dataBaseIcms={databaseIcms}
									dataBaseIpis={databaseIpi}
									dataBaseMvas={databaseMva}
									dataBaseNcms={databaseNcm}
									dataBaseFecps={databaseFecp}
									handleEditItem={handleEditItem}
									itemForEditId={item.id}
								/> */}
							</div>
						</Grid>
						<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{item.ncm.description}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{item.ncm.code}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.quantity,
											casas: 2,
											cifrao: false,
											porcentagem: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.price,
											casas: 4,
											cifrao: true,
											porcentagem: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.total,
											casas: 2,
											cifrao: true,
											porcentagem: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{customFormat({
										valor: item.ipi,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									})}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{customFormat({
										valor: item.st,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									})}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={3} sm={3} md={1} lg={1} xl={1}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{customFormat({
										valor: item.valorTotal,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									})}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.acresc,
											casas: 2,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.mvaPorcentagem,
											casas: 2,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.icmsPorcentagem,
											casas: 0,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.intraPorcentagem,
											casas: 1,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
			))}
			{calculaSt.itens.length === 0 && (
				<Grid container direction="column">
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<div>
							Clique no ícone
							<AddItens
								calculaSt={calculaSt}
								fecpDataBase={FECP_DB}
								icmsDataBase={ICMS_DB}
								ipiDataBase={IPI_DB}
								mvaDataBase={MVA_DB}
								ncmDataBase={NCM_DB}
								handleAddItem={handleAddItem}
								position="center"
							/>
							para adicionar items
						</div>
					</Grid>
				</Grid>
			)}

			{JSON.stringify({ calculaSt })}
		</div>
	);
}
