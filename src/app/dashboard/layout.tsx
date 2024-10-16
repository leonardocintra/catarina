import Link from "next/link";
import {
  AlertCircleIcon,
  Bell,
  CalendarDays,
  Church,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Octagon,
  Package2,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarMenuItem from "@/components/custom/dashboard/sidebar-menu-item";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classNameIcon = "h-4 w-4";
  const classNameIconResponsive = "h-5 w-5";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">CNC Gestão</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className={classNameIcon} />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <SidebarMenuItem
                href="/dashboard"
                description="Dashboard"
                icon={<Home className={classNameIcon} />}
              />
              <SidebarMenuItem
                href="/dashboard/avisos"
                description="Avisos"
                icon={<AlertCircleIcon className={classNameIcon} />}
                badge="8"
              />

              <SidebarMenuItem
                href="/dashboard/comunidades"
                description="Comunidades"
                icon={<Octagon className={classNameIcon} />}
              />

              <SidebarMenuItem
                href="/dashboard/pessoas"
                description="Pessoas"
                icon={<Users className={classNameIcon} />}
              />

              <SidebarMenuItem
                href="/dashboard/paroquias"
                description="Paróquias"
                icon={<Church className={classNameIcon} />}
              />

              <SidebarMenuItem
                href="/dashboard/dioceses"
                description="Dioceses"
                icon={<Church className={classNameIcon} />}
              />

              <SidebarMenuItem
                href="/dashboard/relatorios"
                description="Relatórios"
                icon={<LineChart className={classNameIcon} />}
              />
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays /> <div>Evento</div>
                </CardTitle>
                <CardDescription>
                  Peregrinação de 50 anos Caminho Neocatecumenal no Brasil dia
                  14/07/2024 em Aparecida - SP
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0 flex space-x-2">
                <Button variant={"destructive"} size="sm" className="w-full">
                  Verificar
                </Button>
                <Button size="sm" className="w-full">
                  Ok
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className={classNameIconResponsive} />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">CNC - Gestão</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className={classNameIconResponsive} />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/avisos"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <AlertCircleIcon className={classNameIconResponsive} />
                  Avisos
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    8
                  </Badge>
                </Link>
                <Link
                  href="/dashboard/comunidades"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Octagon className={classNameIconResponsive} />
                  Comunidades
                </Link>
                <Link
                  href="/dashboard/paroquias"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Church className={classNameIconResponsive} />
                  Paroquias
                </Link>
                <Link
                  href="/dashboard/dioceses"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Church className={classNameIconResponsive} />
                  Dioceses
                </Link>
                <Link
                  href="/dashboard/pessoas"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className={classNameIconResponsive} />
                  Pessoas
                </Link>
                <Link
                  href="/dashboard/relatorios"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className={classNameIconResponsive} />
                  Relatórios
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className={classNameIconResponsive} />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Ajuda</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout / Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
