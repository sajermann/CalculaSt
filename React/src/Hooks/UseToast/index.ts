import { create } from 'zustand';

type TSeverity = 'error' | 'warning' | 'info' | 'success';

interface Props {
	isOpen: boolean;
	setIsOpen: (data: boolean) => void;
	severity: TSeverity;
	setSeverity: (data: TSeverity) => void;
	message: string;
	setMessage: (data: string) => void;
}

export const useToast = create<Props>(set => ({
	isOpen: false,
	setIsOpen: (data: boolean) =>
		set(state => ({
			...state,
			isOpen: data,
		})),
	severity: 'success',
	setSeverity: (data: TSeverity) =>
		set(state => ({
			...state,
			severity: data,
		})),
	message: '',
	setMessage: (data: string) =>
		set(state => ({
			...state,
			message: data,
		})),
}));
