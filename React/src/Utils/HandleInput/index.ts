import { ChangeEvent } from 'react';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { TNcm } from '~/Model/TNcm';
import { reCalcItem } from '../ReCalcItem';

type TInputName = 'quantity' | 'price' | 'description';

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

	console.log({ value, name });

	const config = {
		quantity: () => {
			itemEditing.quantity = parseFloat(value) || 0;
		},
		price: () => {
			itemEditing.price = parseFloat(value) || 0;
		},
		description: () => {
			itemEditing.ncm.description = value;
		},
	};

	config[name as TInputName]();

	itemEditing.total = itemEditing.price * itemEditing.quantity;
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
