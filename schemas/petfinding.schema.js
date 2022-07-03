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
    "subbreed": {
      "description": "dog's sub breed",
      "type": "string"
    },
    "shelter": {
      "description": "shelter location where pets staying",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of pet finding",
      "type": "string"
    },
    "imageurl": {
      "description": "URL for main image to show in finding",
      "type": "uri"
    },
    "published": {
      "description": "Is the finding published or not",
      "type": "boolean"
    },
    "userid": {
      "description": "User ID of the finding created",
      "type": "integer",
      "minimum": 0
    },
  },
  "required": ["breed", "shelter", "userid"]
}
