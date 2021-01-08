# Node / Express API quick start template

## Setup and commands
Note: Make sure that you have [Postgres](https://www.postgresql.org/download/) installed locally
- `npm i -D`
- `npm run migrate`
- `npm run seed`
- `npm run server`

Other commands:
- `npm test` (Currently no tests are implemented)
- `npm start`
- `npm run rollback`

## **Endpoints**

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/words/json | used for adding a large json file of new words to the db |
| GET | /api/words | returns an approved word for the game |
| GET | /api/words/unmoderated | returns an unmoderated word to be moderated |
| PUT | /api/words/:id | edits a word, currently in use for approving a word on the moderation page |
| PUT | /api/words/:id/approve | approves a word without the ability to edit the definition (CURRENTLY NOT USED) |
| PUT | /api/words/:id/reject | rejects a word from being considered as a game word |

### POST /api/words/json
Request body:
```
[
    {word1: definition1},
    {word2: definition2},
    .
    .
    .
    {word1000: definition1000}
]
```
Returns:
```
{
    "added": 1000,
    "skipped": 0
}
```

### GET /api/words
Returns:
```
{
    "word": {
        "id": 32,
        "word": "baldachin",
        "definition": "A rich fabric of silk and gold brocade.",
        "moderated": true,
        "approved": true
    }
}
```

### GET /api/words/unmoderated
Returns:
```
{
    "id": 35,
    "word": "boondocking",
    "definition": "Present participle of boondock.",
    "moderated": false,
    "approved": false
}
```

### PUT /api/words/:id
Request body:
```
{
    "definition": "testing",
    "moderated": true,
    "approved": true
}
```
Returns:
```
{
    "updated": {
        "id": 35,
        "word": "boondocking",
        "definition": "testing",
        "moderated": true,
        "approved": true
    }
}
```

### PUT /api/words/:id/approve NOT IN USE
Request body:
```
None
```
Returns:
```
{
    "word": {
        "id": 35,
        "word": "boondocking",
        "definition": "testing",
        "moderated": true,
        "approved": true
    }
}
```

### PUT /api/words/:id/reject
Request body:
```
None
```
Returns:
```
{
    "word": {
        "id": 35,
        "word": "boondocking",
        "definition": "testing",
        "moderated": true,
        "approved": false
    }
}
```
