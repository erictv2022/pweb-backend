module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user",
    "title": "User",
    "description": "a user in the app",
    "type": "object",
    "properties": {
        "username": {
            "description": "user name",
            "type": "string"
        },
        "password": {
            "description": "user password",
            "type": "string",
            "minLength": 8
        },
        "email": {
            "description": "email used to register account",
            "type": "string"
        },
        "firstname": {
            "description": "user first name",
            "type": "string"
        },
        "lastname": {
            "description": "user last name",
            "type": "string"
        },
        "about": {
            "description": "user self introduction",
            "type": "string"
        },
        "avatarurl": {
            "description": "URL for user as profile photo",
            "type": "uri"
        },
        "regcode": {
            "description": "user enter this regard as special identity",
            "type": "string"
        }
    },
    "required": ["username", "password", "email"]
}
