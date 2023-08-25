import { useFecpDataBase } from '../UseFecpDataBase';
import { useIcmsDataBase } from '../UseIcmsDataBase';
import { useIpiDataBase } from '../UseIpiDataBase';
import { useMvaDataBase } from '../UseMvaDataBase';
import { useNcmDataBase } from '../UseNcmDataBase';
import { useObsDataBase } from '../UseObsDataBase';

export function useDataBase() {
	const { fecpDataBase } = useFecpDataBase();
	const { icmsDataBase } = useIcmsDataBase();
	const { ipiDataBase } = useIpiDataBase();
	const { mvaDataBase } = useMvaDataBase();
	const { ncmDataBase } = useNcmDataBase();
	const { obsDataBase } = useObsDataBase();

	return {
		fecpDataBase,
		icmsDataBase,
		ipiDataBase,
		mvaDataBase,
		ncmDataBase,
		obsDataBase,
	};
}
