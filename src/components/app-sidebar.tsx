"use client";

import * as React from "react";
import {
  ChurchIcon,
  GithubIcon,
  Map,
  MonitorCogIcon,
  MonitorUpIcon,
  NotepadTextDashedIcon,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavOutros } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { ProjectCNCSwitcher } from "@/components/projectcnc-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  cnc: {
    name: "CNC - Gestão",
    logo: ChurchIcon,
    subTitle: "Caminho Neocatecumenal",
  },
  navMain: [
    {
      title: "Nucleo",
      url: "#",
      icon: MonitorUpIcon,
      isActive: true,
      items: [
        {
          title: "Pessoas",
          url: "/dashboard/pessoas",
        },
        {
          title: "Comunidades",
          url: "/dashboard/comunidades",
        },
      ],
    },
    {
      title: "Pontos fisicos",
      url: "#",
      icon: ChurchIcon,
      isActive: true,
      items: [
        {
          title: "Macro Região",
          url: "/dashboard/macro-regiao",
        },
        {
          title: "Setor",
          url: "/dashboard/setores",
        },
        {
          title: "Diocese",
          url: "/dashboard/dioceses",
        },
        {
          title: "Paroquia",
          url: "/dashboard/paroquias",
        },
        {
          title: "Localidade",
          url: "/dashboard/localidade",
        },
      ],
    },
    {
      title: "Relatorios",
      url: "#",
      icon: NotepadTextDashedIcon,
      items: [
        {
          title: "Comunidades",
          url: "#",
        },
        {
          title: "Região",
          url: "#",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "País",
          url: "/dashboard/pais",
        },
        {
          title: "Cidades",
          url: "/dashboard/cidades",
        },
        {
          title: "Carismas",
          url: "/dashboard/carismas",
        },
        {
          title: "Etapas",
          url: "/dashboard/etapas",
        },
        {
          title: "Usuários",
          url: "/dashboard/usuarios",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Passaportes",
      url: "#",
      icon: Map,
    },
    {
      name: "Github / Codigo",
      url: "https://github.com/leonardocintra/catarina",
      icon: GithubIcon,
    },
    {
      name: "Status",
      url: "https://kuma.ypg4r9.easypanel.host/status/cnc",
      icon: MonitorCogIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [versao, setVersao] = React.useState("0.0.1");

  React.useEffect(() => {
    const res = fetch("/api/catarina/version", {
      cache: "no-cache",
    });
    res.then((res) => res.json()).then((data) => setVersao(data.version));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectCNCSwitcher cnc={data.cnc} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOutros projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        <div className="flex justify-center items-center text-orange-600 font-semibold space-x-2">
          <MonitorCogIcon size={"16px"} />
          <div className="text-xs">v{versao}</div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
