export function SetupNotice() {
  return (
    <div className="card border-gold/50 bg-gold/10 p-5">
      <p className="text-sm text-steel-800">
        <span className="font-800 uppercase">Falta conectar la base de datos.</span>{' '}
        Por ahora se muestran autos de ejemplo. Cuando esté conectada vas a poder cargar y editar tu
        propio catálogo desde acá.
      </p>
    </div>
  );
}
