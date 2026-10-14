# Proposta
Salvar as paroquias que o usuario vai administrar.

## Pagina que vamos trabalhar
/src/components/custom/dashboard/usuarios/paroquias-usuario.tsx
e
/src/app/dashboard/(configuracoes)/usuarios/[id]/page.tsx

## API 

GET {ambrosio}/users/:id
```json
{
    "server": "localhost/users/cmv45q6cu0000r79zm8rnf0u7",
    "total": 1,
    "page": 1,
    "limit": 1,
    "data": {
        "id": "cmv45q6cu0000r79zm8rnf0u7",
        "email": "admin@admin.com",
        "password": "$2b$10$.TT7jgY.IqTW/3qg9RXw4.y20H4ROVqfj0TIjBi5l9ks2fb5ueQsC",
        "role": "ADMIN",
        "whatsapp": "16999739999",
        "verifiedWhatsapp": false,
        "active": true,
        "createdAt": "2026-10-11T18:29:06.606Z",
        "updatedAt": "2026-10-11T18:29:06.606Z",
        "pessoaId": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "usuarioParoquias": [
            {
                "id": 11,
                "descricao": "Catedral N. Sra. do Desterro"
            },
            {
                "id": 1,
                "descricao": "Paróquia Nossa Senhora Aparecida"
            }
        ]
    }
}
```

sera retornada no GET /src/app/api/ambrosio/user/[id]/route.ts

-----------
PATCH {ambrosio}/users/:id/paroquias

Onde :id = id do usuario e deve passar no body um atributo chamado "paroquiaIds" que é um array de numeros interios
que é o id das paroquias listada na pagina /src/components/custom/dashboard/usuarios/paroquias-usuario.tsx

## O que vai fazer
- Criar a rota de PATCH em /src/app/api/ambrosio/user/[id]/route.ts Que vai salvar o PATCH com os ids das paroquias
- No card que mostra os dados do usuario, listar as paroquias que ele esta responsavel
- Na pagina que lista as paroquias que ele será resopnsavel, implementar o botão salvar que vai chamar o PATCH



