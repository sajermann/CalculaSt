import { useQuery } from '@tanstack/react-query';
import { TBrazilState } from '~/Model/TBrazilState';

async function load() {
	try {
		return await (await fetch('./DataBase/brazilStates.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useBrazilStatesDataBase() {
	const { data } = useQuery<TBrazilState[]>({
		queryKey: ['brazilStates'],
		queryFn: load,
		keepPreviousData: true,

		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		BRAZIL_STATES_DB: data,
	};
}
