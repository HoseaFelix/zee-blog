export async function POST() {
  return new Response(JSON.stringify({ message: 'Newsletter subscription is temporarily disabled.' }), { status: 410, headers: { 'Content-Type': 'application/json' } });
}
