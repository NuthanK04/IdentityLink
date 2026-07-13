# IdentityLink – System Design

## Overview

IdentityLink is a RESTful backend service that reconciles customer identities using email addresses and phone numbers.

When multiple requests refer to the same individual, the service links them together while maintaining a single primary contact.

---

## Architecture

```
Client
   │
   ▼
Express REST API
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

---

## Request Flow

1. Client sends a POST request to `/identify`.
2. Controller validates the request.
3. Service checks for matching email or phone.
4. Repository queries PostgreSQL via Prisma.
5. If no contact exists:
   - Create a new primary contact.
6. If matching contacts exist:
   - Return existing identity.
7. If two primary contacts become connected:
   - Merge them.
   - Older contact remains primary.
   - Newer contact becomes secondary.

---

## Database

### Contact

| Field | Type |
|--------|------|
| id | Integer |
| email | String |
| phoneNumber | String |
| linkedId | Integer |
| linkPrecedence | Enum |
| createdAt | DateTime |
| updatedAt | DateTime |
| deletedAt | DateTime |

---

## Technologies

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Kubernetes
- GitHub Actions

---

## Deployment

Docker containers:

- PostgreSQL
- Backend API

Kubernetes resources:

- PostgreSQL Deployment
- PostgreSQL Service
- Backend Deployment
- Backend Service
- Horizontal Pod Autoscaler

---

## CI/CD

GitHub Actions automatically:

- Install dependencies
- Generate Prisma Client
- Build TypeScript project