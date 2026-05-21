# BiaoTech API

![CI](https://github.com/paulobiao/biaotech-api/actions/workflows/deploy.yml/badge.svg)

Production-ready REST API built with Node.js, Express, PostgreSQL, Docker, AWS EC2, Nginx and GitHub Actions.

This project simulates a real-world backend architecture with authentication, RBAC authorization, automated deployment pipeline, Dockerized development environment, Swagger documentation, integration tests, PostgreSQL migrations and incremental TypeScript migration.

---

# Live Environment

## Production API

```txt
https://api.biaotech.dev/api/health
```

## Swagger Documentation

```txt
https://api.biaotech.dev/api/docs
```

---

# Tech Stack

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* RBAC Authorization
* Zod Validation
* Swagger/OpenAPI
* TypeScript

## Infrastructure

* AWS EC2
* Nginx Reverse Proxy
* PM2 Process Manager
* Docker Compose
* GitHub Actions CI/CD
* HTTPS with Let's Encrypt

## Testing & Quality

* Jest
* Supertest
* ESLint
* Prettier

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
* Request logging middleware
* Rate limiting middleware
* Incremental TypeScript migration strategy

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
Run Tests
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
├── docker-compose.yml
├── Dockerfile
└── package.json
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

---

# Running with Docker

```bash
docker compose up --build
```

---

# Run Development Server

```bash
npm run dev
```

---

# Running Tests

```bash
npm test
```

---

# API Documentation

Swagger documentation:

```txt
https://api.biaotech.dev/api/docs
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
GitHub Actions workflow
   ↓
Run lint
   ↓
Run tests
   ↓
Deploy to AWS EC2
   ↓
Restart PM2 service
```

---

# Current Engineering Focus

* TypeScript migration completion
* Structured logging improvements
* Repository pattern architecture
* Refresh token implementation
* API observability improvements

---

# Author

Paulo Biao

LinkedIn:

```txt
https://www.linkedin.com/in/paulobiao/
```
