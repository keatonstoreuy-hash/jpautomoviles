# JP Automóviles — Guía de puesta en marcha

Sitio web hecho con **Next.js**. Funciona en dos niveles:

1. **Sin configurar nada** → el sitio se ve y navega con autos de ejemplo, y el **panel `/admin` ya
   deja entrar** con usuario y contraseña (login propio, no necesita base de datos).
2. **Conectando Supabase** (gratis) → se activa el **guardado real**: el dueño carga/edita autos, sube
   fotos y cambia precios desde `/admin` y se publican en el sitio.

---

## Acceso al panel

- Dirección: `tu-sitio.vercel.app/admin`
- Usuario: **jpautomoviles**
- Contraseña: **jpautos**

Se pueden cambiar en Vercel con las variables `ADMIN_USER` y `ADMIN_PASS`.

---

## 1) Probar el sitio en tu computadora (opcional)

```bash
npm install
npm run dev
```

Abrí http://localhost:3000 y el panel en http://localhost:3000/admin

---

## 2) Activar el guardado del catálogo (Supabase) — gratis

### a. Crear el proyecto
1. Entrá a https://supabase.com y creá una cuenta gratis.
2. **New project** → nombre `jp-automoviles`, elegí contraseña y región South America.

### b. Crear las tablas
1. Menú → **SQL Editor** → **New query**.
2. Abrí `supabase/schema.sql` de este proyecto, copiá **todo**, pegalo y **Run**.

### c. Copiar las claves
Menú → **Project Settings → API**. Vas a necesitar tres valores:
- **Project URL**
- clave **anon public**
- clave **service_role** (es secreta — no la compartas)

---

## 3) Publicar en Vercel (y arreglar el "deployment paused")

> El cartel **"This deployment is temporarily paused"** aparecía porque el deploy estaba en una cuenta
> pausada. La solución es desplegar en **tu** cuenta (keatonstoreuy@gmail.com).

1. Subí el proyecto a GitHub (o importalo directo).
2. En https://vercel.com (logueado con **keatonstoreuy@gmail.com**) → **Add New → Project** → importá el repo.
3. Framework: **Next.js** (se detecta solo).
4. En **Environment Variables** agregá:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | el Project URL de Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | la clave anon public |
   | `SUPABASE_SERVICE_ROLE_KEY` | la clave service_role (secreta) |
   | `ADMIN_USER` | jpautomoviles |
   | `ADMIN_PASS` | jpautos |
   | `ADMIN_SESSION_SECRET` | un texto largo y aleatorio |
   | `NEXT_PUBLIC_SITE_URL` | el dominio final, ej. https://jpautomoviles.com.uy |

5. **Deploy**. Listo: el sitio queda online, el panel entra con jpautomoviles/jpautos y ya podés cargar autos.

> Si necesitás cargar autos pero todavía no pusiste las claves de Supabase, el panel te deja entrar
> pero avisa que falta conectar la base. Con las 3 variables de Supabase puestas, se activa la carga.

---

## 4) Cargar tu primer auto

1. Entrá a `/admin` con jpautomoviles / jpautos.
2. **+ Nuevo vehículo** → completá datos, **subí varias fotos** (exterior, interior, detalles), elegí
   estado (Disponible / Reservado / Vendido).
3. **Publicar**. Aparece al instante en el sitio, y en la ficha se ven todas las fotos en galería.

---

## Videos y logo

- **Hero (portada):** usa `public/hero.mp4` (uno de tus videos de JP). Para cambiarlo, reemplazá ese
  archivo por otro con el mismo nombre.
- **Sección "Novedades":** reproduce `public/video-avenger.mp4` (tu video del Jeep Avenger).
- **Logo:** son tus archivos reales `public/logo-jp-dark.png` (para fondos claros) y
  `public/logo-jp-silver.png` (para fondos oscuros).

---

## 5) Datos que conviene revisar
Están todos en `lib/site.ts` (dirección, teléfonos, WhatsApp, horarios, redes). Revisá especialmente
`email`, `geo` (coordenadas exactas del local) y `url`.

## SEO ya incluido
Títulos y descripciones por página, palabras clave locales (Paysandú), datos estructurados `AutoDealer`
y `Car`, `sitemap.xml`, `robots.txt` y Open Graph. Enviá el sitio a **Google Search Console** y creá/
reclamá tu **Google Business Profile** para aparecer en Maps con reseñas.
