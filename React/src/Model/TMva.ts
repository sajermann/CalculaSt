import { TBrazilState } from './TBrazilState';
import { TNcm } from './TNcm';

export type TMva = {
	id: string;
	percent: number;
	percentSimplesNacional: number;
	states: TBrazilState[];
	ncms: TNcm[];
};
