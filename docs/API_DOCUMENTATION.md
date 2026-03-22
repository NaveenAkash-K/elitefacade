# Elite Facade Solutions — API Reference

**Base URL:** `http://localhost:8000/api`

---

## Headers

### Public Endpoints
```
Content-Type: application/json
```

### Protected Endpoints (all except login)
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Protected Endpoints with File Upload
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

---

## AUTH

### `POST /auth/login`

**Headers:** `Content-Type: application/json`

**Payload:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "<jwt>"
}
```

---

## PRODUCTS

### `GET /products`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": "abc123",
    "title": "HG-800 Unitized Series",
    "description": "Prefabricated panelized façade for rapid installation.",
    "badge": "Best Seller",
    "specs": ["U-Value: 0.85 W/m²K", "Wind Load: Up to 5.0 kPa"],
    "imageUrl": "https://..."
  }
]
```

---

### `POST /products`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
items[0][title]       = "HG-800 Unitized Series"
items[0][description] = "Prefabricated panelized façade for rapid installation."
items[0][badge]       = "Best Seller"
items[0][specs][0]    = "U-Value: 0.85 W/m²K"
items[0][specs][1]    = "Wind Load: Up to 5.0 kPa"
image_0               = <File>

items[1][title]       = "HG-900 Stick Series"
...
image_1               = <File>
```

> `image_<index>` maps to `items[index]` by position.

---

### `PATCH /products/:id`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
title         = "HG-800 Unitized Series"
description   = "Updated description."
badge         = "New Arrival"
specs[0]      = "U-Value: 0.90 W/m²K"
image         = <File>        (optional)
```

---

### `DELETE /products/:id`

**Headers:** `Authorization: Bearer <token>`

No body required.

---

## PROJECTS

### `GET /projects`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": "abc123",
    "title": "The Zenith Plaza",
    "category": "Exterior Facade",
    "location": "Dubai, UAE",
    "alt": "Corporate Tower Facade",
    "imageUrl": "https://..."
  }
]
```

---

### `POST /projects`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
items[0][title]    = "The Zenith Plaza"
items[0][category] = "Exterior Facade"
items[0][location] = "Dubai, UAE"
items[0][alt]      = "Corporate Tower Facade"
image_0            = <File>
```

> Allowed categories: `Exterior Facade` | `Interior Systems` | `Commercial Glass` | `Specialized Engineering`

---

### `PATCH /projects/:id`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
title    = "The Zenith Plaza"
category = "Commercial Glass"
location = "Abu Dhabi, UAE"
alt      = "Updated alt text"
image    = <File>        (optional)
```

---

### `DELETE /projects/:id`

**Headers:** `Authorization: Bearer <token>`

No body required.

---

## SERVICES

### `GET /services`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "regions": [
    { "id": "r1", "icon": "public", "title": "North America", "description": "..." }
  ],
  "phases": [
    { "id": "p1", "title": "Technical Consultation", "description": "...", "features": ["Risk Assessment"], "imageUrl": "https://..." }
  ],
  "steps": [
    { "id": "s1", "title": "Initial Assessment", "description": "..." }
  ],
  "whyUs": [
    { "id": "w1", "icon": "verified", "title": "Certified Experts", "description": "..." }
  ]
}
```

---

### `POST /services`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
regions[0][icon]          = "public"
regions[0][title]         = "North America"
regions[0][description]   = "Strategic headquarters managing high-profile developments."

phases[0][title]          = "Technical Consultation"
phases[0][description]    = "Feasibility studies and structural performance analysis."
phases[0][features][0]    = "Risk Assessment"
phases[0][features][1]    = "Budget Estimation"
image_0                   = <File>

steps[0][title]           = "Initial Assessment"
steps[0][description]     = "We evaluate the project scope and requirements."

whyUs[0][icon]            = "verified"
whyUs[0][title]           = "Certified Experts"
whyUs[0][description]     = "Our team holds international facade engineering certifications."
```

> `image_<index>` maps to `phases[index]` by position.

---

### `PATCH /services`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

Same shape as POST. Replaces the full services document.

---

### `DELETE /services/regions/:id`
### `DELETE /services/phases/:id`
### `DELETE /services/steps/:id`
### `DELETE /services/why-us/:id`

**Headers:** `Authorization: Bearer <token>`

No body required.

---

## FABRICATION

### `GET /fabrication`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "stats": [
    { "id": "s1", "icon": "precision_manufacturing", "label": "Tolerance", "value": "± 0.25mm" }
  ],
  "items": [
    { "id": "i1", "title": "Automated Milling", "alt": "CNC milling station", "imageUrl": "https://..." }
  ],
  "qaFeatures": [
    { "id": "q1", "icon": "verified", "title": "Real-Time Monitoring", "description": "Continuous quality checks throughout production." }
  ]
}
```

---

### `POST /fabrication`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
stats[0][icon]           = "precision_manufacturing"
stats[0][label]          = "Tolerance"
stats[0][value]          = "± 0.25mm"

items[0][title]          = "Automated Milling"
items[0][alt]            = "CNC milling station"
image_0                  = <File>

qaFeatures[0][icon]      = "verified"
qaFeatures[0][title]     = "Real-Time Monitoring"
qaFeatures[0][description] = "Continuous quality checks throughout production."
```

> `image_<index>` maps to `items[index]` by position.

---

### `PATCH /fabrication`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

Same shape as POST. Replaces the full fabrication document.

---

### `DELETE /fabrication/items/:id`
### `DELETE /fabrication/stats/:id`
### `DELETE /fabrication/qa-features/:id`

**Headers:** `Authorization: Bearer <token>`

No body required.

---

## CLIENTS

### `GET /clients`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": "c1",
    "name": "Skanska Group",
    "alt": "Skanska Group logo",
    "showInHomePage": true,
    "imageUrl": "https://..."
  }
]
```

---

### `POST /clients`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
items[0][name]           = "Skanska Group"
items[0][alt]            = "Skanska Group logo"
items[0][showInHomePage] = true
image_0                  = <File>
```

---

### `PATCH /clients/:id`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
name           = "Skanska Group"
alt            = "Updated logo alt"
showInHomePage = false
image          = <File>        (optional)
```

---

### `DELETE /clients/:id`

**Headers:** `Authorization: Bearer <token>`

No body required.

---

## STATS

Global site-wide statistics. Single document — no create or delete.

### `GET /stats`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "projectsCompleted": "500+",
  "clients": "200+",
  "yearsOfExcellence": "15+"
}
```

---

### `PATCH /stats`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: application/json`

**Payload:**
```json
{
  "projectsCompleted": "600+",
  "clients": "250+",
  "yearsOfExcellence": "16+"
}
```

---

## ABOUT

### `GET /about`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "storyText1": "Elite Facade Solutions is a global leader in façade engineering...",
  "storyText2": "Founded with a vision to merge technical precision...",
  "coreValues": [
    { "id": "cv1", "icon": "straighten", "title": "Precision", "description": "Every millimeter matters." }
  ],
  "certifications": [
    { "id": "cert1", "icon": "new_releases", "label": "ISO 9001:2015" }
  ],
  "heroImageUrl": "https://...",
  "storyImageUrl": "https://..."
}
```

---

### `POST /about`

**Headers:** `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Payload:**
```
storyText1                    = "Elite Facade Solutions is a global leader in façade engineering..."
storyText2                    = "Founded with a vision to merge technical precision..."

coreValues[0][icon]           = "straighten"
coreValues[0][title]          = "Precision"
coreValues[0][description]    = "Every millimeter matters."

certifications[0][icon]       = "new_releases"
certifications[0][label]      = "ISO 9001:2015"

heroImageFile                 = <File>
storyImageFile                = <File>
```

---

## Endpoint Summary

| Entity      | GET                  | POST              | PATCH                      | DELETE                        |
|-------------|----------------------|-------------------|----------------------------|-------------------------------|
| Auth        | —                    | `/auth/login`     | —                          | —                             |
| Products    | `/products`          | `/products`       | `/products/:id`            | `/products/:id`               |
| Projects    | `/projects`          | `/projects`       | `/projects/:id`            | `/projects/:id`               |
| Services    | `/services`          | `/services`       | `/services`                | `/services/<sub>/:id`         |
| Fabrication | `/fabrication`       | `/fabrication`    | `/fabrication`             | `/fabrication/<sub>/:id`      |
| Clients     | `/clients`           | `/clients`        | `/clients/:id`             | `/clients/:id`                |
| Stats       | `/stats`             | —                 | `/stats`                   | —                             |
| About       | `/about`             | `/about`          | —                          | —                             |
