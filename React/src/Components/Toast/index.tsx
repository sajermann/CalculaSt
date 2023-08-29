import { Alert, Snackbar } from '@mui/material';
import { useToast } from '~/Hooks/UseToast';

export function Toast() {
	const { isOpen, severity, setIsOpen, message } = useToast();
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isOpen}
			autoHideDuration={6000}
			onClose={() => setIsOpen(false)}
		>
			<Alert
				onClose={() => setIsOpen(false)}
				severity={severity}
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}
