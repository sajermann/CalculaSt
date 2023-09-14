import { TBrazilState } from './TBrazilState';
import { TFecp } from './TFecp';
import { TIcms } from './TIcms';
import { TIpi } from './TIpi';
import { TMva } from './TMva';
import { TNcm } from './TNcm';
import { TObs } from './TObs';

export type TUseDataBase = {
	fecpDataBase: TFecp[];
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	ncmDataBase: TNcm[];
	obsDataBase: TObs[];
	brazilStatesDataBase: TBrazilState[];
};
