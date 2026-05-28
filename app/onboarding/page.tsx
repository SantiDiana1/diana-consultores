'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ejecutarAnalisisIA } from '@/services/mockApi';
import type { AlertaIAOnboarding, ResultadoAnalisisIA } from '@/types';
import { Check, ChevronRight, ChevronLeft, Building2, FileText, Calculator, Users, Upload, Brain, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const pasos = [
  { id: 1, label: 'Bienvenida', icon: <Sparkles size={16} /> },
  { id: 2, label: 'Datos Empresa', icon: <Building2 size={16} /> },
  { id: 3, label: 'Situación Fiscal', icon: <Calculator size={16} /> },
  { id: 4, label: 'Gestoría Anterior', icon: <Users size={16} /> },
  { id: 5, label: 'Documentos', icon: <Upload size={16} /> },
  { id: 6, label: 'Análisis IA', icon: <Brain size={16} /> },
];

export default function OnboardingPage() {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({
    nombre: '',
    cifNif: '',
    tipoSociedad: '',
    actividad: '',
    fechaConstitucion: '',
    numEmpleados: '',
    facturacionAnual: '',
    regimenIVA: '',
    regimenIRPF: '',
    obligaciones: [] as string[],
    epigrafes: '',
    gestoriaAnterior: '',
    motivoCambio: '',
    documentosPendientes: '',
    observaciones: '',
    archivosSubidos: [] as string[],
  });
  const [analisis, setAnalisis] = useState<ResultadoAnalisisIA | null>(null);
  const [analizando, setAnalizando] = useState(false);
  const [progreso, setProgreso] = useState(0);

  const handleNext = () => {
    if (paso < 6) setPaso(paso + 1);
  };

  const handlePrev = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const handleAnalizar = async () => {
    setAnalizando(true);
    setProgreso(0);
    // Simulate progress
    const interval = setInterval(() => {
      setProgreso((p) => {
        if (p >= 95) { clearInterval(interval); return 95; }
        return p + Math.random() * 15;
      });
    }, 400);
    const resultado = await ejecutarAnalisisIA('onboarding-new');
    clearInterval(interval);
    setProgreso(100);
    setTimeout(() => {
      setAnalisis(resultado);
      setAnalizando(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F8FA] to-[#EEF0FF] flex">
      {/* Left sidebar with steps */}
      <div className="w-72 bg-[#1C2333] text-white p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/clientes" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-4">
            <ArrowLeft size={14} /> Volver
          </Link>
          <h2 className="text-lg font-bold">Nuevo Cliente</h2>
          <p className="text-sm text-gray-400 mt-1">Asistente de alta</p>
        </div>
        <nav className="flex-1 space-y-2">
          {pasos.map((p) => (
            <button
              key={p.id}
              onClick={() => p.id <= paso && setPaso(p.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                paso === p.id ? 'bg-[#4F67FF] text-white font-medium' :
                p.id < paso ? 'text-gray-300 hover:bg-white/5' : 'text-gray-500 cursor-not-allowed'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                p.id < paso ? 'bg-[#22C55E] text-white' :
                paso === p.id ? 'bg-white/20' : 'bg-white/5'
              )}>
                {p.id < paso ? <Check size={12} /> : p.icon}
              </div>
              {p.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Progreso</span>
            <span>{Math.round(((paso - 1) / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
            <div className="bg-[#4F67FF] h-1.5 rounded-full transition-all" style={{ width: `${((paso - 1) / 5) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            {/* Step 1: Bienvenida */}
            {paso === 1 && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4F67FF]/10 flex items-center justify-center">
                  <Sparkles size={28} className="text-[#4F67FF]" />
                </div>
                <h1 className="text-3xl font-bold text-[#111827]">Bienvenido al Alta de Cliente</h1>
                <p className="text-lg text-[#6B7280] max-w-md mx-auto">
                  Este asistente te guiará paso a paso para dar de alta un nuevo cliente. Al final, nuestra IA analizará la información y generará recomendaciones.
                </p>
                <button onClick={handleNext} className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F67FF] text-white font-medium rounded-lg hover:bg-[#3d52e0] transition-colors">
                  Comenzar <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Company Data */}
            {paso === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827]">Datos de la Empresa</h2>
                <p className="text-[#6B7280]">Información básica de la sociedad o autónomo</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Nombre / Razón Social *</label>
                    <input type="text" value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="Ej: Construcciones López S.L." />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">CIF / NIF *</label>
                    <input type="text" value={datos.cifNif} onChange={(e) => setDatos({ ...datos, cifNif: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="B12345678" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Tipo Sociedad</label>
                    <select value={datos.tipoSociedad} onChange={(e) => setDatos({ ...datos, tipoSociedad: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg">
                      <option value="">Seleccionar...</option>
                      <option value="sl">Sociedad Limitada</option>
                      <option value="sa">Sociedad Anónima</option>
                      <option value="autonomo">Autónomo</option>
                      <option value="cooperativa">Cooperativa</option>
                      <option value="comunidad_bienes">Comunidad de Bienes</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Actividad Principal</label>
                    <input type="text" value={datos.actividad} onChange={(e) => setDatos({ ...datos, actividad: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="Ej: Construcción" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Fecha Constitución</label>
                    <input type="date" value={datos.fechaConstitucion} onChange={(e) => setDatos({ ...datos, fechaConstitucion: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Nº Empleados</label>
                    <input type="number" value={datos.numEmpleados} onChange={(e) => setDatos({ ...datos, numEmpleados: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Facturación Anual Aprox.</label>
                    <input type="text" value={datos.facturacionAnual} onChange={(e) => setDatos({ ...datos, facturacionAnual: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="Ej: 200.000€" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Fiscal Situation */}
            {paso === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827]">Situación Fiscal</h2>
                <p className="text-[#6B7280]">Información sobre régimen y obligaciones actuales</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Régimen IVA</label>
                    <select value={datos.regimenIVA} onChange={(e) => setDatos({ ...datos, regimenIVA: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg">
                      <option value="">Seleccionar...</option>
                      <option value="general">General</option>
                      <option value="simplificado">Simplificado</option>
                      <option value="recargo_equivalencia">Recargo de Equivalencia</option>
                      <option value="exento">Exento</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Régimen IRPF / IS</label>
                    <select value={datos.regimenIRPF} onChange={(e) => setDatos({ ...datos, regimenIRPF: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg">
                      <option value="">Seleccionar...</option>
                      <option value="estimacion_directa">Estimación Directa</option>
                      <option value="estimacion_objetiva">Estimación Objetiva (Módulos)</option>
                      <option value="impuesto_sociedades">Impuesto de Sociedades</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-[#6B7280] mb-2 block">Obligaciones Fiscales Actuales</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Modelo 303', 'Modelo 130', 'Modelo 111', 'Modelo 190', 'Modelo 347', 'Modelo 390', 'Modelo 200', 'Modelo 202', 'Modelo 349'].map((m) => (
                        <label key={m} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <input type="checkbox" checked={datos.obligaciones.includes(m)} onChange={(e) => {
                            if (e.target.checked) setDatos({ ...datos, obligaciones: [...datos.obligaciones, m] });
                            else setDatos({ ...datos, obligaciones: datos.obligaciones.filter((o) => o !== m) });
                          }} className="rounded" />
                          <span className="text-sm text-[#111827]">{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Epígrafes IAE</label>
                    <input type="text" value={datos.epigrafes} onChange={(e) => setDatos({ ...datos, epigrafes: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="Ej: 501.1, 861.2" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Previous accountant */}
            {paso === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827]">Gestoría Anterior</h2>
                <p className="text-[#6B7280]">Información sobre la gestoría previa (si aplica)</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Nombre Gestoría Anterior</label>
                    <input type="text" value={datos.gestoriaAnterior} onChange={(e) => setDatos({ ...datos, gestoriaAnterior: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg" placeholder="Ej: Gestoría Pérez" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Motivo del Cambio</label>
                    <select value={datos.motivoCambio} onChange={(e) => setDatos({ ...datos, motivoCambio: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg">
                      <option value="">Seleccionar...</option>
                      <option value="precio">Precio</option>
                      <option value="servicio">Calidad del servicio</option>
                      <option value="tecnologia">Falta de tecnología</option>
                      <option value="errores">Errores frecuentes</option>
                      <option value="comunicacion">Comunicación deficiente</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Documentos Pendientes de Recibir</label>
                    <textarea value={datos.documentosPendientes} onChange={(e) => setDatos({ ...datos, documentosPendientes: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none" rows={3} placeholder="Ej: Libros contables 2023, modelos presentados..." />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] mb-1 block">Observaciones</label>
                    <textarea value={datos.observaciones} onChange={(e) => setDatos({ ...datos, observaciones: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none" rows={3} placeholder="Notas adicionales..." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Document Upload */}
            {paso === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827]">Documentación Inicial</h2>
                <p className="text-[#6B7280]">Sube los documentos iniciales del cliente</p>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#4F67FF] transition-colors">
                  <Upload size={40} className="text-[#6B7280] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#111827] mb-1">Arrastra archivos aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-[#6B7280]">PDF, imágenes, Excel. Máximo 10MB por archivo</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#6B7280]">Documentos recomendados:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Escritura de constitución', 'DNI/NIE administrador', 'Modelo 036/037', 'Último Imp. Sociedades', 'Últimas nóminas', 'Extracto bancario reciente'].map((doc) => (
                      <div key={doc} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <FileText size={14} className="text-[#6B7280]" />
                        <span className="text-sm text-[#111827]">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {datos.archivosSubidos.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-700">{datos.archivosSubidos.length} archivo(s) subido(s)</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: AI Analysis */}
            {paso === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827]">Análisis Inteligente</h2>
                <p className="text-[#6B7280]">Nuestra IA analizará la información recopilada y generará recomendaciones</p>

                {!analisis && !analizando && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#4F67FF]/10 flex items-center justify-center mb-4">
                      <Brain size={36} className="text-[#4F67FF]" />
                    </div>
                    <p className="text-sm text-[#6B7280] mb-4">Todo listo para el análisis. Revisaremos régimen fiscal, obligaciones, riesgos y oportunidades.</p>
                    <button onClick={handleAnalizar} className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F67FF] text-white font-medium rounded-lg hover:bg-[#3d52e0]">
                      <Brain size={16} /> Ejecutar Análisis IA
                    </button>
                  </div>
                )}

                {analizando && (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#4F67FF]/10 flex items-center justify-center animate-pulse">
                      <Brain size={36} className="text-[#4F67FF]" />
                    </div>
                    <p className="text-sm font-medium text-[#111827]">Analizando información...</p>
                    <div className="max-w-xs mx-auto">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-[#4F67FF] h-2 rounded-full transition-all duration-300" style={{ width: `${progreso}%` }} />
                      </div>
                      <p className="text-xs text-[#6B7280] mt-2">{progreso < 30 ? 'Revisando datos fiscales...' : progreso < 60 ? 'Analizando obligaciones...' : progreso < 90 ? 'Generando recomendaciones...' : 'Finalizando...'}</p>
                    </div>
                  </div>
                )}

                {analisis && (
                  <div className="space-y-4">
                    {/* Score */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm text-center">
                      <p className="text-xs text-[#6B7280] mb-1">Puntuación de Integridad</p>
                      <p className="text-4xl font-bold text-[#4F67FF]">{analisis.puntuacionIntegridad}<span className="text-lg text-[#6B7280]">/100</span></p>
                      <p className="text-sm text-[#6B7280] mt-1">{analisis.puntuacionIntegridad < 40 ? 'Documentación insuficiente' : analisis.puntuacionIntegridad < 70 ? 'Documentación parcial' : 'Documentación completa'}</p>
                    </div>

                    {/* Alerts */}
                    <div className="space-y-2">
                      {analisis.alertasDetectadas.map((alerta: AlertaIAOnboarding, i: number) => (
                        <div key={i} className={cn(
                          'flex items-start gap-3 rounded-lg p-3',
                          alerta.tipo === 'riesgo' ? 'bg-red-50' : alerta.tipo === 'oportunidad' ? 'bg-yellow-50' : 'bg-blue-50'
                        )}>
                          <div className={cn(
                            'w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5',
                            alerta.tipo === 'riesgo' ? 'bg-red-200 text-red-700' : alerta.tipo === 'oportunidad' ? 'bg-yellow-200 text-yellow-700' : 'bg-blue-200 text-blue-700'
                          )}>!</div>
                          <div>
                            <p className={cn('text-sm font-medium', alerta.tipo === 'riesgo' ? 'text-red-700' : alerta.tipo === 'oportunidad' ? 'text-yellow-700' : 'text-blue-700')}>{alerta.titulo}</p>
                            <p className="text-xs text-[#6B7280] mt-0.5">{alerta.descripcion}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                      <h3 className="text-sm font-semibold text-[#111827] mb-3">Siguientes Pasos</h3>
                      <ul className="space-y-2">
                        {analisis.siguientesPasos.map((rec: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#111827]">
                            <Check size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Finalize */}
                    <div className="text-center pt-4">
                      <Link href="/clientes" className="inline-flex items-center gap-2 px-6 py-3 bg-[#22C55E] text-white font-medium rounded-lg hover:bg-[#1da34d] transition-colors">
                        <Check size={16} /> Completar Alta de Cliente
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom navigation */}
        {paso > 1 && paso < 6 && (
          <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-white">
            <button onClick={handlePrev} className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
              <ChevronLeft size={16} /> Anterior
            </button>
            <button onClick={handleNext} className="flex items-center gap-1.5 px-4 py-2 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0] transition-colors">
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        )}
        {paso === 6 && !analisis && (
          <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-white">
            <button onClick={handlePrev} className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
              <ChevronLeft size={16} /> Anterior
            </button>
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
