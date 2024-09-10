# Projeto Tarefas

Este projeto é uma aplicação de gerenciamento de tarefas que permite aos usuários criar, editar, excluir e marcar tarefas como concluídas. O projeto é dividido em duas partes principais: o backend (API) e o frontend.

## Estrutura do Projeto

- `api-tarefas`: Diretório contendo o código do backend.
- `front-tarefas`: Diretório contendo o código do frontend.

## Requisitos

- Node.js
- npm ou yarn
- Banco de dados (ex: PostgreSQL, MySQL, etc.)

## Como Rodar o Projeto

### Backend (API)

1. Navegue até o diretório `api-tarefas`:
    ```sh
    cd projeto tarefas\api-tarefas
    ```

2. Instale as dependências:
    ```sh
    npm i
    ```

3. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do diretório `api-tarefas`.
    - Adicione as seguintes variáveis de ambiente:
        ```env
        DB_HOST=localhost
        DB_PORT=porta
        DB_USERNAME=seu_usuario
        DB_PASSWORD=sua_senha
        DB_DATABASE=nome_do_banco
        JWT_SECRET=sua_chave_secreta
        ```

4. Inicie o servidor:
    ```sh
    npm run start
    ```

### Frontend

1. Navegue até o diretório `front-tarefas`:
    ```sh
    cd projeto tarefas\front-tarefas
    ```

2. Instale as dependências:
    ```sh
    npm i
    ```

3. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do diretório `front-tarefas`.
    - Adicione as seguintes variáveis de ambiente:
        ```env
        VITE_API_URL=http://localhost:3000
        ```

4. Inicie o servidor de desenvolvimento:
    ```sh
    npm start
    ```

## Decisões de Desenvolvimento

### Backend

- **Framework:** Utilizei NestJS para construir a API devido à sua robustez, modularidade e suporte a TypeScript.
-  **API REST**: A API foi construída seguindo os princípios REST, permitindo operações CRUD (Create, Read, Update, Delete) de forma padronizada.
- **Autenticação:** Foi implementada autenticação JWT (JSON Web Token) para garantir a segurança das rotas protegidas.
- **ORM:** Utilizei TypeORM como ORM (Object-Relational Mapping) para interagir com o banco de dados de forma mais intuitiva e segura.
- **Validação:** Adicionamos validações nos modelos utilizando decorators do TypeORM e class-validator para garantir a integridade dos dados.

### Frontend

- **Framework:** Utilizei React para construir a interface do usuário devido à sua eficiência e modularidade.
- **Gerenciamento de Estado:** Utilizei hooks do React para gerenciar o estado da aplicação de forma simples e eficiente.
- **Componentização:** A aplicação foi dividida em componentes reutilizáveis para facilitar a manutenção e a escalabilidade.
- **Estilização:** Utilizei React Bootstrap para estilizar a aplicação de forma consistente e responsiva.


- Nome: João Vitor Pagani
- Email: joaovitorpagani22@gmail.com