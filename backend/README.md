# TeamSumit Backend API

REST API backend for the TeamSumit / MWE engagement request system.

Built with Node.js · Express.js · MongoDB · Mongoose · express-validator · CORS · dotenv

---

## Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.0.0 |
| npm | ≥ 8 |
| MongoDB | Local instance on port 27017, or a MongoDB Atlas URI |

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set `MONGODB_URI` to your database connection string.

Default for local development:
```
MONGODB_URI=mongodb://localhost:27017/mwe_db
PORT=5000
```

### 3. Start the backend

```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

The server prints:

```
TeamSumit Backend API
Running  → http://localhost:5000
Health   → http://localhost:5000/api/health
API      → http://localhost:5000/api/appointments
```

---

## Project Structure

```
backend/
├── src/
│   ├── app.js                        # Entry point
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── controllers/
│   │   └── engagementController.js   # Route handlers
│   ├── middleware/
│   │   ├── errorHandler.js           # Central error handler
│   │   └── validate.js               # express-validator runner
│   ├── models/
│   │   └── EngagementRequest.js      # Mongoose schema + model
│   ├── routes/
│   │   ├── appointments.js           # POST/GET /api/appointments
│   │   ├── health.js                 # GET /api/health
│   │   └── seo.js                    # GET /api/seo/*
│   └── services/
│       └── engagementService.js      # Business logic
├── scripts/
│   └── test-api.js                   # Automated API tests
├── .env                              # Local secrets (NOT committed)
├── .env.example                      # Template (safe to commit)
└── package.json
```

---

## API Reference

### Health Check

```
GET /api/health
```

Response:
```json
{
  "success": true,
  "status": "ok",
  "db": "connected",
  "env": "development",
  "timestamp": "2025-10-01T08:15:00.000Z"
}
```

---

### Submit Engagement Request

```
POST /api/appointments
Content-Type: application/json
```

**Required fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full name of the contact |
| `email` | string | Valid email address |
| `requestType` | string | One of the allowed types (see below) |

**Allowed `requestType` values:**

```
INDIVIDUAL_MENTORSHIP
COLLEGE_UNIVERSITY
WORKSHOP
GUEST_LECTURE
INDUSTRY_ENGAGEMENT
GLOBAL_ENGAGEMENT
OTHER
```

**Optional fields:**

| Field | Type | Description |
|-------|------|-------------|
| `phone` | string | Contact phone number |
| `role` | string | `college`, `student`, or `industry` |
| `reason` | string | Intake reason (e.g. `guest-lecture`, `career-guidance`) |
| `organizationName` | string | Institution or company name |
| `organizationType` | string | e.g. `university`, `company`, `ngo` |
| `country` | string | Country name (no default — supports global) |
| `city` | string | City name |
| `engagementMode` | string | `in-person`, `online`, or `hybrid` |
| `preferredDate` | string | ISO 8601 date (`YYYY-MM-DD`) |
| `message` | string | Free-text message (max 2000 chars) |
| `details` | object | Role+reason-specific fields from intake flow |
| `source` | string | e.g. `homepage`, `pricing`, `header` |

**Success response (201):**
```json
{
  "success": true,
  "message": "Your engagement request has been received. We will be in touch shortly.",
  "data": {
    "id": "...",
    "requestType": "GUEST_LECTURE",
    "name": "Dr. Priya Desai",
    "email": "priya.desai@vit.edu.in",
    "createdAt": "2025-10-01T08:20:00.000Z"
  }
}
```

**Validation error response (422):**
```json
{
  "success": false,
  "message": "Request validation failed.",
  "errors": [
    { "field": "email", "message": "A valid email address is required." }
  ]
}
```

---

### List All Requests (internal/admin)

```
GET /api/appointments
```
**Headers required:**
`x-api-key`: Must match the `ADMIN_API_KEY` from your environment.

Returns all submissions sorted newest-first.

---

### Get Single Request

```
GET /api/appointments/:id
```
**Headers required:**
`x-api-key`: Must match the `ADMIN_API_KEY` from your environment.

Returns a single submission by its MongoDB ObjectId.

---

### SEO / Structured Data & Public Images

```
GET /api/images/:filename       # Public SEO images (sumitsir1.jpeg, sumitsir2.jpeg, sumitsir3.jpeg)
GET /api/seo/structured-data    # JSON-LD schema for Person, Website, and Services
GET /api/seo/sitemap            # Page list for sitemap generation
```

---

## Running Tests

Make sure the backend server is running first, then:

```bash
npm test
```

Tests cover:
1. Health check
2. Basic student / individual mentorship request
3. College/University guest lecture request
4. Global Engagement (international) request
5. Invalid `requestType` is rejected (422)
6. Invalid email is rejected (422)
7. Missing required fields are handled (422)
8. GET all appointments
9. GET single appointment by ID
10. Public image delivery (sumitsir1.jpeg, sumitsir2.jpeg, sumitsir3.jpeg, 404 for missing)
11. Structured data Person image reference (sumitsir3.jpeg)

---

## Example Requests (curl)

### Student mentorship
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "requestType": "INDIVIDUAL_MENTORSHIP",
    "role": "student",
    "reason": "career-guidance",
    "phone": "9876543210",
    "message": "I need career guidance for software engineering."
  }'
```

### College/University (India)
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Priya Desai",
    "email": "priya@vit.edu.in",
    "requestType": "GUEST_LECTURE",
    "role": "college",
    "reason": "guest-lecture",
    "organizationName": "VIT Pune",
    "country": "India",
    "city": "Pune",
    "engagementMode": "in-person",
    "preferredDate": "2025-11-15",
    "details": { "audienceSize": "300", "topic": "AI in Engineering" }
  }'
```

### Global Engagement (international)
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "James OBrien",
    "email": "james@mit.edu",
    "requestType": "GLOBAL_ENGAGEMENT",
    "organizationName": "MIT",
    "country": "United States",
    "city": "Cambridge",
    "engagementMode": "online",
    "message": "Global Innovation Lab online session."
  }'
```

---

## SEO/GEO Notes

**Backend-implemented:**
- `GET /api/seo/structured-data` — JSON-LD (Person, WebSite, Service schemas)
- `GET /api/seo/sitemap` — Page list for sitemap generator

**Remaining work for the frontend developer:**
- Add `<title>` and `<meta name="description">` to `frontend/index.html`
- Add Open Graph (`og:title`, `og:description`, `og:image`) and Twitter Card tags
- Inject the JSON-LD from `/api/seo/structured-data` into a `<script type="application/ld+json">` tag in `index.html` (or dynamically via a Next.js migration)
- Add a `robots.txt` to `frontend/public/`
- Wire real submission in `frontend/src/features/intake/components/ReviewStep.jsx` to `POST /api/appointments`

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | HTTP server port |
| `NODE_ENV` | No | `development` | Environment (`development` / `production`) |
| `MONGODB_URI` | Yes | — | MongoDB connection string |
| `ALLOWED_ORIGINS` | No | (permissive in dev) | Comma-separated list of allowed CORS origins |
| `SITE_URL` | No | `https://teamsumit.com` | Base URL used in sitemap output |
| `BACKEND_URL` | No | `https://teamsumit.com` (or `SITE_URL`) | Base backend URL used for structured-data image URLs |
| `ADMIN_API_KEY` | Yes | — | Secret key required to access admin GET routes |

---

## Security Notes

1. **Never commit `.env`** — it is listed in `.gitignore`.
2. The `GET /api/appointments` endpoint has no auth. Add a middleware guard before production.
3. Body size is limited to 50 KB to prevent simple DoS.
4. All user input is trimmed and validated with express-validator.
