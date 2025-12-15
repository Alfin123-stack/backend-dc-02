# 🧠 Backend Quiz API

Backend Quiz API adalah REST API berbasis **Node.js + Express** yang digunakan untuk:

* Generate quiz dari konten tutorial menggunakan AI
* Mengambil heading / judul tutorial
* Menyimpan & mengambil progress quiz user
* Cache quiz per user / tutorial / level
* Menyimpan dan menghapus riwayat (history) quiz
* Mengelola preferensi user

API ini terdokumentasi menggunakan **Swagger / OpenAPI 3.0**.

---

## 🌐 Base URL

```
https://backend-dc-02.vercel.app/api
```

---

## 📦 Tech Stack

* Node.js
* Express.js
* Redis
* Joi Validator
* Swagger (OpenAPI 3.0)
* Google Gemini AI

---

## 📘 API Documentation (Swagger)

Jika Swagger UI diaktifkan:

```
GET /api/docs
```

---

## 📑 API ENDPOINTS

### 👤 Users

* `GET /users/{id}/preferences`

### 🧠 Quiz

* `POST /quiz/generate`

### 📚 Tutorial

* `GET /tutorial/heading`

### 📊 Progress

* `POST /quiz/progress`
* `GET /quiz/progress`

### ⚡ Cache

* `POST /quiz/cache`
* `GET /quiz/cache`
* `DELETE /quiz/clear`

### 🕘 History

* `GET /quiz/history`
* `POST /quiz/history`
* `DELETE /quiz/history/clear`

---

## 👤 User API

### Get User Preferences

**GET** `/users/{id}/preferences`

**Path Parameters**

| Name | Type   | Required |
| ---- | ------ | -------- |
| id   | string | ✅        |

**Response**

```json
{
  "success": true,
  "preferences": {}
}
```

---

## 🧠 Quiz API

### Generate Quiz

**POST** `/quiz/generate`

Generate quiz dari konten tutorial menggunakan AI.

**Request Body**

```json
{
  "tutorialId": "tutorial_1",
  "level": 2
}
```

| Field      | Type   | Required | Description                    |
| ---------- | ------ | -------- | ------------------------------ |
| tutorialId | string | ✅        | ID tutorial                    |
| level      | number | ✅        | 1 = Easy, 2 = Medium, 3 = Hard |

**Response**

```json
{
  "success": true,
  "message": "Quiz generated successfully",
  "tutorial": {
    "id": "tutorial_1",
    "title": "Intro to JS"
  },
  "meta": {
    "level": 2,
    "totalQuestions": 3,
    "multiple_choice": 2,
    "multiple_answer": 1
  },
  "quiz": [
    {
      "question": "Apa itu JavaScript?",
      "type": "multiple_choice",
      "options": ["Bahasa Pemrograman", "Framework"],
      "answer": ["Bahasa Pemrograman"]
    }
  ]
}
```

---

## 📚 Tutorial API

### Get Tutorial Heading

**GET** `/tutorial/heading`

**Query Params**

| Name       | Type   | Required |
| ---------- | ------ | -------- |
| tutorialId | string | ✅        |

**Response**

```json
{
  "success": true,
  "heading": "Intro to JS"
}
```

---

## 📊 Quiz Progress API

### Save Progress

**POST** `/quiz/progress`

**Request Body**

```json
{
  "tutorialId": "tutorial_1",
  "userId": "user_1",
  "level": 2,
  "progress": {
    "currentQuestion": 3,
    "answers": []
  }
}
```

**Response**

```json
{
  "success": true,
  "message": "Progress saved"
}
```

---

### Get Progress

**GET** `/quiz/progress`

**Query Params**

| Name       | Type   | Required |
| ---------- | ------ | -------- |
| tutorialId | string | ✅        |
| userId     | string | ✅        |
| level      | number | ✅        |

**Response**

```json
{
  "success": true,
  "progress": {
    "currentQuestion": 3,
    "answers": []
  }
}
```

---

## ⚡ Quiz Cache API

### Save Quiz Cache

**POST** `/quiz/cache`

**Request Body**

```json
{
  "tutorialId": "tutorial_1",
  "userId": "user_1",
  "level": 2,
  "quiz": []
}
```

**Response**

```json
{
  "success": true,
  "message": "Quiz cache saved"
}
```

---

### Get Quiz Cache

**GET** `/quiz/cache`

**Query Params**

| Name       | Type   | Required |
| ---------- | ------ | -------- |
| tutorialId | string | ✅        |
| userId     | string | ✅        |
| level      | number | ✅        |

**Response**

```json
{
  "success": true,
  "quizCache": []
}
```

---

### Clear Quiz Cache / Progress

**DELETE** `/quiz/clear`

**Query Params**

| Name       | Type    | Required | Default |
| ---------- | ------- | -------- | ------- |
| tutorialId | string  | ✅        | -       |
| userId     | string  | ✅        | -       |
| level      | number  | ✅        | -       |
| cache      | boolean | ❌        | true    |
| progress   | boolean | ❌        | true    |

**Response**

```json
{
  "success": true,
  "deleted": [
    "quiz:user_1:tutorial_1:2",
    "progress:user_1:tutorial_1:2"
  ]
}
```

---

## 🕘 Quiz History API

### Get History

**GET** `/quiz/history`

**Response**

```json
{
  "success": true,
  "history": []
}
```

---

### Save History

**POST** `/quiz/history`

**Request Body**

```json
{
  "tutorialId": "tutorial_1",
  "userId": "user_1",
  "level": 2,
  "score": 80,
  "totalQuestions": 10
}
```

**Response**

```json
{
  "success": true,
  "message": "History saved",
  "entry": {
    "tutorialId": "tutorial_1",
    "userId": "user_1",
    "level": 2,
    "score": 80,
    "totalQuestions": 10,
    "createdAt": "2025-01-14T08:30:00.000Z"
  }
}
```

---

### Clear History

**DELETE** `/quiz/history/clear`

**Response**

```json
{
  "success": true,
  "message": "All history cleared"
}
```

---

## ⚠️ Error Format

```json
{
  "success": false,
  "message": "tutorialId, userId, dan level wajib"
}
```

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

---

## 🧩 Notes

* Cache & progress disimpan di **Redis**
* Semua request divalidasi menggunakan **Joi**
* Struktur key Redis:

  * Quiz: `quiz:{userId}:{tutorialId}:{level}`
  * Progress: `progress:{userId}:{tutorialId}:{level}`

---
