# CA-T3A2-B-travelers-forum-server

## API Endpoints

### Auth Routes

#### /auth/reigster/

- Request Verb: POST
- Function: Creates a new Member document in the database
- Required Arguments: N/A
- Authentication: N/A
- Authorization: N/A
- Example Request:

```json
{
    "username": "NewTestUser",
    "password": "Admin123!"
}
```

- Example Response:

```json
{
    "id": "63d3875876174e866cf4548f",
    "username": "NewTestUser",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDM4NzU4NzYxNzRlODY2Y2Y0NTQ4ZiIsImlhdCI6MTY3NDgwNzEyOH0.bd1Bd-uXpBn3XVDM-PTvIINv1YJFf-T98A-9XaymQ7A"
}
```

#### /auth/login/

- Request Verb: POST
- Function: Takes an existing Member's credentials and returns a bearer token if credentials match against those in the database
- Required Arguments: N/A
- Authentication: N/A
- Authorization: N/A
- Example Request:

```json
{
    "username": "NewTestUser",
    "password": "Admin123!"
}
```

- Example Response:

```json
{
    "id": "63d3875876174e866cf4548f",
    "username": "NewTestUser",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDM4NzU4NzYxNzRlODY2Y2Y0NTQ4ZiIsImlhdCI6MTY3NDgwNzE5N30.Aav6txz-tYhTKVsR36DMYeKRhZDtNHLgMkdCYxVtxK4"
}
```

### Comment Routes

#### /comments/new/

- Request Verb: POST
- Function: Creates a new Comment document in the database
- Required Arguments: N/A
- Authentication: JWT
- Authorization: N/A
- Example Request:

```json
To be filled in when JWT working
```

- Example Response:

```json
To be filled in when JWT working
```

#### /comments/:id

- Request Verb: PUT
- Function: Updates an existing Comment document in the database
- Required Arguments: id (Mongo Object Id reference for Comment)
- Authentication: JWT
- Authorization: N/A
- Example Request:

```json
To be filled in when JWT working
```

- Example Response:

```json
To be filled in when JWT working
```

#### /comments/:id

- Request Verb: DELETE
- Function: Deletes an existing Comment document from the database
- Required Arguments: id (Mongo Object Id reference for Comment)
- Authentication: JWT
- Authorization: N/A
- Example Request: N/A
- Example Response: N/A

### Member Routes

#### /members/

- Request Verb: GET
- Function: Retrieves all Members from the database
- Required Arguments: N/A
- Authentication: N/A
- Authorization: N/A
- Example Request: N/A
- Example Response:

```json
[
    {
        "_id": "63d37e827258d1092a616c57",
        "username": "Callum",
        "joined_date": "2023-01-27T07:34:26.242Z"
    },
    {
        "_id": "63d37e827258d1092a616c58",
        "username": "Mario",
        "joined_date": "2023-01-27T07:34:26.242Z"
    }
]
```

#### /members/:id

- Request Verb: GET
- Function: Retrieves a single Member from the database
- Required Arguments: id (Mongo Object Id reference for Member)
- Authentication: N/A
- Authorization: N/A
- Example Request: N/A
- Example Response:

```json
{
    "_id": "63d3875876174e866cf4548f",
    "username": "NewTestUser",
    "joined_date": "2023-01-27T08:11:51.356Z"
}
```

### Post Routes

#### /posts/

- Request Verb: GET
- Function: Retrieves all Posts from the database
- Required Arguments: N/A
- Authentication: N/A
- Authorization: N/A
- Example Request: N/A
- Example Response:

```json
[
    {
        "_id": "63d38ace76174e866cf45494",
        "title": "New Test Post 3",
        "author": {
            "_id": "63d3875876174e866cf4548f",
            "username": "NewTestUser"
        },
        "date_posted": "2023-01-27T08:11:51.352Z",
        "category": "North America",
        "content": "A cool story would go here",
        "comments": [],
        "__v": 0
    },
    {
        "_id": "63d38af076174e866cf45497",
        "title": "New Test Post 2",
        "author": {
            "_id": "63d37e827258d1092a616c57",
            "username": "Callum"
        },
        "date_posted": "2023-01-27T08:11:51.352Z",
        "category": "Asia",
        "content": "Content content content and more content",
        "comments": [],
        "__v": 0
    },
    {
        "_id": "63d38b1b76174e866cf4549a",
        "title": "New Test Post 1",
        "author": {
            "_id": "63d37e827258d1092a616c58",
            "username": "Mario"
        },
        "date_posted": "2023-01-27T08:11:51.352Z",
        "category": "Asia",
        "content": "Really cool content about travelling",
        "comments": [
            {
                "_id": "63d38b5076174e866cf4549d",
                "post": "63d38b1b76174e866cf4549a",
                "author": {
                    "_id": "63d3875876174e866cf4548f",
                    "username": "NewTestUser"
                },
                "date_posted": "2023-01-27T08:11:51.346Z",
                "content": "and a comment to go on the post",
                "__v": 0
            }
        ],
        "__v": 0
    }
]
```

#### /posts/:id

- Request Verb: GET
- Function: Retrieves a single Post from the database
- Required Arguments: id (Mongo Object Id reference for Post)
- Authentication: N/A
- Authorization: N/A
- Example Request: N/A
- Example Response:

```json
{
    "_id": "63d38ace76174e866cf45494",
    "title": "New Test Post 3",
    "author": {
        "_id": "63d3875876174e866cf4548f",
        "username": "NewTestUser"
    },
    "date_posted": "2023-01-27T08:11:51.352Z",
    "category": "North America",
    "content": "A cool story would go here",
    "comments": [],
    "__v": 0
}
```

#### /posts/category/:category

- Request Verb: GET
- Function: Retrieves all Posts from the database with the matching category
- Required Arguments: category
- Authentication: N/A
- Authorization: N/A
- Example Request: N/A
- Example Response:

```json
[
    {
        "_id": "63d38af076174e866cf45497",
        "title": "New Test Post 2",
        "author": {
            "_id": "63d37e827258d1092a616c57",
            "username": "Callum"
        },
        "date_posted": "2023-01-27T08:11:51.352Z",
        "category": "Asia",
        "content": "Content content content and more content",
        "comments": [],
        "__v": 0
    },
    {
        "_id": "63d38b1b76174e866cf4549a",
        "title": "New Test Post 1",
        "author": {
            "_id": "63d37e827258d1092a616c58",
            "username": "Mario"
        },
        "date_posted": "2023-01-27T08:11:51.352Z",
        "category": "Asia",
        "content": "Really cool content about travelling",
        "comments": [
            {
                "_id": "63d38b5076174e866cf4549d",
                "post": "63d38b1b76174e866cf4549a",
                "author": {
                    "_id": "63d3875876174e866cf4548f",
                    "username": "NewTestUser"
                },
                "date_posted": "2023-01-27T08:11:51.346Z",
                "content": "and a comment to go on the post",
                "__v": 0
            }
        ],
        "__v": 0
    }
]
```

#### /posts/new

- Request Verb: POST
- Function: Creates a new Post document in the database
- Required Arguments: N/A
- Authentication: JWT
- Authorization: N/A
- Example Request:

```json
To be filled in when JWT working
```

- Example Response:

```json
To be filled in when JWT working
```

#### /posts/:id

- Request Verb: PUT
- Function: Updates an existing Post document in the database
- Required Arguments: id (Mongo Object Id reference for Post)
- Authentication: JWT
- Authorization: N/A
- Example Request:

```json
To be filled in when JWT working
```

- Example Response:

```json
To be filled in when JWT working
```

#### /posts/:id

- Request Verb: DELETE
- Function: Deletes an existing Post document from the database
- Required Arguments: id (Mongo Object Id reference for Post)
- Authentication: JWT
- Authorization: N/A
- Example Request: N/A
- Example Response: N/A
