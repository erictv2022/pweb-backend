module.exports = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "default": {},
    "title": "Favourite Schema",
    "required": [
    "user_id",
    "finding_id",
    "create_date"
],
    "properties": {
    "id": {
        "type": "integer",
            "default": 0,
            "title": "The id Schema",
            "examples": [
            1
        ]
    },
    "user_id": {
        "type": "integer",
            "default": 0,
            "title": "The user_id Schema",
            "examples": [
            1
        ]
    },
    "finding_id": {
        "type": "integer",
            "default": 0,
            "title": "The finding_id Schema",
            "examples": [
            1
        ]
    },
    "create_date": {
        "type": "string",
            "default": "",
            "title": "The create_date Schema",
            "examples": [
            "2022-02-14T18:25:43.511Z"
        ]
    }
},
    "examples": [{
    "id": 1,
    "user_id": 1,
    "finding_id": 1,
    "create_date": "2022-02-14T18:25:43.511Z"
}]
}