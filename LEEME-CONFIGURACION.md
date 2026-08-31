# JP Automóviles — Guía de puesta en marcha

Sitio web hecho con **Next.js**. Funciona en dos niveles:

1. **Sin configurar nada** → el sitio ya se ve y navega con autos de ejemplo (ideal para probar el diseño).
2. **Conectando Supabase** (gratis) → se activa el **panel de administración** en `/admin`, donde el dueño
   entra con usuario y contraseña y carga/edita autos, fotos y precios en tiempo real.

---

## 1) Probar el sitio en tu computadora (opcional)

```bash
npm install
npm run dev
```

Abrí http://localhost:3000. El panel está en http://localhost:3000/admin

---

## 2) Conectar la base de datos (Supabase) — activa el panel

### a. Crear el proyecto
1. Entrá a https://supabase.com y creá una cuenta (gratis).
2. **New project** → nombre `jp-automoviles`, elegí una contraseña y la región más cercana (South America).

### b. Crear las tablas
1. En Supabase, menú izquierdo → **SQL Editor** → **New query**.
2. Abrí el archivo `supabase/schema.sql` de este proyecto, copiá **todo** su contenido, pegalo y hacé **Run**.
   Esto crea la tabla de autos y el espacio para las fotos.

### c. Crear el usuario del dueño (para entrar al panel)
1. Menú izquierdo → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Poné el email y una contraseña. **Marcá "Auto Confirm User".**
3. Ese email y contraseña son los que se usan para entrar en `/admin`.

### c.2. ⚠️ IMPORTANTE — Cerrar el registro público (seguridad)
Para que nadie más pueda crearse un usuario y editar tu catálogo:
1. **Authentication → Sign In / Providers → Email**.
2. Apagá **"Allow new users to sign up"** y guardá.
Así el único usuario que existe es el que creaste vos en el paso anterior.

### d. Copiar las claves
1. Menú → **Project Settings** → **API**.
2. Anotá **Project URL** y la clave **anon public**.

---

## 3) Publicar en Vercel (y arreglar el "deployment paused")

> El cartel **"This deployment is temporarily paused"** aparece porque el deploy quedó en una cuenta
> pausada. La solución es desplegar en tu cuenta nueva (keatonstoreuy@gmail.com).

1. Subí este proyecto a un repositorio de GitHub (o importalo directo en Vercel).
2. En https://vercel.com (logueado con **keatonstoreuy@gmail.com**) → **Add New → Project** → importá el repo.
3. Framework: **Next.js** (lo detecta solo). No cambies nada más.
4. En **Environment Variables** agregá:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | el Project URL de Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | la clave anon public |

5. **Deploy**. Cuando termine, tu web queda online. El panel `/admin` ya funciona con el usuario del paso 2c.

> Si ya tenías el proyecto linkeado a la cuenta vieja, borrá la carpeta oculta `.vercel` antes de volver a
> importarlo, o simplemente importá como proyecto nuevo en la cuenta correcta.

---

## 4) Cargar tu primer auto

1. Entrá a `tudominio.vercel.app/admin` → login con el usuario creado.
2. **+ Nuevo vehículo** → completá datos, subí fotos, elegí estado (Disponible / Reservado / Vendido).
3. **Publicar vehículo**. Aparece al instante en el sitio y en el catálogo.

---

## Video del hero (portada)

La portada usa el video `public/hero.mp4`. **Reemplazalo por un video propio** (tu local, tus autos)
para que sea 100% de la marca: borrá ese archivo y poné el tuyo con el mismo nombre `hero.mp4`
(ideal: horizontal, corto, liviano < 6 MB, sin logos de otras marcas). Si no querés video, se puede
dejar solo una foto de fondo.

## Logo

El logo JP está hecho en vector (`components/Logo.tsx` + `public/favicon.svg`), así se ve nítido en
cualquier tamaño y se adapta solo: **negro** sobre fondos claros y **plateado/blanco** sobre fondos
oscuros (hero, footer, preloader), sin el círculo. Si preferís usar tu archivo original exacto en PNG,
guardalo en `public/` y avisame para enlazarlo.

## 5) Datos que conviene revisar

Están todos juntos en `lib/site.ts` (dirección, teléfonos, WhatsApp, horarios, redes). Editá ese archivo
si algún dato cambia. Verificá especialmente:

- `email` (puse un placeholder)
- `geo` (latitud/longitud exactas del local para Google Maps)
- `url` (poné el dominio final cuando lo tengas, para el SEO y el sitemap)

---

## SEO ya incluido
- Títulos y descripciones por página, palabras clave locales (Paysandú, Uruguay).
- Datos estructurados de Google: `AutoDealer` (negocio local) y `Car` (cada vehículo).
- `sitemap.xml` y `robots.txt` automáticos, Open Graph para compartir en redes.
- Enviá tu sitio a **Google Search Console** y creá/reclamá la ficha de **Google Business Profile**
  para aparecer en Google Maps con reseñas.
