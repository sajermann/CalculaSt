import { TCalculaSt } from '~/Model/TCalculaSt';
import { TItem } from '~/Model/TItem';
import { TObs } from '~/Model/TObs';
import { obsCalc } from '~/Utils/ObsCalc';
import { reCalcHeader } from '~/Utils/ReCalcHeader';

type Props = {
	calculaSt: TCalculaSt;
	setCalculaSt: (data: TCalculaSt) => void;
	item: TItem;
	mode: 'edit' | 'delete';
	obsDataBase: TObs[];
};

export function handleUpdateItem({
	calculaSt,
	item,
	mode,
	obsDataBase,
	setCalculaSt,
}: Props): boolean {
	const calculaStEditing = { ...calculaSt };
	const itemsForKeep = calculaStEditing.itens.filter(
		itemHere => itemHere.id !== item.id,
	);

	if (mode === 'edit') calculaStEditing.itens = [...itemsForKeep, item];
	if (mode === 'delete') calculaStEditing.itens = [...itemsForKeep];
	calculaStEditing.obs = obsCalc({
		calculaSt: calculaStEditing,
		obsDataBase,
	});
	return reCalcHeader({
		calculaStForRecalc: calculaStEditing,
		setCalculaSt,
	});
}
