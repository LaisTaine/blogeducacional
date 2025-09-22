# Blog Education - Frontend

## 📝 Descrição do Projeto

Este é o repositório do frontend para a aplicação Blog Education, desenvolvida como parte do Tech Challenge da Pós-Graduação em Full Stack Development. A interface foi construída com React e TypeScript, focando em uma experiência de usuário intuitiva tanto para alunos quanto para professores.

## ✨ Funcionalidades Principais

-   Visualização pública de posts.
-   Busca por posts.
-   Área administrativa protegida por login para professores.
-   Gerenciamento completo de posts (Criar, Ler, Atualizar e Deletar - CRUD).

## 🛠️ Tecnologias Utilizadas

-   **React 18**
-   **TypeScript**
-   **React Router DOM** (para roteamento)
-   **Styled Components** (para estilização)
-   **Axios** (para comunicação com a API)

## 🚀 Setup e Instalação

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-da-pasta-frontend
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    *Lembre-se que o servidor do backend (API) deve estar rodando para que a aplicação funcione por completo.*
    ```bash
    npm start
    ```
5.  Abra [http://localhost:3001](http://localhost:3001) (ou a porta indicada no seu terminal) no seu navegador.

## 🏛️ Arquitetura da Aplicação

O projeto segue uma arquitetura baseada em componentes, com uma clara separação de responsabilidades:

-   **/src/components**: Componentes reutilizáveis (Header, PostListItem, formulários, etc.).
-   **/src/pages**: Componentes que representam as páginas completas da aplicação (HomePage, LoginPage, AdminPage, etc.).
-   **/src/services**: Centraliza toda a comunicação com a API backend.
-   **/src/contexts**: Gerencia o estado global, como o de autenticação.
-   **/src/styles**: Contém os estilos globais da aplicação.
-   **/src/types**: Define as interfaces TypeScript para os modelos de dados (ex: Post).

## 📖 Guia de Uso

A aplicação tem dois fluxos de uso principais:

1.  **Usuário Visitante/Aluno:**
    -   Acessa a página principal para ver a lista de posts publicados.
    -   Usa o campo de busca para filtrar posts.
    -   Clica em um post para navegar até a página de leitura e ver seu conteúdo completo.

2.  **Usuário Professor (Autenticado):**
    -   Acessa a página de login e insere suas credenciais.
    -   Após o login, é redirecionado para o painel administrativo.
    -   No painel, pode ver **todos** os posts (publicados ou não).
    -   Pode clicar para **criar**, **editar** ou **excluir** qualquer post.