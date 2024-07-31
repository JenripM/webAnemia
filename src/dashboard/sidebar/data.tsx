import { DocIcon } from "./icons/DocIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { TaskIcon } from "./icons/TaskIcon";
import { ReportIcon } from "./icons/ReportIcon";
import { ProjectIcon } from "./icons/ProjectIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { CalendarIcon } from "./icons/CalendarIcon";
import { TimeManageIcon } from "./icons/TimeManageIcon";

export const data = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Predecir Anemia",
    icon: <ProjectIcon />,
    link: "/guest/tipoanemia",
  },
  {
    title: "Pronostico de Prevalencia",
    icon: <ProjectIcon />,
    link: "/admin/tasks",
  },
  {
    title: "Probabilidad en base a dieta",
    icon: <ProjectIcon />,
    link: "/guest/dieta",
  },
  {
    title: "Historial",
    icon: <ProjectIcon />,
    link: "/admin/time-manage",
  },
  {
    title: "Usuarios",
    icon: <ProjectIcon />,
    link: "/admin/reports",
  },
  {
    title: "Cerrar Sesion",
    icon: <ProjectIcon />,
    link: "/admin/settings",
  },
];
