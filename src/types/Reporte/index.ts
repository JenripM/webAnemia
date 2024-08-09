export type ReporteEvolucionMensual = {
  años : string[],
  meses : number[],
  reporte : ReporteEvolucionGeneral[]
}

export type ReporteEvolucionGeneral = {
  date: string;
  moderada: number;
  severa: number;
  leve: number;
  normal: number;
  pronostico: number;
  totalAnemia: number;
}