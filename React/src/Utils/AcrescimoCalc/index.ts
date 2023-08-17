type Props = {
	total: number;
	st: number;
};

export function acrescimoCalc({ total, st }: Props) {
	if (total === 0) return 0;
	return (st / total) * 100;
}
