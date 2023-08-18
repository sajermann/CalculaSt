export function countForPagination(count: number): number[] {
	const counts: number[] = [];
	if (count > 0) counts.push(1);
	if (count > 5 && count > 10) counts.push(10);
	if (count > 10 && count > 20) counts.push(20);
	if (count > 20 && count > 30) counts.push(30);
	if (count > 30 && count > 40) counts.push(40);
	if (count > 40 && count > 50) counts.push(50);
	counts.push(count);
	counts.push(5);
	counts.sort((a, b) => a - b);
	return counts;
}
