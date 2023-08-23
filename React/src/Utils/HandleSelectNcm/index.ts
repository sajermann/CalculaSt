import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { TNcm } from '~/Model/TNcm';
import { reCalcItem } from '../ReCalcItem';

type Props = {
	item: TItem;
	setItem: (data: TItem) => void;
	ncm: TNcm;
	calculaSt: TCalculaSt;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	ncmDataBase: TNcm[];
	fecpDataBase: TFecp[];
};
export function handleSelectNcm({
	ncm,
	item,
	setItem,
	calculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
}: Props) {
	const itemEditing = { ...item };
	itemEditing.ncm = { ...ncm };
	const itemForSave = reCalcItem({
		calculaSt,
		item: itemEditing,
		icmsDataBase,
		mvaDataBase,
		ipiDataBase,
		fecpDataBase,
	});
	setItem({ ...itemForSave });
}
