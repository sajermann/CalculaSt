import { useQuery } from '@tanstack/react-query';
import { TIcms } from '~/Model/TIcms';

async function load() {
	try {
		return await (await fetch('/DataBase/icms.json')).json();
	} catch (e) {
		console.error({ e });
		return [];
	}
}

export function useIcmsDataBase() {
	const { data } = useQuery<TIcms[]>({
		queryKey: ['icms'],
		queryFn: load,
		keepPreviousData: true,
		initialData: [],
		initialDataUpdatedAt: new Date(1900).getTime(), // For occours first request
		staleTime: 60 * 10000, // 10 Minutes
	});

	return {
		icmsDataBase: data,
	};
}
