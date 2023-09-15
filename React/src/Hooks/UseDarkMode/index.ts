import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Props {
	isDarkMode: boolean;
	setIsDarkMode: (data?: boolean) => void;
}

export const useDarkMode = create<Props>()(
	persist(
		set => ({
			isDarkMode: false,
			setIsDarkMode: (data?: boolean) =>
				set(state => ({
					...state,
					isDarkMode: data || !state.isDarkMode,
				})),
		}),
		{
			name: '@calcula-st/react:dark-mode', // name of the item in the storage (must be unique)
		},
	),
);
window.store = useDarkMode;
