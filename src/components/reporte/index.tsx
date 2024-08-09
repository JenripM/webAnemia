import Pronostico from "./sections/pronostico/pronostico";
import ReportePorPaciente from "./sections/por-paciente/reporte-por-paciente";
interface ContentProps {
  title: string;
}

export default function Reporte(props: ContentProps) {
  return (
    <section className="flex flex-col gap-8">
      <ReportePorPaciente/>
    </section>
  )
}
