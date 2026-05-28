// === DOMINIO FISCAL ===
export type EstadoTrimestre =
  | 'en_proceso'
  | 'listo_para_presentar'
  | 'presentado'
  | 'pendiente_documentacion';

export type RegimenFiscal =
  | 'estimacion_directa'
  | 'estimacion_objetiva'
  | 'sociedad_limitada'
  | 'autonomo_profesional';

export type EstadoDocumento =
  | 'pendiente'
  | 'procesado'
  | 'rechazado'
  | 'validado';

export type TipoDocumento =
  | 'factura_emitida'
  | 'factura_recibida'
  | 'nomina'
  | 'extracto_bancario'
  | 'contrato'
  | 'escritura';

// === ENTIDADES ===
export interface Cliente {
  id: string;
  nombre: string;
  cifNif: string;
  email: string;
  telefono: string;
  regimen: RegimenFiscal;
  estadoTrimestre: EstadoTrimestre;
  asesorAsignado: string;
  fechaAlta: string;
  ultimaActividad: string;
  facturasEnBuzon: number;
  alertas: string[];
}

export interface Documento {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: TipoDocumento;
  nombre: string;
  estado: EstadoDocumento;
  fechaSubida: string;
  tamano: string;
  subidoPor: 'cliente' | 'asesor';
  notas?: string;
}

export interface MetricaDashboard {
  clientesActivos: number;
  facturasPendientesRevision: number;
  modelosPresentadosMes: number;
  modelosPendientesMes: number;
  alertasUrgentes: number;
}

export interface TareaUrgente {
  id: string;
  clienteId: string;
  clienteNombre: string;
  descripcion: string;
  fechaLimite: string;
  prioridad: 'alta' | 'media' | 'baja';
  tipo: 'fiscal' | 'laboral' | 'contable';
  completada: boolean;
}

// === PORTAL CLIENTE ===
export interface MovimientoFinanciero {
  mes: string;
  ingresos: number;
  gastos: number;
}

export interface DocumentoCliente {
  id: string;
  nombre: string;
  categoria: 'trimestral' | 'nominas' | 'escrituras' | 'otros';
  subcategoria: string;
  fechaDisponible: string;
  tamano: string;
  descargable: boolean;
}

// === MÓDULO 1: GESTIÓN DE TAREAS ===
export type EstadoTarea = 'backlog' | 'en_progreso' | 'en_revision' | 'completada' | 'bloqueada';
export type PrioridadTarea = 'critica' | 'alta' | 'media' | 'baja';
export type CategoriaTarea = 'fiscal' | 'laboral' | 'contable' | 'admin' | 'reunion';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  clienteId?: string;
  clienteNombre?: string;
  asignadoA: string;
  creadoPor: string;
  estado: EstadoTarea;
  prioridad: PrioridadTarea;
  categoria: CategoriaTarea;
  fechaLimite?: string;
  fechaCreacion: string;
  etiquetas: string[];
  comentarios: ComentarioTarea[];
  subtareas: Subtarea[];
}

export interface Subtarea {
  id: string;
  texto: string;
  completada: boolean;
}

export interface ComentarioTarea {
  id: string;
  autor: string;
  texto: string;
  fecha: string;
}

// === MÓDULO 2: CRM EXTENDIDO ===
export interface NotaCliente {
  id: string;
  clienteId: string;
  autor: string;
  texto: string;
  fecha: string;
  tipo: 'llamada' | 'email' | 'reunion' | 'nota_interna';
}

export interface HistorialEvento {
  id: string;
  clienteId: string;
  descripcion: string;
  fecha: string;
  tipo: 'fiscal' | 'documental' | 'laboral' | 'sistema';
  autor: string;
}

// === MÓDULO 3: GESTIÓN DOCUMENTAL POR CLIENTE ===
export type CarpetaDoc =
  | 'facturas_emitidas'
  | 'facturas_recibidas'
  | 'contratos'
  | 'escrituras'
  | 'modelos_fiscales'
  | 'nominas'
  | 'extractos';

export interface ArchivoCliente {
  id: string;
  clienteId: string;
  nombre: string;
  carpeta: CarpetaDoc;
  subcarpeta?: string;
  tamano: string;
  fechaSubida: string;
  subidoPor: 'cliente' | 'asesor';
  validado: boolean;
  url?: string;
  notas?: string;
}

// === MÓDULO 4: CONTABILIDAD ===
export type TipoAsiento = 'ingreso' | 'gasto' | 'amortizacion' | 'nomina' | 'cuota_ss' | 'iva_soportado' | 'iva_repercutido';

export interface AsientoContable {
  id: string;
  clienteId: string;
  fecha: string;
  concepto: string;
  tipo: TipoAsiento;
  importe: number;
  base: number;
  iva: number;
  trimestre: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  año: number;
  documentoId?: string;
  contabilizado: boolean;
}

export interface ResumenContableTrimestre {
  clienteId: string;
  trimestre: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  año: number;
  totalIngresos: number;
  totalGastos: number;
  resultadoBruto: number;
  ivaRepercutido: number;
  ivaSoportado: number;
  ivaNeto: number;
  cuotasSSEstimadas: number;
}

// === MÓDULO 5: IMPUESTOS ===
export type ModeloFiscal =
  | 'Modelo 303'
  | 'Modelo 130'
  | 'Modelo 111'
  | 'Modelo 115'
  | 'Modelo 347'
  | 'Modelo 349'
  | 'Modelo 100'
  | 'Modelo 200'
  | 'Modelo 390';

export type EstadoModelo =
  | 'no_aplica'
  | 'pendiente'
  | 'en_preparacion'
  | 'listo_para_presentar'
  | 'presentado'
  | 'domiciliado';

export interface ObligacionFiscal {
  id: string;
  clienteId: string;
  modelo: ModeloFiscal;
  periodo: string;
  fechaLimite: string;
  estado: EstadoModelo;
  importeResultado?: number;
  fechaPresentacion?: string;
  numeroPresentacion?: string;
  documentoId?: string;
  notas?: string;
}

// === MÓDULO 6: ONBOARDING ===
export interface DatosEmpresaOnboarding {
  razonSocial: string;
  cifNif: string;
  formaJuridica: 'autonomo' | 'sl' | 'sa' | 'cooperativa' | 'comunidad_bienes';
  actividadPrincipal: string;
  epigrafe: string;
  fechaConstitucion?: string;
  domicilioFiscal: string;
  municipio: string;
  codigoPostal: string;
}

export interface SituacionFiscalOnboarding {
  regimenIVA: 'general' | 'simplificado' | 'recargo_equivalencia' | 'exento';
  periodicidadIVA: 'trimestral' | 'mensual';
  tieneEmpleados: boolean;
  numEmpleados?: number;
  epigrafeIAE: string;
  tieneLocalAlquilado: boolean;
  operacionesIntracomunitarias: boolean;
  ventasOnline: boolean;
  ventasExtranjero: boolean;
  estimacionFacturacionAnual: '<50k' | '50k-150k' | '150k-500k' | '>500k';
}

export interface GestoriaAnteriorOnboarding {
  tieneGestoriaAnterior: boolean;
  nombreGestoria?: string;
  motivoCambio?: string;
  pendienteCierreEjercicio: boolean;
  ultimaDeclaracionPresentada?: string;
}

export interface AlertaIAOnboarding {
  tipo: 'riesgo' | 'oportunidad' | 'info';
  titulo: string;
  descripcion: string;
}

export interface ResultadoAnalisisIA {
  resumenEjecutivo: string;
  regimenesDetectados: string[];
  obligacionesFiscalesIdentificadas: string[];
  alertasDetectadas: AlertaIAOnboarding[];
  documentacionFaltante: string[];
  siguientesPasos: string[];
  puntuacionIntegridad: number;
}
