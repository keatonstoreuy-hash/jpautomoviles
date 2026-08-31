import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, verifyToken } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { VEHICLES_BUCKET, isSupabaseWritable } from '@/lib/supabase/config';

export async function POST(request: Request) {
  if (!verifyToken(cookies().get(ADMIN_COOKIE)?.value))
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (!isSupabaseWritable)
    return NextResponse.json({ error: 'Almacenamiento no configurado.' }, { status: 400 });

  const form = await request.formData();
  const files = form.getAll('files').filter((f): f is File => f instanceof File);
  if (!files.length) return NextResponse.json({ error: 'Sin archivos.' }, { status: 400 });

  const supabase = createAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    if (!file.type.startsWith('image/'))
      return NextResponse.json({ error: `"${file.name}" no es una imagen.` }, { status: 400 });
    if (file.size > 8 * 1024 * 1024)
      return NextResponse.json({ error: `"${file.name}" supera los 8 MB.` }, { status: 400 });

    const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from(VEHICLES_BUCKET)
      .upload(path, buffer, { contentType: file.type, cacheControl: '3600', upsert: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    urls.push(supabase.storage.from(VEHICLES_BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return NextResponse.json({ urls });
}
