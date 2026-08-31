import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ADMIN_COOKIE, verifyToken } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseWritable } from '@/lib/supabase/config';
import { vehicleSlug } from '@/lib/slug';

function authed() {
  return verifyToken(cookies().get(ADMIN_COOKIE)?.value);
}

function guard() {
  if (!authed()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (!isSupabaseWritable)
    return NextResponse.json(
      { error: 'La base de datos todavía no está conectada para escritura.' },
      { status: 400 }
    );
  return null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function buildRow(b: any) {
  return {
    brand: String(b.brand ?? '').trim(),
    model: String(b.model ?? '').trim(),
    version: b.version ? String(b.version).trim() : null,
    year: Number(b.year) || new Date().getFullYear(),
    price: Number(b.price) || 0,
    currency: b.currency === 'UYU' ? 'UYU' : 'USD',
    km: Number(b.km) || 0,
    transmission: b.transmission ?? 'manual',
    fuel: b.fuel ?? 'nafta',
    body: b.body ?? 'sedan',
    color: b.color ? String(b.color).trim() : null,
    doors: b.doors ? Number(b.doors) : null,
    engine: b.engine ? String(b.engine).trim() : null,
    status: b.status ?? 'disponible',
    featured: Boolean(b.featured),
    description: b.description ? String(b.description).trim() : null,
    features: Array.isArray(b.features) ? b.features.filter(Boolean) : [],
    images: Array.isArray(b.images) ? b.images.filter(Boolean) : [],
  };
}

function revalidateAll(slug?: string) {
  revalidatePath('/');
  revalidatePath('/catalogo');
  if (slug) revalidatePath(`/vehiculos/${slug}`);
}

export async function POST(request: Request) {
  const denied = guard();
  if (denied) return denied;
  const body = await request.json();
  const row = buildRow(body);
  if (!row.brand || !row.model)
    return NextResponse.json({ error: 'Marca y modelo son obligatorios.' }, { status: 400 });

  const slug = `${vehicleSlug(row.brand, row.model, row.version, row.year)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
  const supabase = createAdminClient();
  const { error } = await supabase.from('vehicles').insert({ ...row, slug });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateAll(slug);
  return NextResponse.json({ ok: true, slug });
}

export async function PUT(request: Request) {
  const denied = guard();
  if (denied) return denied;
  const body = await request.json();
  const id = body.id;
  if (!id) return NextResponse.json({ error: 'Falta el id.' }, { status: 400 });
  const row = buildRow(body);
  if (!row.brand || !row.model)
    return NextResponse.json({ error: 'Marca y modelo son obligatorios.' }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('vehicles')
    .update(row)
    .eq('id', id)
    .select('slug')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateAll(data?.slug);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const denied = guard();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Falta el id.' }, { status: 400 });
  const supabase = createAdminClient();
  const { error } = await supabase.from('vehicles').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateAll();
  return NextResponse.json({ ok: true });
}
