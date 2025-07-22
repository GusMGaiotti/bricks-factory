### Fábrica de Tijolos - Projeto Full Stack

-   **`/backend-bricks-factory`**: API RESTful desenvolvida com Java e Spring Boot.
-   **`/frontend-bricks-factory`**: Interface desenvolvida com Next.js, TypeScript e Tailwind CSS.

---

Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3
- Spring Data JPA (Hibernate) & Specification
- Maven
- MySQL

### Frontend
- React 18 / Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios

---

## **1. Configuração do Backend**

Pré-requisitos: Java 17+, Maven 3.8+, MySQL 8+.

Configure seu usuário e senha do MySQL no arquivo:
src/main/resources/application.properties

## ***Execute a aplicação***
Execute: ```mvn spring-boot:run```

A API estará disponível em `http://localhost:8080`

## **2. Configuração do Frontend**

Pré-requisitos: Node.js v18+.

## ***Instale as dependências***
Execute: ```npm install```

Crie o arquivo de variáveis de ambiente na pasta raiz
Nome do arquivo: `.env.example`

Conteúdo: `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api`

## ***Execute a aplicação***
```npm run dev```

Acesse a aplicação no seu navegador em `http://localhost:3000`.
