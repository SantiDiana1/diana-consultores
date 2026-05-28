import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface IVAEstimacionProps {
  monto: number;
  periodo: string;
  fechaPago: string;
}

export function IVAEstimacion({ monto, periodo, fechaPago }: IVAEstimacionProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">IVA Estimado {periodo}</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">{formatCurrency(monto)}</p>
          <p className="text-xs text-[#6B7280] mt-1">A pagar en {fechaPago}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-orange-50">
          <TrendingUp size={20} className="text-[#F59E0B]" />
        </div>
      </div>
    </div>
  );
}
