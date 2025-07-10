describe("home page (login)", () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit("/");
  });

  describe("Elementos da página", () => {
    it("deve exibir todos os elementos necessários", () => {
      // Verifica se o título está presente
      cy.contains("CNC - Gestão de Catecúmenos").should("be.visible");

      // Verifica se a descrição está presente
      cy.contains(
        "Entre com seu email ou CPF para fazer login no sistema"
      ).should("be.visible");

      // Verifica se os campos de input estão presentes
      cy.get('input[id="email"]').should("be.visible");
      cy.get('input[id="password"]').should("be.visible");

      // Verifica se os labels estão presentes
      cy.contains("Email ou CPF").should("be.visible");

      // Verifica se o botão de login está presente
      cy.get("button").contains("Entrar").should("be.visible");

      // Verifica se o toggle de tema está presente
      cy.contains("Escolha o tema").should("be.visible");

      // Verifica se a imagem está presente (apenas em telas grandes)
      cy.get('img[alt="Image"]').should("exist");
    });

    it("deve ter placeholders corretos nos campos", () => {
      cy.get('input[id="email"]').should(
        "have.attr",
        "placeholder",
        "seuemail@example.com"
      );
      cy.get('input[id="password"]').should(
        "have.attr",
        "placeholder",
        "Sua senha secreta ..."
      );
    });
  });

  describe("Validações de formulário", () => {
    it("deve mostrar erro quando email estiver vazio", () => {
      // Clica no botão sem preencher os campos
      cy.get("button").contains("Entrar").click();

      // Verifica se a mensagem de erro aparece
      cy.contains("Informe o e-mail ou CPF").should("be.visible");
    });

    it("deve mostrar erro quando senha estiver vazia", () => {
      // Preenche apenas o email
      cy.get('input[id="email"]').type("teste@example.com");
      cy.get("button").contains("Entrar").click();

      // Verifica se a mensagem de erro aparece
      cy.contains("Informe a senha").should("be.visible");
    });

    it("deve limpar mensagens de erro ao tentar fazer login novamente", () => {
      // Primeiro, gera um erro
      cy.get("button").contains("Entrar").click();
      cy.contains("Informe o e-mail ou CPF").should("be.visible");

      // Preenche os campos e tenta novamente
      cy.get('input[id="email"]').type("teste@example.com");
      cy.get('input[id="password"]').type("senha123");

      // Intercepta a requisição para simular erro de credenciais
      cy.intercept("POST", "/api/ambrosio/auth/login", {
        statusCode: 401,
        body: { error: "Unauthorized" },
      }).as("loginRequest");

      cy.get("button").contains("Entrar").click();

      // Verifica se a mensagem de erro anterior foi limpa
      cy.contains("Informe o e-mail ou CPF").should("not.exist");
    });
  });

  describe("Funcionalidade de login", () => {
    it("deve mostrar estado de carregamento durante autenticação", () => {
      // Intercepta a requisição para adicionar delay
      cy.intercept("POST", "/api/ambrosio/auth/login", (req) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            req.reply({
              statusCode: 200,
              body: { success: true },
            });
          }, 2000);
        });
      }).as("loginRequest");

      // Preenche os campos
      cy.get('input[id="email"]').type("teste@example.com");
      cy.get('input[id="password"]').type("senha123");

      // Clica no botão de login
      cy.get("button").contains("Entrar").click();

      // Verifica se o botão de carregamento aparece
      cy.contains("Autenticando ...").should("be.visible");
      cy.get("button").contains("Entrar").should("not.exist");

      // Aguarda a requisição completar
      cy.wait("@loginRequest");
    });

    it("deve exibir erro para credenciais inválidas", () => {
      // Intercepta a requisição para simular erro 401
      cy.intercept("POST", "/api/ambrosio/auth/login", {
        statusCode: 401,
        body: { error: "Unauthorized" },
      }).as("loginRequest");

      // Preenche os campos
      cy.get('input[id="email"]').type("email@invalido.com");
      cy.get('input[id="password"]').type("senhaerrada");

      // Clica no botão de login
      cy.get("button").contains("Entrar").click();

      // Aguarda a requisição
      cy.wait("@loginRequest");

      // Verifica se a mensagem de erro aparece
      cy.contains("Credenciais inválidas").should("be.visible");

      // Verifica se o estado de carregamento foi removido
      cy.contains("Autenticando ...").should("not.exist");
      cy.get("button").contains("Entrar").should("be.visible");
    });

    it("deve redirecionar para dashboard com credenciais válidas", () => {
      cy.visit("/login");

      cy.get('input[id="email"]').type("admin@admin.com");
      cy.get('input[id="password"]').type("admin");

      cy.get("button").contains("Entrar").click();

      // Aguarda o redirecionamento após login real
      cy.url().should("include", "/dashboard");
    });

    it("deve tratar erros de rede", () => {
      // Intercepta para simular erro de rede
      cy.intercept("POST", "/api/ambrosio/auth/login", {
        forceNetworkError: true,
      }).as("loginRequest");

      // Preenche os campos
      cy.get('input[id="email"]').type("teste@example.com");
      cy.get('input[id="password"]').type("senha123");

      // Clica no botão de login
      cy.get("button").contains("Entrar").click();

      // Aguarda a tentativa de requisição
      cy.wait("@loginRequest");

      // Verifica se a mensagem de erro de rede aparece
      cy.contains("Erro ao tentar logar").should("be.visible");

      // Verifica se o estado de carregamento foi removido
      cy.contains("Autenticando ...").should("not.exist");
      cy.get("button").contains("Entrar").should("be.visible");
    });
  });

  describe("Interações da interface", () => {
    it("deve permitir digitar nos campos de entrada", () => {
      const emailTeste = "teste@example.com";
      const senhaTeste = "minhasenha123";

      // Digita no campo email
      cy.get('input[id="email"]').type(emailTeste);
      cy.get('input[id="email"]').should("have.value", emailTeste);

      // Digita no campo senha
      cy.get('input[id="password"]').type(senhaTeste);
      cy.get('input[id="password"]').should("have.value", senhaTeste);
    });

    it("deve mascarar o campo de senha", () => {
      cy.get('input[id="password"]').should("have.attr", "type", "password");
    });
  });
});
