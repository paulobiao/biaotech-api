# BiaoTech API
![CI](https://github.com/paulobiao/aws-ec2-nginx-deploy/actions/workflows/deploy.yml/badge.svg)

Production-ready backend API built with Node.js, Express, PostgreSQL, Docker, AWS EC2, Nginx and GitHub Actions.

This project was designed to simulate a real-world backend architecture with authentication, automated deployment pipeline, infrastructure setup, integration tests, migrations, Swagger documentation and incremental TypeScript migration.

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
* Zod Validation
* Swagger/OpenAPI
* TypeScript (incremental migration)

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
* Protected routes
* CRUD operations
* PostgreSQL integration
* Database migrations
* Automated database seed
* Swagger API documentation
* Integration tests
* CI/CD pipeline
* Dockerized development environment
* TypeScript incremental architecture
* Rate limiting middleware
* Centralized error handling
* Request logging middleware

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

### Infrastructure Flow
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

# Project Structure

```txt
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── validators/
│   └── app.js
│
├── tests/
├── migrations/
│
├── server.js
├── server.ts
│
├── docker-compose.yml
├── tsconfig.json
├── jest.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

# Authentication

Authentication is implemented using JWT.

## Login Endpoint
```http
POST /api/auth/login
```

### Example Request
```json
{
  "email": "admin@biaotech.dev",
  "password": "123456"
}
```

### Example Response
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "JWT_TOKEN"
}
```

---

# API Endpoints

## Health Check
```http
GET /api/health
```

## Authentication
```http
POST /api/auth/login
```

## Users
```http
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

# Local Development

## Clone Repository
```bash
git clone https://github.com/paulobiao/aws-ec2-nginx-deploy.git
cd backend
```

---

# Environment Variables

Create a `.env` file:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1h
DB_HOST=localhost
DB_PORT=5432
DB_USER=biaotech
DB_PASSWORD=biaotech_password
DB_NAME=biaotech_db
```

---

# Running with Docker

## Start Containers
```bash
docker compose up --build
```

## Stop Containers
```bash
docker compose down
```

---

# Running Locally

## Install Dependencies
```bash
npm install
```

## Start Development Server
```bash
npm run dev
```

## TypeScript Runtime
```bash
npm run dev:ts
```

---

# Database Migrations

Migrations run automatically when the server starts.

Example:
```txt
Running migration: 001_create_users.sql
Running migration: 002_create_auth_users.sql
```

---

# Automated Seed

The project automatically creates an admin user for testing purposes.

## Default Credentials
```txt
Email: admin@biaotech.dev
Password: 123456
```

---

# Testing

## Run Tests
```bash
npm test
```

## Current Test Coverage
* Authentication flow
* Protected routes
* CRUD operations
* Validation middleware
* Health endpoint

---

# Code Quality

## Type Checking
```bash
npm run type-check
```

## Lint
```bash
npm run lint
```

## Format Code
```bash
npm run format
```

---

# CI/CD Pipeline

This project uses GitHub Actions to:
* Run automated tests
* Validate PostgreSQL integration
* Deploy automatically to AWS EC2
* Restart application with PM2

Workflow:
```txt
Push to main
   ↓
Run Tests
   ↓
Build Validation
   ↓
Deploy to EC2
```

---

# Production Infrastructure

## AWS EC2
Application hosted on a real EC2 instance.

## Nginx
Used as reverse proxy with HTTPS support.

## PM2
Responsible for process management and automatic restart.

## HTTPS
SSL certificates managed using Let's Encrypt.

---

# TypeScript Migration Strategy

This project follows an incremental TypeScript migration strategy.

Current architecture supports:
* JavaScript + TypeScript hybrid runtime
* Typed services
* Typed controllers
* Shared interfaces
* Type-safe PostgreSQL layer

The migration is being performed gradually to preserve application stability while improving maintainability and scalability.

---

# Future Improvements
* Refresh token implementation
* RBAC authorization
* Redis cache layer
* Observability/monitoring
* Full TypeScript migration
* Production Docker image
* Kubernetes deployment

---

# Author

Paulo Biao
Backend & Cloud Computing Project

Focused on:
* Backend Engineering
* Cloud Infrastructure
* AWS
* Node.js
* TypeScript
* DevOps
* PostgreSQL
