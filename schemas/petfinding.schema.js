module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/petfinding",
  "title": "Pet Finding",
  "description": "An finding of dogs in the shelter center",
  "type": "object",
  "properties": {
    "breed": {
      "description": "dog's breed",
      "type": "string"
    },
    "subBreed": {
      "description": "dog's sub breed",
      "type": "string"
    },
    "centerLocation": {
      "description": "shelter location where pets staying",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of pet finding",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show in finding",
      "type": "uri"
    },
    "published": {
      "description": "Is the finding published or not",
      "type": "boolean"
    },
    "userId": {
      "description": "User ID of the finding created",
      "type": "integer",
      "minimum": 0
    },
  },
  "required": ["breed", "centerLocation", "userId"]
}