# Docs de Domínio

Como as skills de engenharia devem consumir a documentação de domínio deste repositório ao explorar o código.

## Antes de explorar, leia estes

- **`CONTEXT.md`** na raiz do repositório, ou
- **`CONTEXT-MAP.md`** na raiz do repositório, se existir: ele aponta para um `CONTEXT.md` por contexto. Leia cada um relevante ao tópico.
- **`docs/adr/`**: leia os ADRs que tocam a área em que você está prestes a trabalhar. Em repositórios multi-contexto, verifique também `src/<contexto>/docs/adr/` para decisões específicas do contexto.

Se algum desses arquivos não existir, **prossiga em silêncio**. Não sinalize a ausência; não sugira criá-los de antemão. A skill `/domain-modeling` (acessível via `/grill-with-docs` e `/improve-codebase-architecture`) cria-os preguiçosamente quando termos ou decisões realmente forem resolvidos.

## Estrutura de arquivos

Repositório single-context (a maioria dos repositórios):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Repositório multi-contexto (presença de `CONTEXT-MAP.md` na raiz):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← decisões de todo o sistema
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← decisões específicas do contexto
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use o vocabulário do glossário

Quando sua saída nomear um conceito de domínio (em um título de issue, uma proposta de refatoração, uma hipótese, um nome de teste), use o termo conforme definido em `CONTEXT.md`. Não derive para sinônimos que o glossário evita explicitamente.

Se o conceito de que você precisa ainda não está no glossário, isso é um sinal: ou você está inventando linguagem que o projeto não usa (reconsidere) ou há uma lacuna real (anote para `/domain-modeling`).

## Sinalize conflitos com ADRs

Se sua saída contradiz um ADR existente, exponha isso explicitamente em vez de sobrepor silenciosamente:

> _Contradiz o ADR-0007 (event-sourced orders), mas vale reabrir porque…_
