import BRAZIL_STATES_DB from '../../Assets/Data/brazilStates.json';
import FECP_DB from '../../Assets/Data/fecps.json';
import ICMS_DB from '../../Assets/Data/icms.json';
import IPI_DB from '../../Assets/Data/ipis.json';
import MVA_DB from '../../Assets/Data/mvas.json';
import OBS_DB from '../../Assets/Data/obs.json';

export function useDataBase() {
	return {
		BRAZIL_STATES_DB,
		FECP_DB,
		ICMS_DB,
		IPI_DB,
		MVA_DB,
		OBS_DB,
	};
}
