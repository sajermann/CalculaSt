import zukeeper from 'zukeeper';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Props {
	isDarkMode: boolean;
	setIsDarkMode: (data?: boolean) => void;
}
type SetProps = (
	partial: Props | Partial<Props> | ((state: Props) => Props | Partial<Props>),
	replace?: boolean | undefined,
) => void;

export const useDarkMode = create<Props>()(
	persist(
		zukeeper((set: SetProps) => ({
			isDarkMode: false,
			setIsDarkMode: (data?: boolean) =>
				set(state => ({
					...state,
					isDarkMode: data || !state.isDarkMode,
				})),
		})),
		{
			name: '@calcula-st/react:dark-mode', // name of the item in the storage (must be unique)
		},
	),
);
window.store = useDarkMode;
