import { Box, Button, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

type Props = {
	onClick: () => void;
	isSuccess: boolean;
	isLoading: boolean;
	disabled: boolean;
	text: string;
	color?: 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
};
export function FeedbackButtonText({
	onClick,
	isSuccess,
	isLoading,
	disabled,
	text,
	color,
}: Props) {
	const buttonSx = {
		...(isSuccess && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	return (
		<Box sx={{ position: 'relative' }}>
			<Button
				color={color}
				variant="outlined"
				sx={buttonSx}
				disabled={disabled}
				onClick={onClick}
			>
				{text}
			</Button>
			{isLoading && (
				<CircularProgress
					size={24}
					sx={{
						color: green[500],
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-12px',
						marginLeft: '-12px',
					}}
				/>
			)}
		</Box>
	);
}
