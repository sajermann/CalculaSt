import { useQuery } from '@tanstack/react-query';
import { TIpi } from '~/Model/TIpi';

async function load() {
	try {
		return await (await fetch('./DataBase/ipis.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useIpiDataBase() {
	const { data } = useQuery<TIpi[]>({
		queryKey: ['ipi'],
		queryFn: load,
		keepPreviousData: true,

		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		IPI_DB: data,
	};
}
