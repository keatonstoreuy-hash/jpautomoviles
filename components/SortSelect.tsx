'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const options = [
  { value: '', label: 'Relevancia' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'anio-desc', label: 'Año: más nuevo' },
  { value: 'km-asc', label: 'Menor kilometraje' },
];

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const value = params.get('sort') ?? '';

  const onChange = (v: string) => {
    const next = new URLSearchParams(params.toString());
    if (v) next.set('sort', v);
    else next.delete('sort');
    router.push(`/catalogo?${next.toString()}`, { scroll: false });
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="field !w-auto !py-2 text-sm"
      aria-label="Ordenar resultados"
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
