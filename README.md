# Negative Affirmations API

Negative Affirmations for when you are feeling sad and gloomy.

## API Reference

#### Get all items

```http
  GET /affirmations
```

| Parameter | Type      | Description                                      |
| :-------- | :-------- | :----------------------------------------------- |
| `page`    | `integer` | The page of results to retrieve.                 |
| `limit`   | `integer` | The number of affirmations to retrieve per page. |

#### Example Response

```http
    GET /affirmations?page=1&limit=5
```

```json
{
  "totalAffirmations": 61,
  "totalPages": 13,
  "currentPage": 1,
  "limit": 5,
  "affirmations": [
    "I am a failure.",
    "Nothing ever goes right.",
    "I am not good enough.",
    "I always mess things up.",
    "Nobody likes me."
  ]
}
```

## OpenAPI Documentation

Swagger UI available at this endpoint `/api-docs`.

## Tech Stack

- Node
- Express
- OpenAPI
