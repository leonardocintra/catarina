# Issue tracker: GitHub

Issues e specs deste repositório vivem como issues do GitHub. Use o CLI `gh` para todas as operações.

## Convenções

- **Criar uma issue**: `gh issue create --title "..." --body "..."`. Use heredoc para corpos com múltiplas linhas.
- **Ler uma issue**: `gh issue view <numero> --comments`, filtrando comentários com `jq` e também buscando os labels.
- **Listar issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` com os filtros `--label` e `--state` apropriados.
- **Comentar em uma issue**: `gh issue comment <numero> --body "..."`
- **Aplicar / remover labels**: `gh issue edit <numero> --add-label "..."` / `--remove-label "..."`
- **Fechar**: `gh issue close <numero> --comment "..."`

Infira o repositório a partir de `git remote -v`; o `gh` faz isso automaticamente quando executado dentro de um clone.

## Pull requests como superfície de triagem

**PRs como superfície de solicitações: não.** _(Mude para `sim` se este repositório trata PRs externos como pedidos de funcionalidade; o `/triage` lê esta flag.)_

Quando definido como `sim`, os PRs passam pelos mesmos labels e estados das issues, usando os equivalentes `gh pr`:

- **Ler um PR**: `gh pr view <numero> --comments` e `gh pr diff <numero>` para o diff.
- **Listar PRs externos para triagem**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` e mantenha apenas `authorAssociation` igual a `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR` ou `NONE` (descarte `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comentar / rotular / fechar**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

O GitHub compartilha um único espaço de numeração entre issues e PRs, então um `#42` isolado pode ser qualquer um dos dois: resolva com `gh pr view 42` e recorra a `gh issue view 42`.

## Quando uma skill diz "publicar no issue tracker"

Crie uma issue do GitHub.

## Quando uma skill diz "buscar o ticket relevante"

Execute `gh issue view <numero> --comments`.

## Operações do wayfinding

Usadas pelo `/wayfinder`. O **mapa** é uma única issue com **issues-filhas** como tickets.

- **Mapa**: uma única issue rotulada `wayfinder:map`, contendo o corpo com Notas / Decisões-até-agora / Névoa. `gh issue create --label wayfinder:map`.
- **Ticket-filho**: uma issue vinculada ao mapa como sub-issue do GitHub (via `gh api` no endpoint de sub-issues). Onde sub-issues não estiverem habilitadas, adicione o filho a uma task list no corpo do mapa e coloque `Part of #<mapa>` no topo do corpo do filho. Labels: `wayfinder:<tipo>` (`research`/`prototype`/`grilling`/`task`). Uma vez assumido, o ticket é atribuído ao dev condutor.
- **Bloqueio**: as **dependências nativas de issues** do GitHub, a representação canônica e visível na UI. Adicione uma aresta com `gh api --method POST repos/<owner>/<repo>/issues/<filho>/dependencies/blocked_by -F issue_id=<id-db-do-bloqueador>`, onde `<id-db-do-bloqueador>` é o **database id** numérico do bloqueador (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _não_ o `#numero` nem o `node_id`). O GitHub reporta `issue_dependencies_summary.blocked_by` (apenas bloqueadores abertos, o portão ao vivo). Onde dependências não estiverem disponíveis, recorra a uma linha `Blocked by: #<n>, #<n>` no topo do corpo do filho. Um ticket está desbloqueado quando todos os bloqueadores estão fechados.
- **Consulta de fronteira**: liste os filhos abertos do mapa (`gh issue list --state open`, limitados às sub-issues / task list do mapa), descarte qualquer um com um bloqueador aberto (`issue_dependencies_summary.blocked_by > 0`, ou uma issue aberta na linha `Blocked by`) ou com um responsável; o primeiro na ordem do mapa vence.
- **Assumir**: `gh issue edit <n> --add-assignee @me`, a primeira escrita da sessão.
- **Resolver**: `gh issue comment <n> --body "<resposta>"`, depois `gh issue close <n>`, depois anexe um ponteiro de contexto (gist + link) às Decisões-até-agora do mapa.
