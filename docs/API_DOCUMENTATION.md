# Elite Facade Solutions — API Reference

**Base URL:** `http://localhost:8000/api`

> All endpoints (except login) require header: `Authorization: Bearer <token>`

---

## POST `/auth/login`

```json
{
  "username": "admin",
  "password": "password123"
}
```

---

## POST `/products` — `multipart/form-data`

```json
{
  "items": [
    {
      "title": "HG-800 Unitized Series",
      "description": "Prefabricated panelized façade for rapid installation.",
      "badge": "Best Seller",
      "specs": ["U-Value: 0.85 W/m²K", "Wind Load: Up to 5.0 kPa"]
    }
  ],
  "image_0": "<File>",
  "image_1": "<File>"
}
```

---

## POST `/projects` — `multipart/form-data`

```json
{
  "items": [
    {
      "title": "The Zenith Plaza",
      "category": "Exterior Facade",
      "location": "Dubai, UAE",
      "alt": "Corporate Tower Facade"
    }
  ],
  "image_0": "<File>",
  "image_1": "<File>"
}
```

---

## POST `/services` — `multipart/form-data`

```json
{
  "regions": [
    {
      "icon": "public",
      "title": "North America",
      "description": "Strategic headquarters managing high-profile developments."
    }
  ],
  "items": [
    {
      "title": "Technical Consultation",
      "description": "Feasibility studies and structural performance analysis.",
      "features": ["Risk Assessment", "Budget Estimation"]
    }
  ],
  "image_0": "<File>"
}
```

---

## POST `/fabrication` — `multipart/form-data`

```json
{
  "stats": [
    {
      "icon": "precision_manufacturing",
      "label": "Tolerance",
      "value": "± 0.25mm"
    }
  ],
  "items": [
    {
      "title": "Automated Milling",
      "alt": "CNC milling station"
    }
  ],
  "image_0": "<File>"
}
```

---

## POST `/clients` — `multipart/form-data`

```json
{
  "items": [
    {
      "alt": "Global architectural firm logo"
    }
  ],
  "stats": [
    {
      "value": "500+",
      "label": "Projects Completed"
    }
  ],
  "image_0": "<File>"
}
```

---

## POST `/faq` — `multipart/form-data`

```json
{
  "categories": [
    {
      "name": "General",
      "icon": "info"
    }
  ],
  "items": [
    {
      "question": "What types of façade systems do you specialize in?",
      "answer": "We specialize in high-performance unitized curtain walls..."
    }
  ]
}
```

---

## POST `/about` — `multipart/form-data`

```json
{
  "storyText1": "Elite Facade Solutions is a global leader in façade engineering...",
  "storyText2": "Founded with a vision to merge technical precision...",
  "stats": [
    {
      "value": "15+",
      "label": "Years of Experience"
    }
  ],
  "coreValues": [
    {
      "icon": "straighten",
      "title": "Precision",
      "description": "Every millimeter matters."
    }
  ],
  "certifications": [
    {
      "icon": "new_releases",
      "label": "ISO 9001:2015"
    }
  ],
  "heroImageFile": "<File>",
  "storyImageFile": "<File>"
}
```