# IdentityLink – Identity Reconciliation Service

## 📌 Overview

IdentityLink is a backend service that reconciles customer identities based on email addresses and phone numbers. It intelligently links multiple contact records belonging to the same person while maintaining a primary contact and associated secondary contacts.

---

## 🚀 Features

- Identity reconciliation
- Primary & secondary contact management
- Contact merging
- PostgreSQL database
- Prisma ORM
- REST API
- Docker support
- Kubernetes manifests
- GitHub Actions CI

---

## 🛠 Tech Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Kubernetes
- GitHub Actions

---

## 📂 Project Structure

```
IdentityLink/
│── backend/
│── kubernetes/
│── .github/
│── docker-compose.yml
│── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/NuthanK04/IdentityLink.git
```

### Backend

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/identitylink"
```

### Run

```bash
npm run dev
```

---

## 🐳 Docker

```bash
docker compose up --build
```

---

## ☸️ Kubernetes

```bash
kubectl apply -f kubernetes/
```

---

## 📡 API

### POST /identify

Request

```json
{
  "email": "abc@gmail.com",
  "phoneNumber": "9999999999"
}
```

Response

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": [
      "abc@gmail.com"
    ],
    "phoneNumbers": [
      "9999999999"
    ],
    "secondaryContactIds": [
      2
    ]
  }
}
```

---

## 👨‍💻 Author

**Nuthan K**