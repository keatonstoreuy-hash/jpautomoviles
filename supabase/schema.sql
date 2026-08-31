-- =====================================================================
-- JP Automóviles — Esquema de base de datos (Supabase / PostgreSQL)
-- Pegá TODO este contenido en Supabase → SQL Editor → New query → Run.
-- =====================================================================

-- Tabla de vehículos
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  model text not null,
  version text,
  year int not null,
  price numeric not null default 0,
  currency text not null default 'USD',
  km int not null default 0,
  transmission text not null default 'manual',
  fuel text not null default 'nafta',
  body text not null default 'sedan',
  color text,
  doors int,
  engine text,
  status text not null default 'disponible',
  featured boolean not null default false,
  description text,
  features text[] not null default '{}',
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists vehicles_status_idx on public.vehicles (status);
create index if not exists vehicles_brand_idx on public.vehicles (brand);

-- Seguridad a nivel de fila (RLS)
alter table public.vehicles enable row level security;

-- Cualquiera puede LEER el catálogo (sitio público)
drop policy if exists "lectura publica" on public.vehicles;
create policy "lectura publica" on public.vehicles
  for select using (true);

-- Solo usuarios autenticados (el dueño) pueden crear/editar/borrar.
-- IMPORTANTE: para que "autenticado" = "el dueño", hay que DESACTIVAR el registro
-- público en Supabase (Authentication → Sign In / Providers → Email → apagá
-- "Allow new users to sign up"). Así los únicos usuarios son los que creás a mano.
drop policy if exists "escritura autenticados" on public.vehicles;
create policy "escritura autenticados" on public.vehicles
  for all using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

-- =====================================================================
-- Almacenamiento de fotos (bucket público "vehiculos")
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('vehiculos', 'vehiculos', true)
on conflict (id) do nothing;

-- Lectura pública de las fotos
drop policy if exists "fotos lectura publica" on storage.objects;
create policy "fotos lectura publica" on storage.objects
  for select using (bucket_id = 'vehiculos');

-- Subida/edición/borrado de fotos solo para usuarios autenticados
drop policy if exists "fotos escritura autenticados" on storage.objects;
create policy "fotos escritura autenticados" on storage.objects
  for all using (bucket_id = 'vehiculos' and (select auth.uid()) is not null)
  with check (bucket_id = 'vehiculos' and (select auth.uid()) is not null);
