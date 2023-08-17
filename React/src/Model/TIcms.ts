import { TBrazilState } from './TBrazilState';

export type TIcms = {
	id: string;

	percent: number;

	percentIntra: number;

	state: TBrazilState;

	createdAt?: string;

	updatedAt?: string;

	isBlocked?: boolean;

	isActive?: boolean;
};
