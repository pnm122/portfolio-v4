export async function GET() {
	return new Response(
		`
		User-agent: *
    Allow: /
    Sitemap: https://www.pierce-martin.com/sitemap.txt`.trim().replaceAll(/ /g, ''),
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
}