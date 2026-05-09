import { createServerSupabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const action = url.searchParams.get('action');

  if (!token) {
    return new Response('Missing token', { status: 400 });
  }

  const supabase = createServerSupabase();
  const now = new Date().toISOString();

  if (action === 'report') {
    const { error } = await supabase
      .from('campaigns')
      .update({ reported_at: now, status: 'reported' })
      .eq('token', token);

    if (error) {
      console.error('[track] report update error:', error);
      return new Response('Failed', { status: 500 });
    }
    return Response.json({ ok: true });
  }

  const { error } = await supabase
    .from('campaigns')
    .update({ clicked_at: now, status: 'clicked' })
    .eq('token', token);

  if (error) {
    console.error('[track] click update error:', error);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: `/phished?token=${token}` },
  });
}
