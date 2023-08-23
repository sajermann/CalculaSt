import { TCalculaSt } from '~/Model/TCalculaSt';
import { TItem } from '~/Model/TItem';
import { TObs } from '~/Model/TObs';
import Guid from '~/Utils/GenerateGuid';
import { obsCalc } from '~/Utils/ObsCalc';
import { reCalcHeader } from '~/Utils/ReCalcHeader';

type Props = {
	calculaSt: TCalculaSt;
	setCalculaSt: (data: TCalculaSt) => void;
	item: TItem;
	obsDataBase: TObs[];
};

export async function handleCreateItem({
	calculaSt,
	setCalculaSt,
	item,
	obsDataBase,
}: Props) {
	const itemForAdd = { ...item };
	itemForAdd.id = Guid.new();
	const calculaStEditing = { ...calculaSt };
	calculaStEditing.itens.push(itemForAdd);
	calculaStEditing.obs = obsCalc({
		calculaSt: calculaStEditing,
		obsDataBase,
	});
	reCalcHeader({
		calculaStForRecalc: calculaStEditing,
		setCalculaSt,
	});
}
