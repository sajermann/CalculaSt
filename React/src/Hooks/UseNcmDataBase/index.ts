import { useQuery } from '@tanstack/react-query';
import { TNcm } from '~/Model/TNcm';

async function load() {
	try {
		return await (await fetch('/DataBase/ncms.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useNcmDataBase() {
	const { data } = useQuery<TNcm[]>({
		queryKey: ['ncm'],
		queryFn: load,
		keepPreviousData: true,
		initialData: [],
		initialDataUpdatedAt: new Date(1900).getTime(), // For occours first request
		staleTime: 60 * 10000, // 10 Minutes
	});
	return {
		ncmDataBase: data,
	};
}
