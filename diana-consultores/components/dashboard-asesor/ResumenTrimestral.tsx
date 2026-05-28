interface ResumenTrimestralProps {
  presentados: number;
  total: number;
}

export function ResumenTrimestral({ presentados, total }: ResumenTrimestralProps) {
  const porcentaje = Math.round((presentados / total) * 100);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-[#6B7280] mb-2">Progreso Trimestral</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-[#111827]">
          {presentados}/{total}
        </span>
        <span className="text-sm font-medium text-[#4F67FF]">{porcentaje}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div
          className="bg-[#4F67FF] h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      <p className="text-xs text-[#6B7280] mt-2">Modelos presentados este mes</p>
    </div>
  );
}
