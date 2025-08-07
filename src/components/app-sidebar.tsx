"use client";

import * as React from "react";
import {
  ChurchIcon,
  GalleryVerticalEnd,
  Map,
  MonitorUpIcon,
  NotepadTextDashedIcon,
  PieChart,
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
    logo: GalleryVerticalEnd,
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
          title: "Dioceses",
          url: "/dashboard/dioceses",
        },
        {
          title: "Paroquias",
          url: "/dashboard/paroquias",
        },
        {
          title: "Localidades",
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
      ],
    },
  ],
  projects: [
    {
      name: "Passaportes",
      url: "#",
      icon: Map,
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
      </SidebarFooter>
      <SidebarFooter className="text-xs font-extralight uppercase text-center">
        Versão: {versao}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
