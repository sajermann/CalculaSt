import { useQuery } from '@tanstack/react-query';
import { TObs } from '~/Model/TObs';

async function load() {
	try {
		return await (await fetch('./DataBase/obs.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useObsDataBase() {
	const { data } = useQuery<TObs[]>({
		queryKey: ['obs'],
		queryFn: load,
		keepPreviousData: true,

		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		obsDataBase: data,
	};
}
