/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { HeaderConfiguration } from '~/Components/HeaderConfiguration';
import { HeaderInformation } from '~/Components/HeaderInformation';
import { MainItems } from '~/Components/MainItems';
import { CONST } from '~/Constants';
import { useDataBase } from '~/Hooks/UseDataBase';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TItem } from '~/Model/TItem';
import Guid from '~/Utils/GenerateGuid';
import { obsCalc } from '~/Utils/ObsCalc';
import { reCalcHeader } from '~/Utils/ReCalcHeader';

export default function Create() {
	const { FECP_DB, ICMS_DB, IPI_DB, MVA_DB, OBS_DB, NCM_DB } = useDataBase();
	const [calculaSt, setCalculaSt] = useState<TCalculaSt>(
		CONST.DEFAULT.CALCULA_ST,
	);

	useEffect(() => {
		setCalculaSt(prev => ({
			...prev,
			estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
		}));
	}, []);

	async function handleAddItem(item: TItem) {
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

	function handleEditItem(
		itemForEdit: TItem,
		mode: 'edit' | 'delete',
	): boolean {
		const calculaStEditing = { ...calculaSt };
		const itemsForKeep = calculaStEditing.itens.filter(
			itemHere => itemHere.id !== itemForEdit.id,
		);
		if (mode === 'edit')
			calculaStEditing.itens = [...itemsForKeep, itemForEdit];
		if (mode === 'delete') calculaStEditing.itens = [...itemsForKeep];
		calculaStEditing.obs = obsCalc({
			calculaSt: calculaStEditing,
			obsDataBase: OBS_DB,
		});
		return reCalcHeader({
			calculaStForRecalc: calculaStEditing,
			setCalculaSt,
		});
	}

	return (
		<div className="border flex flex-col gap-4 p-5">
			<HeaderConfiguration
				calculaSt={calculaSt}
				setCalculaSt={setCalculaSt}
				fecpDataBase={FECP_DB}
				icmsDataBase={ICMS_DB}
				ipiDataBase={IPI_DB}
				mvaDataBase={MVA_DB}
				obsDataBase={OBS_DB}
			/>

			<HeaderInformation calculaSt={calculaSt} />

			<MainItems
				items={structuredClone(calculaSt.itens)}
				calculaSt={calculaSt}
				fecpDataBase={FECP_DB}
				icmsDataBase={ICMS_DB}
				ipiDataBase={IPI_DB}
				mvaDataBase={MVA_DB}
				ncmDataBase={NCM_DB}
				handleEditItem={handleEditItem}
				handleAddItem={handleAddItem}
			/>
		</div>
	);
}
