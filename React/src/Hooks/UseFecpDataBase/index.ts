import { useQuery } from '@tanstack/react-query';
import { TFecp } from '~/Model/TFecp';

async function load() {
	try {
		return await (await fetch('/DataBase/fecps.json')).json();
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
		initialData: [],
		initialDataUpdatedAt: new Date(1900).getTime(), // For occours first request
		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		fecpDataBase: data,
	};
}
