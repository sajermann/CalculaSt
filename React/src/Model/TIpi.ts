import { TNcm } from './TNcm';

export type TIpi = {
	id: string;
	percent: number;
	ncm: TNcm;
	createdAt?: string;
	updatedAt?: string;
	isBlocked?: boolean;
	isActive?: boolean;
};
