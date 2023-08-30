import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CONFIG = {
	true: <CheckCircleIcon />,
	false: <CancelIcon />,
};

type Props = {
	status: string;
};
export function StatusIcon({ status }: Props) {
	return CONFIG[status as 'true' | 'false'];
}
