import { ChangeEvent } from 'react';
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
	eventInput: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
	calculaSt: TCalculaSt;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	ncmDataBase: TNcm[];
	fecpDataBase: TFecp[];
};
export function handleInput({
	item,
	setItem,
	eventInput,
	calculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
}: Props) {
	const { value } = eventInput.target;
	const { name } = eventInput.target;
	const itemEditing = { ...item };
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
	// setItem(itemEditing);
	// calcItem(itemEditing);

	const itemForSave = reCalcItem({
		calculaSt,
		item: itemEditing,
		icmsDataBase,
		mvaDataBase,
		ipiDataBase,
		fecpDataBase,
	});
	setItem(itemForSave);
}
