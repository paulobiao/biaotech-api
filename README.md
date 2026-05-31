# BiaoTech API

![CI](https://github.com/paulobiao/biaotech-api/actions/workflows/deploy.yml/badge.svg)

Production-ready REST API built with Node.js, Express, TypeScript, PostgreSQL, Docker, AWS EC2, Nginx and GitHub Actions.

This project simulates a real-world backend architecture with JWT authentication, RBAC authorization, PostgreSQL integration, automated deployment pipeline, Dockerized development environment, Swagger documentation, structured logging, integration testing and production-ready TypeScript builds.

---

# Live Environment

## Production API

```txt
https://api.biaotech.dev/api/health
```

## Swagger Documentation

```txt
https://api.biaotech.dev/api/docs/
```

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* JWT Authentication
* RBAC Authorization
* Zod Validation
* Swagger/OpenAPI
* Pino Logging

## Infrastructure

* AWS EC2
* Nginx Reverse Proxy
* PM2 Process Manager
* Docker Compose
* GitHub Actions CI/CD
* Let's Encrypt SSL

## Testing & Quality

* Jest
* Supertest
* ESLint
* Prettier
* TypeScript Type Checking

---

# Features

* JWT authentication
* Role-based access control (RBAC)
* Protected routes
* CRUD operations
* Pagination and search filters
* PostgreSQL integration
* Database migrations
* Automated database seed
* Swagger API documentation
* Integration tests
* CI/CD pipeline
* Dockerized development environment
* Centralized error handling
* Structured logging with Pino
* Request ID tracking
* Rate limiting middleware
* Environment-based configuration
* Production TypeScript build (`dist`)

---

# Architecture Overview

```txt
Client
   ↓
Nginx Reverse Proxy
   ↓
Node.js + Express API
   ↓
PostgreSQL Database
```

## Infrastructure Flow

```txt
GitHub Push
   ↓
GitHub Actions
   ↓
Type Check
   ↓
Lint
   ↓
Tests
   ↓
Build
   ↓
Deploy to AWS EC2
   ↓
PM2 Restart
```

---

# RBAC Authorization

The API implements role-based authorization using JWT payload roles.

Example roles:

```txt
admin
user
```

Admin-only endpoints are protected through dedicated authorization middleware.

Example:

```ts
authorizeRoles("admin")
```

---

# Pagination & Search

The users endpoint supports pagination and filtering.

Example:

```http
GET /api/users?page=1&limit=10&search=paulo
```

Example response:

```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "Paulo Test"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

# Project Structure

```txt
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── dtos/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── validators/
│
├── migrations/
├── tests/
├── dist/
├── docker-compose.yml
├── Dockerfile
├── tsconfig.json
├── tsconfig.build.json
└── package.json
```

---

# Environment Configuration

## Local Development

Use:

```txt
.env
```

Database host:

```txt
localhost
```

## Docker Development

Use:

```txt
.env.docker
```

Database host:

```txt
postgres
```

---

# Running Locally

## Clone Repository

```bash
git clone https://github.com/paulobiao/biaotech-api.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file using `.env.example`.

## Run Development Server

```bash
npm run dev
```

---

# Running with Docker

```bash
docker compose up --build
```

---

# Production Build

Build TypeScript application:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

# Running Tests

```bash
npm test
```

Type checking:

```bash
npm run type-check
```

Lint:

```bash
npm run lint
```

---

# API Documentation

Swagger documentation:

```txt
https://api.biaotech.dev/api/docs/
```

---

# Security Notes

* Environment variables are managed through `.env` files.
* JWT authentication protects private routes.
* RBAC middleware protects admin-only operations.
* Rate limiting helps mitigate abuse.
* Sensitive credentials are intentionally not exposed in this repository.

---

# CI/CD Pipeline

The project uses GitHub Actions for automated deployment.

Deployment flow:

```txt
Push to main branch
   ↓
Install dependencies
   ↓
Run type-check
   ↓
Run lint
   ↓
Run tests
   ↓
Build application
   ↓
Deploy to AWS EC2
   ↓
Restart PM2 service
```

---

# Current Engineering Roadmap

* Repository Pattern
* Refresh Token Authentication
* API Observability
* Test Coverage Reporting
* OpenAPI Expansion
* Complete TypeScript Migration

---

# Author

Paulo Biao

LinkedIn:

```txt
https://www.linkedin.com/in/paulobiao/
```
