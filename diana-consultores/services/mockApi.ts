import {
  Cliente,
  Documento,
  MetricaDashboard,
  TareaUrgente,
  MovimientoFinanciero,
  DocumentoCliente,
  EstadoDocumento,
  Tarea,
  EstadoTarea,
  ComentarioTarea,
  NotaCliente,
  HistorialEvento,
  ArchivoCliente,
  CarpetaDoc,
  AsientoContable,
  ResumenContableTrimestre,
  ObligacionFiscal,
  DatosEmpresaOnboarding,
  ResultadoAnalisisIA,
} from '@/types';

function randomDelay(): Promise<void> {
  const ms = 400 + Math.random() * 400;
  return new Promise((r) => setTimeout(r, ms));
}

const clientes: Cliente[] = [
  {
    id: 'c1',
    nombre: 'Tech Innovación S.L.',
    cifNif: 'B12345678',
    email: 'admin@techinnovacion.es',
    telefono: '+34 612 345 678',
    regimen: 'sociedad_limitada',
    estadoTrimestre: 'en_proceso',
    asesorAsignado: 'Mapi y Ximo',
    fechaAlta: '2022-03-15',
    ultimaActividad: '2026-05-26',
    facturasEnBuzon: 5,
    alertas: ['IVA 2T pendiente de presentar', 'Falta factura proveedor mayo'],
  },
  {
    id: 'c2',
    nombre: 'María García Pérez',
    cifNif: '12345678A',
    email: 'maria.garcia@gmail.com',
    telefono: '+34 623 456 789',
    regimen: 'autonomo_profesional',
    estadoTrimestre: 'listo_para_presentar',
    asesorAsignado: 'Laura Fernández',
    fechaAlta: '2021-01-10',
    ultimaActividad: '2026-05-27',
    facturasEnBuzon: 0,
    alertas: [],
  },
  {
    id: 'c3',
    nombre: 'Restaurante El Palmeral S.L.',
    cifNif: 'B87654321',
    email: 'contabilidad@elpalmeral.es',
    telefono: '+34 634 567 890',
    regimen: 'estimacion_directa',
    estadoTrimestre: 'pendiente_documentacion',
    asesorAsignado: 'Mapi y Ximo',
    fechaAlta: '2020-06-01',
    ultimaActividad: '2026-05-20',
    facturasEnBuzon: 12,
    alertas: ['Faltan nóminas de abril y mayo', 'Extracto bancario pendiente'],
  },
  {
    id: 'c4',
    nombre: 'Fontanería Martínez',
    cifNif: '98765432B',
    email: 'jmartinez@fontaneria.com',
    telefono: '+34 645 678 901',
    regimen: 'estimacion_objetiva',
    estadoTrimestre: 'presentado',
    asesorAsignado: 'Laura Fernández',
    fechaAlta: '2019-11-20',
    ultimaActividad: '2026-05-15',
    facturasEnBuzon: 0,
    alertas: [],
  },
  {
    id: 'c5',
    nombre: 'Clínica Dental Sonrisa S.L.',
    cifNif: 'B11223344',
    email: 'admin@clinicasonrisa.es',
    telefono: '+34 656 789 012',
    regimen: 'sociedad_limitada',
    estadoTrimestre: 'en_proceso',
    asesorAsignado: 'Mapi y Ximo',
    fechaAlta: '2023-02-28',
    ultimaActividad: '2026-05-25',
    facturasEnBuzon: 3,
    alertas: ['Modelo 303 pendiente'],
  },
  {
    id: 'c6',
    nombre: 'Ana López Diseño',
    cifNif: '44556677C',
    email: 'ana@analopezdiseno.com',
    telefono: '+34 667 890 123',
    regimen: 'autonomo_profesional',
    estadoTrimestre: 'listo_para_presentar',
    asesorAsignado: 'Laura Fernández',
    fechaAlta: '2022-09-01',
    ultimaActividad: '2026-05-28',
    facturasEnBuzon: 2,
    alertas: ['IRPF 2T listo para revisión'],
  },
  {
    id: 'c7',
    nombre: 'Construcciones Pérez e Hijos S.L.',
    cifNif: 'B99887766',
    email: 'admin@construccionesperez.es',
    telefono: '+34 678 901 234',
    regimen: 'sociedad_limitada',
    estadoTrimestre: 'pendiente_documentacion',
    asesorAsignado: 'Mapi y Ximo',
    fechaAlta: '2018-04-10',
    ultimaActividad: '2026-05-22',
    facturasEnBuzon: 8,
    alertas: ['Faltan certificados de retención', 'IS pendiente documentación'],
  },
  {
    id: 'c8',
    nombre: 'Farmacia Central García',
    cifNif: '55667788D',
    email: 'farmacia.garcia@email.com',
    telefono: '+34 689 012 345',
    regimen: 'estimacion_directa',
    estadoTrimestre: 'presentado',
    asesorAsignado: 'Laura Fernández',
    fechaAlta: '2020-01-15',
    ultimaActividad: '2026-05-18',
    facturasEnBuzon: 1,
    alertas: [],
  },
];

const documentos: Documento[] = [
  {
    id: 'd1',
    clienteId: 'c1',
    clienteNombre: 'Tech Innovación S.L.',
    tipo: 'factura_recibida',
    nombre: 'Factura_Proveedor_Mayo_2026.pdf',
    estado: 'pendiente',
    fechaSubida: '2026-05-27T10:30:00Z',
    tamano: '2.3 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd2',
    clienteId: 'c1',
    clienteNombre: 'Tech Innovación S.L.',
    tipo: 'factura_emitida',
    nombre: 'Factura_Cliente_ProjectX.pdf',
    estado: 'validado',
    fechaSubida: '2026-05-20T14:15:00Z',
    tamano: '1.1 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd3',
    clienteId: 'c3',
    clienteNombre: 'Restaurante El Palmeral S.L.',
    tipo: 'factura_recibida',
    nombre: 'Factura_Alimentacion_Abril.pdf',
    estado: 'pendiente',
    fechaSubida: '2026-05-26T09:00:00Z',
    tamano: '3.5 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd4',
    clienteId: 'c3',
    clienteNombre: 'Restaurante El Palmeral S.L.',
    tipo: 'nomina',
    nombre: 'Nomina_Camarero_Abril.pdf',
    estado: 'procesado',
    fechaSubida: '2026-05-15T11:20:00Z',
    tamano: '0.8 MB',
    subidoPor: 'asesor',
  },
  {
    id: 'd5',
    clienteId: 'c5',
    clienteNombre: 'Clínica Dental Sonrisa S.L.',
    tipo: 'extracto_bancario',
    nombre: 'Extracto_BBVA_Mayo.pdf',
    estado: 'pendiente',
    fechaSubida: '2026-05-25T16:45:00Z',
    tamano: '0.5 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd6',
    clienteId: 'c6',
    clienteNombre: 'Ana López Diseño',
    tipo: 'factura_emitida',
    nombre: 'Factura_Diseno_Web_ClienteZ.pdf',
    estado: 'pendiente',
    fechaSubida: '2026-05-28T08:00:00Z',
    tamano: '1.8 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd7',
    clienteId: 'c7',
    clienteNombre: 'Construcciones Pérez e Hijos S.L.',
    tipo: 'contrato',
    nombre: 'Contrato_Obra_EdificioNuevo.pdf',
    estado: 'validado',
    fechaSubida: '2026-05-10T12:00:00Z',
    tamano: '4.2 MB',
    subidoPor: 'asesor',
  },
  {
    id: 'd8',
    clienteId: 'c7',
    clienteNombre: 'Construcciones Pérez e Hijos S.L.',
    tipo: 'factura_recibida',
    nombre: 'Factura_Materiales_Mayo.pdf',
    estado: 'rechazado',
    fechaSubida: '2026-05-22T10:00:00Z',
    tamano: '1.5 MB',
    subidoPor: 'cliente',
    notas: 'Factura ilegible, solicitar reenvío al proveedor',
  },
  {
    id: 'd9',
    clienteId: 'c2',
    clienteNombre: 'María García Pérez',
    tipo: 'factura_emitida',
    nombre: 'Factura_Consultoria_Abril.pdf',
    estado: 'validado',
    fechaSubida: '2026-05-05T09:30:00Z',
    tamano: '0.9 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd10',
    clienteId: 'c4',
    clienteNombre: 'Fontanería Martínez',
    tipo: 'factura_recibida',
    nombre: 'Factura_Material_Tuberia.pdf',
    estado: 'procesado',
    fechaSubida: '2026-05-12T14:00:00Z',
    tamano: '1.2 MB',
    subidoPor: 'cliente',
  },
  {
    id: 'd11',
    clienteId: 'c8',
    clienteNombre: 'Farmacia Central García',
    tipo: 'escritura',
    nombre: 'Escritura_Local_Comercial.pdf',
    estado: 'validado',
    fechaSubida: '2026-04-20T10:00:00Z',
    tamano: '5.1 MB',
    subidoPor: 'asesor',
  },
  {
    id: 'd12',
    clienteId: 'c5',
    clienteNombre: 'Clínica Dental Sonrisa S.L.',
    tipo: 'nomina',
    nombre: 'Nomina_Higienista_Mayo.pdf',
    estado: 'pendiente',
    fechaSubida: '2026-05-28T07:30:00Z',
    tamano: '0.7 MB',
    subidoPor: 'cliente',
  },
];

const tareasUrgentes: TareaUrgente[] = [
  {
    id: 't1',
    clienteId: 'c1',
    clienteNombre: 'Tech Innovación S.L.',
    descripcion: 'Presentar Modelo 303 - IVA 2T',
    fechaLimite: '2026-06-01',
    prioridad: 'alta',
    tipo: 'fiscal',
    completada: false,
  },
  {
    id: 't2',
    clienteId: 'c3',
    clienteNombre: 'Restaurante El Palmeral S.L.',
    descripcion: 'Solicitar nóminas pendientes abril-mayo',
    fechaLimite: '2026-05-30',
    prioridad: 'alta',
    tipo: 'laboral',
    completada: false,
  },
  {
    id: 't3',
    clienteId: 'c7',
    clienteNombre: 'Construcciones Pérez e Hijos S.L.',
    descripcion: 'Revisar certificados de retención para IS',
    fechaLimite: '2026-06-05',
    prioridad: 'media',
    tipo: 'fiscal',
    completada: false,
  },
  {
    id: 't4',
    clienteId: 'c6',
    clienteNombre: 'Ana López Diseño',
    descripcion: 'Validar facturas Q2 para IRPF',
    fechaLimite: '2026-06-03',
    prioridad: 'media',
    tipo: 'contable',
    completada: false,
  },
  {
    id: 't5',
    clienteId: 'c5',
    clienteNombre: 'Clínica Dental Sonrisa S.L.',
    descripcion: 'Presentar Modelo 111 retenciones',
    fechaLimite: '2026-06-08',
    prioridad: 'baja',
    tipo: 'fiscal',
    completada: false,
  },
  {
    id: 't6',
    clienteId: 'c2',
    clienteNombre: 'María García Pérez',
    descripcion: 'Preparar declaración trimestral IRPF',
    fechaLimite: '2026-06-10',
    prioridad: 'baja',
    tipo: 'fiscal',
    completada: false,
  },
];

const movimientosFinancieros: MovimientoFinanciero[] = [
  { mes: 'Dic', ingresos: 28500, gastos: 19200 },
  { mes: 'Ene', ingresos: 31200, gastos: 21000 },
  { mes: 'Feb', ingresos: 29800, gastos: 18500 },
  { mes: 'Mar', ingresos: 34500, gastos: 22100 },
  { mes: 'Abr', ingresos: 37800, gastos: 23400 },
  { mes: 'May', ingresos: 41200, gastos: 25600 },
];

const documentosCliente: DocumentoCliente[] = [
  {
    id: 'dc1',
    nombre: 'Modelo 303 - IVA Q1 2024',
    categoria: 'trimestral',
    subcategoria: '2024 - Q1',
    fechaDisponible: '2024-04-20',
    tamano: '0.4 MB',
    descargable: true,
  },
  {
    id: 'dc2',
    nombre: 'Modelo 303 - IVA Q2 2024',
    categoria: 'trimestral',
    subcategoria: '2024 - Q2',
    fechaDisponible: '2024-07-20',
    tamano: '0.4 MB',
    descargable: true,
  },
  {
    id: 'dc3',
    nombre: 'Modelo 303 - IVA Q3 2024',
    categoria: 'trimestral',
    subcategoria: '2024 - Q3',
    fechaDisponible: '2024-10-20',
    tamano: '0.5 MB',
    descargable: true,
  },
  {
    id: 'dc4',
    nombre: 'Nómina Enero 2026',
    categoria: 'nominas',
    subcategoria: 'Enero 2026',
    fechaDisponible: '2026-01-31',
    tamano: '0.3 MB',
    descargable: true,
  },
  {
    id: 'dc5',
    nombre: 'Nómina Febrero 2026',
    categoria: 'nominas',
    subcategoria: 'Febrero 2026',
    fechaDisponible: '2026-02-28',
    tamano: '0.3 MB',
    descargable: true,
  },
  {
    id: 'dc6',
    nombre: 'Nómina Marzo 2026',
    categoria: 'nominas',
    subcategoria: 'Marzo 2026',
    fechaDisponible: '2026-03-31',
    tamano: '0.3 MB',
    descargable: true,
  },
  {
    id: 'dc7',
    nombre: 'Nómina Abril 2026',
    categoria: 'nominas',
    subcategoria: 'Abril 2026',
    fechaDisponible: '2026-04-30',
    tamano: '0.3 MB',
    descargable: true,
  },
  {
    id: 'dc8',
    nombre: 'Escritura de Constitución',
    categoria: 'escrituras',
    subcategoria: 'Documentos fundacionales',
    fechaDisponible: '2020-03-15',
    tamano: '8.2 MB',
    descargable: true,
  },
  {
    id: 'dc9',
    nombre: 'Contrato Alquiler Local',
    categoria: 'escrituras',
    subcategoria: 'Contratos vigentes',
    fechaDisponible: '2023-01-10',
    tamano: '3.1 MB',
    descargable: true,
  },
  {
    id: 'dc10',
    nombre: 'Modelo 200 - IS 2023',
    categoria: 'trimestral',
    subcategoria: '2023 - Anual',
    fechaDisponible: '2024-07-25',
    tamano: '1.2 MB',
    descargable: true,
  },
];

// === API FUNCTIONS ===

export async function getClientes(): Promise<Cliente[]> {
  await randomDelay();
  return [...clientes];
}

export async function getClienteById(id: string): Promise<Cliente | undefined> {
  await randomDelay();
  return clientes.find((c) => c.id === id);
}

export async function getDocumentos(filtroEstado?: EstadoDocumento): Promise<Documento[]> {
  await randomDelay();
  if (filtroEstado) {
    return documentos.filter((d) => d.estado === filtroEstado);
  }
  return [...documentos];
}

export async function getMetricasDashboard(): Promise<MetricaDashboard> {
  await randomDelay();
  return {
    clientesActivos: 47,
    facturasPendientesRevision: 23,
    modelosPresentadosMes: 31,
    modelosPendientesMes: 8,
    alertasUrgentes: 5,
  };
}

export async function getTareasUrgentes(): Promise<TareaUrgente[]> {
  await randomDelay();
  return [...tareasUrgentes];
}

export async function validarDocumento(id: string): Promise<{ success: boolean; mensaje: string }> {
  await randomDelay();
  const success = Math.random() > 0.05;
  if (success) {
    const doc = documentos.find((d) => d.id === id);
    if (doc) doc.estado = 'validado';
    return { success: true, mensaje: `Documento validado y contabilizado correctamente` };
  }
  return { success: false, mensaje: 'Error al validar el documento. Inténtalo de nuevo.' };
}

export async function rechazarDocumento(
  id: string,
  motivo: string
): Promise<{ success: boolean }> {
  await randomDelay();
  const doc = documentos.find((d) => d.id === id);
  if (doc) {
    doc.estado = 'rechazado';
    doc.notas = motivo;
  }
  return { success: true };
}

export async function getMovimientosFinancieros(): Promise<MovimientoFinanciero[]> {
  await randomDelay();
  return [...movimientosFinancieros];
}

export async function getDocumentosCliente(): Promise<DocumentoCliente[]> {
  await randomDelay();
  return [...documentosCliente];
}

export async function subirDocumento(
  _archivo: File
): Promise<{ success: boolean; id: string; mensaje: string }> {
  await new Promise((r) => setTimeout(r, 1500));
  return {
    success: true,
    id: `doc_${Date.now()}`,
    mensaje: '¡Documento subido correctamente! Tu asesor lo revisará pronto.',
  };
}

// === MÓDULO 1: TAREAS ===
const tareasMock: Tarea[] = [
  { id: 'tk1', titulo: 'Presentar Modelo 303 Q2 - Tech Innovación', descripcion: 'Preparar y presentar IVA trimestral', clienteId: 'c1', clienteNombre: 'Tech Innovación S.L.', asignadoA: 'Mapi y Ximo', creadoPor: 'Laura Fernández', estado: 'en_progreso', prioridad: 'critica', categoria: 'fiscal', fechaLimite: '2026-06-01', fechaCreacion: '2026-05-15', etiquetas: ['IVA', 'urgente'], comentarios: [{ id: 'cm1', autor: 'Laura Fernández', texto: 'Faltan las facturas de mayo para cerrar', fecha: '2026-05-25T10:00:00Z' }], subtareas: [{ id: 'st1', texto: 'Recopilar facturas emitidas', completada: true }, { id: 'st2', texto: 'Recopilar facturas recibidas', completada: false }, { id: 'st3', texto: 'Calcular liquidación', completada: false }] },
  { id: 'tk2', titulo: 'Nóminas mayo - Restaurante El Palmeral', clienteId: 'c3', clienteNombre: 'Restaurante El Palmeral S.L.', asignadoA: 'Mapi y Ximo', creadoPor: 'Mapi y Ximo', estado: 'bloqueada', prioridad: 'alta', categoria: 'laboral', fechaLimite: '2026-05-30', fechaCreacion: '2026-05-20', etiquetas: ['nóminas'], comentarios: [{ id: 'cm2', autor: 'Mapi y Ximo', texto: 'El cliente no ha enviado el parte de horas', fecha: '2026-05-26T14:00:00Z' }], subtareas: [{ id: 'st4', texto: 'Recibir partes de horas', completada: false }, { id: 'st5', texto: 'Calcular nóminas', completada: false }] },
  { id: 'tk3', titulo: 'Revisión certificados retención - Construcciones Pérez', clienteId: 'c7', clienteNombre: 'Construcciones Pérez e Hijos S.L.', asignadoA: 'Laura Fernández', creadoPor: 'Mapi y Ximo', estado: 'backlog', prioridad: 'media', categoria: 'fiscal', fechaLimite: '2026-06-05', fechaCreacion: '2026-05-22', etiquetas: ['IS'], comentarios: [], subtareas: [] },
  { id: 'tk4', titulo: 'Validar facturas Q2 - Ana López', clienteId: 'c6', clienteNombre: 'Ana López Diseño', asignadoA: 'Laura Fernández', creadoPor: 'Laura Fernández', estado: 'en_progreso', prioridad: 'media', categoria: 'contable', fechaLimite: '2026-06-03', fechaCreacion: '2026-05-20', etiquetas: ['IRPF'], comentarios: [], subtareas: [{ id: 'st6', texto: 'Revisar facturas emitidas', completada: true }, { id: 'st7', texto: 'Revisar facturas recibidas', completada: true }, { id: 'st8', texto: 'Cuadrar con extractos', completada: false }] },
  { id: 'tk5', titulo: 'Presentar Modelo 111 - Clínica Dental', clienteId: 'c5', clienteNombre: 'Clínica Dental Sonrisa S.L.', asignadoA: 'Ana Martínez', creadoPor: 'Mapi y Ximo', estado: 'backlog', prioridad: 'baja', categoria: 'fiscal', fechaLimite: '2026-06-08', fechaCreacion: '2026-05-25', etiquetas: ['retenciones'], comentarios: [], subtareas: [] },
  { id: 'tk6', titulo: 'Preparar IRPF trimestral - María García', clienteId: 'c2', clienteNombre: 'María García Pérez', asignadoA: 'Laura Fernández', creadoPor: 'Laura Fernández', estado: 'en_revision', prioridad: 'media', categoria: 'fiscal', fechaLimite: '2026-06-10', fechaCreacion: '2026-05-18', etiquetas: ['IRPF', 'autónomo'], comentarios: [{ id: 'cm3', autor: 'Ana Martínez', texto: 'Todo correcto, puede presentarse', fecha: '2026-05-27T16:00:00Z' }], subtareas: [] },
  { id: 'tk7', titulo: 'Reunión equipo - Planificación junio', asignadoA: 'Mapi y Ximo', creadoPor: 'Mapi y Ximo', estado: 'backlog', prioridad: 'baja', categoria: 'reunion', fechaLimite: '2026-06-02', fechaCreacion: '2026-05-26', etiquetas: ['interna'], comentarios: [], subtareas: [] },
  { id: 'tk8', titulo: 'Actualizar tarifas 2026', asignadoA: 'Mapi y Ximo', creadoPor: 'Mapi y Ximo', estado: 'completada', prioridad: 'baja', categoria: 'admin', fechaCreacion: '2026-05-10', etiquetas: ['admin'], comentarios: [], subtareas: [] },
  { id: 'tk9', titulo: 'Impuesto Sociedades - Construcciones Pérez', clienteId: 'c7', clienteNombre: 'Construcciones Pérez e Hijos S.L.', asignadoA: 'Mapi y Ximo', creadoPor: 'Laura Fernández', estado: 'en_progreso', prioridad: 'alta', categoria: 'fiscal', fechaLimite: '2026-07-25', fechaCreacion: '2026-05-15', etiquetas: ['IS', 'anual'], comentarios: [], subtareas: [{ id: 'st9', texto: 'Cerrar contabilidad 2025', completada: true }, { id: 'st10', texto: 'Calcular resultado fiscal', completada: false }, { id: 'st11', texto: 'Presentar modelo 200', completada: false }] },
  { id: 'tk10', titulo: 'Contabilizar extractos mayo - Farmacia', clienteId: 'c8', clienteNombre: 'Farmacia Central García', asignadoA: 'Ana Martínez', creadoPor: 'Ana Martínez', estado: 'en_progreso', prioridad: 'media', categoria: 'contable', fechaLimite: '2026-06-05', fechaCreacion: '2026-05-28', etiquetas: ['contabilidad'], comentarios: [], subtareas: [] },
  { id: 'tk11', titulo: 'Revisar modelo 347 - Fontanería Martínez', clienteId: 'c4', clienteNombre: 'Fontanería Martínez', asignadoA: 'Laura Fernández', creadoPor: 'Mapi y Ximo', estado: 'completada', prioridad: 'media', categoria: 'fiscal', fechaCreacion: '2026-05-05', etiquetas: ['anual'], comentarios: [], subtareas: [] },
  { id: 'tk12', titulo: 'Alta nuevo empleado - Restaurante El Palmeral', clienteId: 'c3', clienteNombre: 'Restaurante El Palmeral S.L.', asignadoA: 'Ana Martínez', creadoPor: 'Mapi y Ximo', estado: 'en_revision', prioridad: 'alta', categoria: 'laboral', fechaLimite: '2026-05-31', fechaCreacion: '2026-05-24', etiquetas: ['alta SS'], comentarios: [], subtareas: [{ id: 'st12', texto: 'Recibir contrato firmado', completada: true }, { id: 'st13', texto: 'Tramitar alta en SS', completada: true }, { id: 'st14', texto: 'Confirmar con cliente', completada: false }] },
  { id: 'tk13', titulo: 'Formación - Nuevo software contable', asignadoA: 'Ana Martínez', creadoPor: 'Mapi y Ximo', estado: 'backlog', prioridad: 'baja', categoria: 'admin', fechaCreacion: '2026-05-20', etiquetas: ['formación'], comentarios: [], subtareas: [] },
  { id: 'tk14', titulo: 'Enviar informe trimestral a Clínica Dental', clienteId: 'c5', clienteNombre: 'Clínica Dental Sonrisa S.L.', asignadoA: 'Laura Fernández', creadoPor: 'Laura Fernández', estado: 'completada', prioridad: 'media', categoria: 'contable', fechaCreacion: '2026-05-12', etiquetas: ['informe'], comentarios: [], subtareas: [] },
  { id: 'tk15', titulo: 'Modelo 303 Q2 - Farmacia Central', clienteId: 'c8', clienteNombre: 'Farmacia Central García', asignadoA: 'Ana Martínez', creadoPor: 'Ana Martínez', estado: 'backlog', prioridad: 'alta', categoria: 'fiscal', fechaLimite: '2026-07-20', fechaCreacion: '2026-05-28', etiquetas: ['IVA'], comentarios: [], subtareas: [] },
];

export async function getTareas(filtros?: { estado?: EstadoTarea; asignadoA?: string; clienteId?: string }): Promise<Tarea[]> {
  await randomDelay();
  let resultado = [...tareasMock];
  if (filtros?.estado) resultado = resultado.filter((t) => t.estado === filtros.estado);
  if (filtros?.asignadoA) resultado = resultado.filter((t) => t.asignadoA === filtros.asignadoA);
  if (filtros?.clienteId) resultado = resultado.filter((t) => t.clienteId === filtros.clienteId);
  return resultado;
}

export async function crearTarea(data: Omit<Tarea, 'id' | 'fechaCreacion' | 'comentarios'>): Promise<Tarea> {
  await randomDelay();
  const nueva: Tarea = { ...data, id: `tk_${Date.now()}`, fechaCreacion: new Date().toISOString(), comentarios: [] };
  tareasMock.push(nueva);
  return nueva;
}

export async function actualizarEstadoTarea(id: string, estado: EstadoTarea): Promise<Tarea> {
  await randomDelay();
  const tarea = tareasMock.find((t) => t.id === id);
  if (tarea) tarea.estado = estado;
  return tarea!;
}

export async function añadirComentarioTarea(tareaId: string, texto: string): Promise<ComentarioTarea> {
  await randomDelay();
  const comentario: ComentarioTarea = { id: `cm_${Date.now()}`, autor: 'Mapi y Ximo', texto, fecha: new Date().toISOString() };
  const tarea = tareasMock.find((t) => t.id === tareaId);
  if (tarea) tarea.comentarios.push(comentario);
  return comentario;
}

// === MÓDULO 2: CRM EXTENDIDO ===
const notasCliente: NotaCliente[] = [
  { id: 'n1', clienteId: 'c1', autor: 'Mapi y Ximo', texto: 'Llamada para recordar facturas pendientes de mayo', fecha: '2026-05-26T10:30:00Z', tipo: 'llamada' },
  { id: 'n2', clienteId: 'c1', autor: 'Laura Fernández', texto: 'Enviado email con instrucciones para el IVA trimestral', fecha: '2026-05-24T14:00:00Z', tipo: 'email' },
  { id: 'n3', clienteId: 'c1', autor: 'Mapi y Ximo', texto: 'Reunión para revisar plan fiscal 2026', fecha: '2026-05-20T09:00:00Z', tipo: 'reunion' },
  { id: 'n4', clienteId: 'c3', autor: 'Mapi y Ximo', texto: 'Cliente informa de nuevo empleado para junio', fecha: '2026-05-22T11:00:00Z', tipo: 'llamada' },
  { id: 'n5', clienteId: 'c3', autor: 'Ana Martínez', texto: 'Pendiente recibir contrato del nuevo trabajador', fecha: '2026-05-23T15:30:00Z', tipo: 'nota_interna' },
];

const historialEventos: HistorialEvento[] = [
  { id: 'h1', clienteId: 'c1', descripcion: 'Modelo 303 Q1 2026 presentado', fecha: '2026-04-20T10:00:00Z', tipo: 'fiscal', autor: 'Mapi y Ximo' },
  { id: 'h2', clienteId: 'c1', descripcion: 'Documentación Q1 validada', fecha: '2026-04-15T09:00:00Z', tipo: 'documental', autor: 'Laura Fernández' },
  { id: 'h3', clienteId: 'c1', descripcion: 'Modelo 111 Q1 2026 presentado', fecha: '2026-04-20T10:30:00Z', tipo: 'fiscal', autor: 'Mapi y Ximo' },
  { id: 'h4', clienteId: 'c1', descripcion: 'Alta trabajador nuevo', fecha: '2026-03-01T08:00:00Z', tipo: 'laboral', autor: 'Ana Martínez' },
  { id: 'h5', clienteId: 'c1', descripcion: 'Cliente creado en el sistema', fecha: '2022-03-15T08:00:00Z', tipo: 'sistema', autor: 'Sistema' },
  { id: 'h6', clienteId: 'c3', descripcion: 'Modelo 303 Q1 2026 presentado', fecha: '2026-04-20T11:00:00Z', tipo: 'fiscal', autor: 'Mapi y Ximo' },
  { id: 'h7', clienteId: 'c3', descripcion: 'Nóminas abril procesadas', fecha: '2026-05-05T09:00:00Z', tipo: 'laboral', autor: 'Ana Martínez' },
];

export async function getNotasCliente(clienteId: string): Promise<NotaCliente[]> {
  await randomDelay();
  return notasCliente.filter((n) => n.clienteId === clienteId);
}

export async function crearNotaCliente(data: Omit<NotaCliente, 'id' | 'fecha'>): Promise<NotaCliente> {
  await randomDelay();
  const nota: NotaCliente = { ...data, id: `n_${Date.now()}`, fecha: new Date().toISOString() };
  notasCliente.push(nota);
  return nota;
}

export async function getHistorialCliente(clienteId: string): Promise<HistorialEvento[]> {
  await randomDelay();
  return historialEventos.filter((h) => h.clienteId === clienteId).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

// === MÓDULO 3: GESTIÓN DOCUMENTAL POR CLIENTE ===
const archivosCliente: ArchivoCliente[] = [
  { id: 'ac1', clienteId: 'c1', nombre: 'Factura_Proyecto_Alpha_Ene.pdf', carpeta: 'facturas_emitidas', subcarpeta: '2026 - Q1', tamano: '1.2 MB', fechaSubida: '2026-01-15T10:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac2', clienteId: 'c1', nombre: 'Factura_Proyecto_Beta_Feb.pdf', carpeta: 'facturas_emitidas', subcarpeta: '2026 - Q1', tamano: '0.9 MB', fechaSubida: '2026-02-20T11:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac3', clienteId: 'c1', nombre: 'Factura_Proyecto_Gamma_Mar.pdf', carpeta: 'facturas_emitidas', subcarpeta: '2026 - Q1', tamano: '1.1 MB', fechaSubida: '2026-03-18T09:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac4', clienteId: 'c1', nombre: 'Factura_AWS_Ene.pdf', carpeta: 'facturas_recibidas', subcarpeta: '2026 - Q1', tamano: '0.5 MB', fechaSubida: '2026-01-31T14:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac5', clienteId: 'c1', nombre: 'Factura_AWS_Feb.pdf', carpeta: 'facturas_recibidas', subcarpeta: '2026 - Q1', tamano: '0.5 MB', fechaSubida: '2026-02-28T14:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac6', clienteId: 'c1', nombre: 'Factura_Coworking_Q1.pdf', carpeta: 'facturas_recibidas', subcarpeta: '2026 - Q1', tamano: '0.3 MB', fechaSubida: '2026-03-31T10:00:00Z', subidoPor: 'cliente', validado: false },
  { id: 'ac7', clienteId: 'c1', nombre: 'Factura_Proveedor_Mayo.pdf', carpeta: 'facturas_recibidas', subcarpeta: '2026 - Q2', tamano: '2.3 MB', fechaSubida: '2026-05-27T10:30:00Z', subidoPor: 'cliente', validado: false },
  { id: 'ac8', clienteId: 'c1', nombre: 'Contrato_Alquiler_Oficina.pdf', carpeta: 'contratos', tamano: '3.5 MB', fechaSubida: '2022-03-15T08:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac9', clienteId: 'c1', nombre: 'Escritura_Constitucion.pdf', carpeta: 'escrituras', tamano: '8.2 MB', fechaSubida: '2022-03-15T08:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac10', clienteId: 'c1', nombre: 'Modelo_303_Q1_2026.pdf', carpeta: 'modelos_fiscales', subcarpeta: '2026 - Q1', tamano: '0.4 MB', fechaSubida: '2026-04-20T10:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac11', clienteId: 'c1', nombre: 'Modelo_111_Q1_2026.pdf', carpeta: 'modelos_fiscales', subcarpeta: '2026 - Q1', tamano: '0.3 MB', fechaSubida: '2026-04-20T10:30:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac12', clienteId: 'c1', nombre: 'Nomina_Dev_Senior_Ene.pdf', carpeta: 'nominas', subcarpeta: 'Enero 2026', tamano: '0.3 MB', fechaSubida: '2026-01-31T08:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac13', clienteId: 'c1', nombre: 'Nomina_Dev_Senior_Feb.pdf', carpeta: 'nominas', subcarpeta: 'Febrero 2026', tamano: '0.3 MB', fechaSubida: '2026-02-28T08:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac14', clienteId: 'c1', nombre: 'Nomina_Dev_Senior_Mar.pdf', carpeta: 'nominas', subcarpeta: 'Marzo 2026', tamano: '0.3 MB', fechaSubida: '2026-03-31T08:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac15', clienteId: 'c1', nombre: 'Nomina_Dev_Senior_Abr.pdf', carpeta: 'nominas', subcarpeta: 'Abril 2026', tamano: '0.3 MB', fechaSubida: '2026-04-30T08:00:00Z', subidoPor: 'asesor', validado: true },
  { id: 'ac16', clienteId: 'c1', nombre: 'Extracto_BBVA_Ene.pdf', carpeta: 'extractos', subcarpeta: 'Enero 2026', tamano: '1.0 MB', fechaSubida: '2026-02-01T09:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac17', clienteId: 'c1', nombre: 'Extracto_BBVA_Feb.pdf', carpeta: 'extractos', subcarpeta: 'Febrero 2026', tamano: '1.1 MB', fechaSubida: '2026-03-01T09:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac18', clienteId: 'c1', nombre: 'Extracto_BBVA_Mar.pdf', carpeta: 'extractos', subcarpeta: 'Marzo 2026', tamano: '1.0 MB', fechaSubida: '2026-04-01T09:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac19', clienteId: 'c1', nombre: 'Extracto_BBVA_Abr.pdf', carpeta: 'extractos', subcarpeta: 'Abril 2026', tamano: '1.2 MB', fechaSubida: '2026-05-01T09:00:00Z', subidoPor: 'cliente', validado: true },
  { id: 'ac20', clienteId: 'c1', nombre: 'Extracto_BBVA_May.pdf', carpeta: 'extractos', subcarpeta: 'Mayo 2026', tamano: '0.5 MB', fechaSubida: '2026-05-25T16:45:00Z', subidoPor: 'cliente', validado: false },
];

export async function getArchivosCliente(clienteId: string, carpeta?: CarpetaDoc): Promise<ArchivoCliente[]> {
  await randomDelay();
  let resultado = archivosCliente.filter((a) => a.clienteId === clienteId);
  if (carpeta) resultado = resultado.filter((a) => a.carpeta === carpeta);
  return resultado;
}

export async function subirArchivoCliente(clienteId: string, _archivo: File, carpeta: CarpetaDoc): Promise<ArchivoCliente> {
  await new Promise((r) => setTimeout(r, 1200));
  const nuevo: ArchivoCliente = { id: `ac_${Date.now()}`, clienteId, nombre: _archivo.name, carpeta, tamano: `${(_archivo.size / 1024 / 1024).toFixed(1)} MB`, fechaSubida: new Date().toISOString(), subidoPor: 'asesor', validado: false };
  archivosCliente.push(nuevo);
  return nuevo;
}

export async function eliminarArchivo(id: string): Promise<{ success: boolean }> {
  await randomDelay();
  const idx = archivosCliente.findIndex((a) => a.id === id);
  if (idx !== -1) archivosCliente.splice(idx, 1);
  return { success: true };
}

// === MÓDULO 4: CONTABILIDAD ===
const asientosContables: AsientoContable[] = [
  // Q1 2024
  { id: 'as1', clienteId: 'c1', fecha: '2024-01-15', concepto: 'Factura Proyecto Alpha', tipo: 'ingreso', importe: 12000, base: 9917.36, iva: 2082.64, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as2', clienteId: 'c1', fecha: '2024-01-31', concepto: 'Alquiler oficina enero', tipo: 'gasto', importe: -1500, base: -1239.67, iva: -260.33, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as3', clienteId: 'c1', fecha: '2024-02-15', concepto: 'Factura Proyecto Beta', tipo: 'ingreso', importe: 8500, base: 7024.79, iva: 1475.21, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as4', clienteId: 'c1', fecha: '2024-02-28', concepto: 'Nómina desarrollador', tipo: 'nomina', importe: -3200, base: -3200, iva: 0, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as5', clienteId: 'c1', fecha: '2024-03-15', concepto: 'Factura consultoría externa', tipo: 'gasto', importe: -2400, base: -1983.47, iva: -416.53, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as6', clienteId: 'c1', fecha: '2024-03-20', concepto: 'Factura Proyecto Gamma', tipo: 'ingreso', importe: 15000, base: 12396.69, iva: 2603.31, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as7', clienteId: 'c1', fecha: '2024-03-31', concepto: 'Cuota Seguridad Social', tipo: 'cuota_ss', importe: -950, base: -950, iva: 0, trimestre: 'Q1', año: 2024, contabilizado: true },
  { id: 'as8', clienteId: 'c1', fecha: '2024-03-31', concepto: 'Amortización equipos', tipo: 'amortizacion', importe: -500, base: -500, iva: 0, trimestre: 'Q1', año: 2024, contabilizado: true },
  // Q2 2024
  { id: 'as9', clienteId: 'c1', fecha: '2024-04-10', concepto: 'Factura Proyecto Delta', tipo: 'ingreso', importe: 18000, base: 14876.03, iva: 3123.97, trimestre: 'Q2', año: 2024, contabilizado: true },
  { id: 'as10', clienteId: 'c1', fecha: '2024-04-30', concepto: 'Alquiler oficina abril', tipo: 'gasto', importe: -1500, base: -1239.67, iva: -260.33, trimestre: 'Q2', año: 2024, contabilizado: true },
  { id: 'as11', clienteId: 'c1', fecha: '2024-05-15', concepto: 'Factura hosting anual', tipo: 'gasto', importe: -3600, base: -2975.21, iva: -624.79, trimestre: 'Q2', año: 2024, contabilizado: true },
  { id: 'as12', clienteId: 'c1', fecha: '2024-05-20', concepto: 'Factura Proyecto Epsilon', tipo: 'ingreso', importe: 9500, base: 7851.24, iva: 1648.76, trimestre: 'Q2', año: 2024, contabilizado: true },
  { id: 'as13', clienteId: 'c1', fecha: '2024-05-31', concepto: 'Nómina desarrollador', tipo: 'nomina', importe: -3200, base: -3200, iva: 0, trimestre: 'Q2', año: 2024, contabilizado: true },
  { id: 'as14', clienteId: 'c1', fecha: '2024-06-10', concepto: 'Factura Proyecto Zeta', tipo: 'ingreso', importe: 22000, base: 18181.82, iva: 3818.18, trimestre: 'Q2', año: 2024, contabilizado: true },
  { id: 'as15', clienteId: 'c1', fecha: '2024-06-30', concepto: 'Cuota Seguridad Social', tipo: 'cuota_ss', importe: -950, base: -950, iva: 0, trimestre: 'Q2', año: 2024, contabilizado: true },
  // Q3 2024
  { id: 'as16', clienteId: 'c1', fecha: '2024-07-12', concepto: 'Factura Proyecto Eta', tipo: 'ingreso', importe: 14000, base: 11570.25, iva: 2429.75, trimestre: 'Q3', año: 2024, contabilizado: true },
  { id: 'as17', clienteId: 'c1', fecha: '2024-07-31', concepto: 'Alquiler oficina julio', tipo: 'gasto', importe: -1500, base: -1239.67, iva: -260.33, trimestre: 'Q3', año: 2024, contabilizado: true },
  { id: 'as18', clienteId: 'c1', fecha: '2024-08-20', concepto: 'Factura Proyecto Theta', tipo: 'ingreso', importe: 11000, base: 9090.91, iva: 1909.09, trimestre: 'Q3', año: 2024, contabilizado: true },
  { id: 'as19', clienteId: 'c1', fecha: '2024-08-31', concepto: 'Nómina desarrollador', tipo: 'nomina', importe: -3200, base: -3200, iva: 0, trimestre: 'Q3', año: 2024, contabilizado: true },
  { id: 'as20', clienteId: 'c1', fecha: '2024-09-15', concepto: 'Material oficina', tipo: 'gasto', importe: -800, base: -661.16, iva: -138.84, trimestre: 'Q3', año: 2024, contabilizado: true },
  { id: 'as21', clienteId: 'c1', fecha: '2024-09-30', concepto: 'Cuota Seguridad Social', tipo: 'cuota_ss', importe: -950, base: -950, iva: 0, trimestre: 'Q3', año: 2024, contabilizado: true },
  // Q4 2024
  { id: 'as22', clienteId: 'c1', fecha: '2024-10-05', concepto: 'Factura Proyecto Iota', tipo: 'ingreso', importe: 20000, base: 16528.93, iva: 3471.07, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as23', clienteId: 'c1', fecha: '2024-10-31', concepto: 'Alquiler oficina octubre', tipo: 'gasto', importe: -1500, base: -1239.67, iva: -260.33, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as24', clienteId: 'c1', fecha: '2024-11-15', concepto: 'Factura Proyecto Kappa', tipo: 'ingreso', importe: 16000, base: 13223.14, iva: 2776.86, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as25', clienteId: 'c1', fecha: '2024-11-30', concepto: 'Nómina desarrollador', tipo: 'nomina', importe: -3400, base: -3400, iva: 0, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as26', clienteId: 'c1', fecha: '2024-12-10', concepto: 'Cena empresa navidad', tipo: 'gasto', importe: -450, base: -371.90, iva: -78.10, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as27', clienteId: 'c1', fecha: '2024-12-20', concepto: 'Factura Proyecto Lambda', tipo: 'ingreso', importe: 13000, base: 10743.80, iva: 2256.20, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as28', clienteId: 'c1', fecha: '2024-12-31', concepto: 'Cuota Seguridad Social', tipo: 'cuota_ss', importe: -950, base: -950, iva: 0, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as29', clienteId: 'c1', fecha: '2024-12-31', concepto: 'Amortización equipos', tipo: 'amortizacion', importe: -500, base: -500, iva: 0, trimestre: 'Q4', año: 2024, contabilizado: true },
  { id: 'as30', clienteId: 'c1', fecha: '2024-12-31', concepto: 'Seguro RC profesional', tipo: 'gasto', importe: -1200, base: -991.74, iva: -208.26, trimestre: 'Q4', año: 2024, contabilizado: false },
];

export async function getAsientosCliente(clienteId: string, trimestre?: string, año?: number): Promise<AsientoContable[]> {
  await randomDelay();
  let resultado = asientosContables.filter((a) => a.clienteId === clienteId);
  if (trimestre) resultado = resultado.filter((a) => a.trimestre === trimestre);
  if (año) resultado = resultado.filter((a) => a.año === año);
  return resultado;
}

export async function getResumenTrimestral(clienteId: string, año: number): Promise<ResumenContableTrimestre[]> {
  await randomDelay();
  const trimestres: ('Q1' | 'Q2' | 'Q3' | 'Q4')[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  return trimestres.map((t) => {
    const asientos = asientosContables.filter((a) => a.clienteId === clienteId && a.trimestre === t && a.año === año);
    const ingresos = asientos.filter((a) => a.importe > 0).reduce((s, a) => s + a.importe, 0);
    const gastos = Math.abs(asientos.filter((a) => a.importe < 0).reduce((s, a) => s + a.importe, 0));
    const ivaRep = asientos.filter((a) => a.iva > 0).reduce((s, a) => s + a.iva, 0);
    const ivaSop = Math.abs(asientos.filter((a) => a.iva < 0).reduce((s, a) => s + a.iva, 0));
    const ss = Math.abs(asientos.filter((a) => a.tipo === 'cuota_ss').reduce((s, a) => s + a.importe, 0));
    return { clienteId, trimestre: t, año, totalIngresos: ingresos, totalGastos: gastos, resultadoBruto: ingresos - gastos, ivaRepercutido: ivaRep, ivaSoportado: ivaSop, ivaNeto: ivaRep - ivaSop, cuotasSSEstimadas: ss };
  });
}

export async function crearAsiento(data: Omit<AsientoContable, 'id'>): Promise<AsientoContable> {
  await randomDelay();
  const nuevo: AsientoContable = { ...data, id: `as_${Date.now()}` };
  asientosContables.push(nuevo);
  return nuevo;
}

// === MÓDULO 5: IMPUESTOS ===
const obligacionesFiscales: ObligacionFiscal[] = [
  { id: 'of1', clienteId: 'c1', modelo: 'Modelo 303', periodo: 'Q1 2024', fechaLimite: '2024-04-20', estado: 'presentado', importeResultado: 3485.12, fechaPresentacion: '2024-04-18', numeroPresentacion: 'AEAT-2024-303-001' },
  { id: 'of2', clienteId: 'c1', modelo: 'Modelo 111', periodo: 'Q1 2024', fechaLimite: '2024-04-20', estado: 'presentado', importeResultado: 640, fechaPresentacion: '2024-04-18', numeroPresentacion: 'AEAT-2024-111-001' },
  { id: 'of3', clienteId: 'c1', modelo: 'Modelo 115', periodo: 'Q1 2024', fechaLimite: '2024-04-20', estado: 'presentado', importeResultado: 285, fechaPresentacion: '2024-04-19', numeroPresentacion: 'AEAT-2024-115-001' },
  { id: 'of4', clienteId: 'c1', modelo: 'Modelo 303', periodo: 'Q2 2024', fechaLimite: '2024-07-20', estado: 'presentado', importeResultado: 5707.79, fechaPresentacion: '2024-07-15', numeroPresentacion: 'AEAT-2024-303-002' },
  { id: 'of5', clienteId: 'c1', modelo: 'Modelo 111', periodo: 'Q2 2024', fechaLimite: '2024-07-20', estado: 'presentado', importeResultado: 640, fechaPresentacion: '2024-07-15', numeroPresentacion: 'AEAT-2024-111-002' },
  { id: 'of6', clienteId: 'c1', modelo: 'Modelo 303', periodo: 'Q3 2024', fechaLimite: '2024-10-20', estado: 'presentado', importeResultado: 3679.67, fechaPresentacion: '2024-10-18', numeroPresentacion: 'AEAT-2024-303-003' },
  { id: 'of7', clienteId: 'c1', modelo: 'Modelo 303', periodo: 'Q4 2024', fechaLimite: '2025-01-30', estado: 'presentado', importeResultado: 5165.64, fechaPresentacion: '2025-01-28', numeroPresentacion: 'AEAT-2024-303-004' },
  { id: 'of8', clienteId: 'c1', modelo: 'Modelo 390', periodo: 'Anual 2024', fechaLimite: '2025-01-30', estado: 'presentado', importeResultado: 0, fechaPresentacion: '2025-01-28', numeroPresentacion: 'AEAT-2024-390-001' },
  { id: 'of9', clienteId: 'c1', modelo: 'Modelo 200', periodo: 'Anual 2024', fechaLimite: '2025-07-25', estado: 'en_preparacion', importeResultado: 12500 },
  { id: 'of10', clienteId: 'c1', modelo: 'Modelo 347', periodo: 'Anual 2024', fechaLimite: '2025-02-28', estado: 'presentado', importeResultado: 0, fechaPresentacion: '2025-02-25', numeroPresentacion: 'AEAT-2024-347-001' },
  { id: 'of11', clienteId: 'c1', modelo: 'Modelo 303', periodo: 'Q1 2025', fechaLimite: '2025-04-20', estado: 'presentado', importeResultado: 4120.50, fechaPresentacion: '2025-04-17', numeroPresentacion: 'AEAT-2025-303-001' },
  { id: 'of12', clienteId: 'c1', modelo: 'Modelo 303', periodo: 'Q2 2025', fechaLimite: '2025-07-20', estado: 'pendiente' },
  { id: 'of13', clienteId: 'c1', modelo: 'Modelo 130', periodo: 'Q1 2024', fechaLimite: '2024-04-20', estado: 'no_aplica' },
  { id: 'of14', clienteId: 'c1', modelo: 'Modelo 349', periodo: 'Q1 2024', fechaLimite: '2024-04-20', estado: 'no_aplica' },
];

export async function getObligacionesFiscales(clienteId: string, año?: number): Promise<ObligacionFiscal[]> {
  await randomDelay();
  let resultado = obligacionesFiscales.filter((o) => o.clienteId === clienteId);
  if (año) resultado = resultado.filter((o) => o.periodo.includes(String(año)));
  return resultado;
}

export async function actualizarObligacion(id: string, data: Partial<ObligacionFiscal>): Promise<ObligacionFiscal> {
  await randomDelay();
  const ob = obligacionesFiscales.find((o) => o.id === id);
  if (ob) Object.assign(ob, data);
  return ob!;
}

export async function subirJustificante(_obligacionId: string, _archivo: File): Promise<{ documentoId: string }> {
  await new Promise((r) => setTimeout(r, 1200));
  return { documentoId: `doc_just_${Date.now()}` };
}

// === MÓDULO 6: ONBOARDING ===
export async function iniciarOnboarding(_datos: DatosEmpresaOnboarding): Promise<{ onboardingId: string }> {
  await randomDelay();
  return { onboardingId: `onb_${Date.now()}` };
}

export async function guardarPasoOnboarding(_onboardingId: string, _paso: number, _datos: unknown): Promise<{ success: boolean }> {
  await randomDelay();
  return { success: true };
}

export async function ejecutarAnalisisIA(_onboardingId: string): Promise<ResultadoAnalisisIA> {
  await new Promise((r) => setTimeout(r, 3000));
  return {
    resumenEjecutivo: 'Empresa de servicios tecnológicos con facturación creciente en régimen general de IVA trimestral. La actividad principal está correctamente encuadrada en el epígrafe IAE correspondiente. Se detecta una estructura fiscal sólida con margen de optimización en las deducciones por I+D y en la planificación de las retenciones a cuenta del IS.',
    regimenesDetectados: ['IVA General trimestral', 'Impuesto sobre Sociedades', 'Retenciones trabajo (Modelo 111)', 'Retenciones alquiler (Modelo 115)'],
    obligacionesFiscalesIdentificadas: ['Modelo 303 - IVA trimestral', 'Modelo 111 - Retenciones trabajadores', 'Modelo 115 - Retenciones alquiler', 'Modelo 200 - Impuesto Sociedades anual', 'Modelo 347 - Operaciones con terceros', 'Modelo 390 - Resumen anual IVA'],
    alertasDetectadas: [
      { tipo: 'riesgo', titulo: 'Cierre de ejercicio pendiente', descripcion: 'El ejercicio anterior no fue cerrado por la gestoría previa. Es necesario regularizar los libros contables antes del próximo plazo fiscal.' },
      { tipo: 'oportunidad', titulo: 'Deducción por I+D aplicable', descripcion: 'Dado el tipo de actividad (desarrollo de software), es posible aplicar deducciones por I+D que pueden suponer un ahorro del 25% en la cuota del IS.' },
      { tipo: 'info', titulo: 'Operaciones intracomunitarias', descripcion: 'Si se inician ventas a la UE, será necesario darse de alta en el ROI y presentar el Modelo 349.' },
    ],
    documentacionFaltante: ['Último balance de sumas y saldos', 'Libro de IVA del ejercicio anterior', 'Certificado de retenciones emitido por clientes'],
    siguientesPasos: ['Solicitar documentación contable al gestor anterior', 'Regularizar cierre del ejercicio 2025', 'Alta en nuestro sistema de facturación', 'Planificar calendario fiscal Q3 2026', 'Reunión inicial con el asesor asignado'],
    puntuacionIntegridad: 72,
  };
}
