# Catarina

Front administrativo para manipulação dos dados do Caminho (Neocatecumenal). Este contexto cobre o back-office usado pela equipe (CNC) para gerenciar pessoas, usuários e configurações.

## Language

**Usuário**:
Credencial de acesso ao sistema (email, WhatsApp, papel e status ativo), opcionalmente vinculada a uma Pessoa.
_Avoid_: conta, login, acesso

**Pessoa**:
O fiel inscrito na base do Caminho, com dados civis e religiosos; pode ter um Usuário vinculado.
_Avoid_: membro, cadastro, cliente

**Papel**:
O nível de permissão de um Usuário (ex.: `ADMIN`, `SECRETARIA_CNC`, `NAO_IDENTIFICADO`).
_Avoid_: perfil, tipo de usuário
