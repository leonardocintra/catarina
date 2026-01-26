"use client";

import { useUser } from "@/app/context/user-provider";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListUsuarios from "@/components/custom/dashboard/usuarios/list-usuarios";
import UnauthorizedAccessAlert from "@/components/custom/ui/AlertSemCadastroOuPermissao";
import { ROLE_ADMIN } from "@/constants";

export default function UsuariosPage() {
  const { user } = useUser();

  if (user?.role !== ROLE_ADMIN) {
    return <UnauthorizedAccessAlert title="Usuários" />;
  }

  return (
    <div className="space-y-6">
      <PageSubtitle
        title="Usuários"
        subTitle="Gerenciar usuários do sistema"
        buttons={[
          {
            buttonText: "Novo usuário",
            buttonUrl: "/dashboard/usuarios/novo",
            buttonShow: true,
            buttonVariant: "default",
          },
        ]}
      />

      <ListUsuarios />
    </div>
  );
}
