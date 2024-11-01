export async function GET() {
	return new Response(
		`
		https://www.pierce-martin.com/
    https://www.pierce-martin.com/case-study/spelling-bee
    https://www.pierce-martin.com/case-study/chatham-financial
    https://www.pierce-martin.com/case-study/club-tennis`.trim().replaceAll(/ /g, ''),
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
}