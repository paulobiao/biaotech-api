# BiaoTech API

BiaoTech API is a backend project built with Node.js, Express, SQLite, Nginx, PM2, GitHub Actions, and AWS EC2.

The goal of this project is to demonstrate a real-world backend deployment workflow using a custom domain, HTTPS, automated deployment, process management, and a structured API architecture.

---

# Tech Stack

- Node.js
- Express
- SQLite
- AWS EC2
- Nginx
- PM2
- GitHub Actions
- HTTPS / SSL
- dotenv

---

# Live API

Production URL:

```txt
https://api.biaotech.dev
```

---

# Current Features

- Healthcheck endpoint
- Users CRUD
- SQLite persistence
- Global error middleware
- Validation middleware
- Service layer
- Automated deployment with GitHub Actions
- Process management with PM2
- Reverse proxy with Nginx
- HTTPS enabled

---

# API Endpoints

## Healthcheck

```http
GET /api/health
```

## Users

```http
GET /api/users
GET /api/users/:id
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
```

---

# Example Requests

## Get all users

```bash
curl https://api.biaotech.dev/api/users
```

## Create user

```bash
curl -X POST https://api.biaotech.dev/api/users \
-H "Content-Type: application/json" \
-d '{"name":"Paulo"}'
```

## Update user

```bash
curl -X PUT https://api.biaotech.dev/api/users/1 \
-H "Content-Type: application/json" \
-d '{"name":"Paulo Updated"}'
```

## Delete user

```bash
curl -X DELETE https://api.biaotech.dev/api/users/1
```

---

# Project Structure

```txt
backend/
  src/
    controllers/
    database/
    middleware/
    routes/
    services/
  server.js
  package.json
```

---

# Architecture Flow

```txt
Request
→ Route
→ Validation Middleware
→ Controller
→ Service
→ Database
→ Response
```

---

# Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
NODE_ENV=development
```

---

# Run Locally

```bash
cd backend
npm install
npm start
```

---

# Deployment

This API is deployed on AWS EC2 using:

- GitHub Actions for automated deployment
- PM2 for process management
- Nginx as a reverse proxy
- Certbot / Let's Encrypt for HTTPS

---

# Author

Paulo Biao
