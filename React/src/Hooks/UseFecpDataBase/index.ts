import { useQuery } from '@tanstack/react-query';
import { TFecp } from '~/Model/TFecp';

async function load() {
	try {
		return await (await fetch('./DataBase/fecps.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useFecpDataBase() {
	const { data } = useQuery<TFecp[]>({
		queryKey: ['fecp'],
		queryFn: load,
		keepPreviousData: true,

		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		FECP_DB: data,
	};
}
