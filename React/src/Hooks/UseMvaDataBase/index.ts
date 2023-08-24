import { useQuery } from '@tanstack/react-query';
import { TMva } from '~/Model/TMva';

async function load() {
	try {
		return await (await fetch('/DataBase/mvas.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useMvaDataBase() {
	const { data } = useQuery<TMva[]>({
		queryKey: ['mva'],
		queryFn: load,
		keepPreviousData: true,
		initialData: [],
		initialDataUpdatedAt: new Date(1900).getTime(), // For occours first request
		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		mvaDataBase: data,
	};
}
