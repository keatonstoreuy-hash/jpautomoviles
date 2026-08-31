export function SetupNotice() {
  return (
    <div className="card border-red/40 bg-red/5 p-6">
      <h2 className="font-display text-lg font-600">⚙️ Falta conectar la base de datos</h2>
      <p className="mt-2 text-sm text-steel-700">
        El sitio ya funciona con autos de ejemplo. Para que puedas cargar y editar tu propio catálogo
        desde acá (con login, fotos y precios en tiempo real), hay que conectar Supabase — es gratis y
        lleva unos minutos.
      </p>
      <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-steel-700">
        <li>Abrí el archivo <code className="rounded bg-ink/5 px-1">LEEME-CONFIGURACION.md</code> del proyecto.</li>
        <li>Seguí los pasos para crear el proyecto en Supabase y pegar las claves en Vercel.</li>
        <li>Al terminar, este panel te deja crear, editar y marcar autos como vendidos.</li>
      </ol>
    </div>
  );
}
