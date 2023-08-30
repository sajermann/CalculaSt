import { create } from 'zustand';
import { CONST } from '~/Constants';
import { TCalculaSt } from '~/Model/TCalculaSt';

interface Props {
	calculaSt: TCalculaSt;
	setCalculaSt: (data: Partial<TCalculaSt>) => void;
	resetCalculaSt: () => void;
}

export const useCalculaSt = create<Props>(set => ({
	calculaSt: CONST.DEFAULT.CALCULA_ST,
	setCalculaSt: (data: Partial<TCalculaSt>) =>
		set(state => ({
			calculaSt: { ...state.calculaSt, ...data },
		})),
	resetCalculaSt: () =>
		set(() => ({
			calculaSt: { ...CONST.DEFAULT.CALCULA_ST },
		})),
}));
