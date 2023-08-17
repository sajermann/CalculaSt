import { TBrazilState } from './TBrazilState';

export type TFecp = {
	id: string;

	percent: number;

	state: TBrazilState;

	createdAt?: string;

	updatedAt?: string;

	isBlocked?: boolean;

	isActive?: boolean;
};
