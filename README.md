# Web Services Agronect Capstone - C241-PS501

## Team Member

**(ML) M010D4KX3022** – Sarah Suwarno – Universitas Indonesia

**(ML) M007D4KY2878** – Andhika Rhaifahrizal Hartono – Universitas Dian Nuswantoro

**(ML) M008D4KY3112** – Faizal Ilyas Syah Putra – Universitas Gajah Mada

**(CC) C229D4KY1116** – Bagus Syafiq Faqihuddin – Universitas Jenderal Soedirman

**(CC) C297D4KY0696** – Rawiansyah Andhika Suarnanusa – Universitas Pembangunan Nasional "Veteran" Yogyakarta

**(MD) A297D4KY3818** – Benedictus Irvanda Nugroho – Universitas Pembangunan Nasional "Veteran" Yogyakarta

**(MD) A297D4KY3817** – Muhammad Rizky – Universitas Pembangunan Nasional "Veteran" Yogyakarta

# API Documentation

This document provides information on how to use the API endpoints and their functionalities.
`

# URL Services

Link URL : https://agronect-testing-sprknqibeq-et.a.run.app/

## Recap Endpoint Routes

| Route                           | HTTP Method | Description                |
| ------------------------------- | ----------- | -------------------------- |
| /signup                         | POST        | sign up a new user         |
| /signin                         | POST        | sign in a user             |
| /signout                        | POST        | sign out a user            |
| /users                          | GET         | get all users              |
| /users/:user_id                 | GET         | get user by UID            |
| /users/:user_id                 | PUT         | update name and email user |
| /users/change-password/:user_id | PUT         | change password user |
| /sharing                        | POST        | add sharing each user      |
| /sharing                        | GET         | get all sharing            |
| /sharing/:sharing_id            | GET         | get sharing by id          |
| /sharing/:sharing_id            | PUT         | update sharing by id       |
| /sharing/:sharing_id            | DELETW      | delete sharing by id       |

## Endpoints

### SIGN UP

Create a new user account.

#### Request

-   Method : POST
-   Path : /signup
-   Body Parameters :

```json
{
    "name": "Test",
    "email": "test1@gmail.com",
    "password": "Baguskeren77"
}
```

#### Response

-   Succes (201 CREATED)

```json
{
    "status": "success",
    "message": "User created successfully",
    "data": {
        "name": "Test",
        "email": "test1@gmail.com"
    }
}
```

### SIGN IN

Authenticate and sign in a user.

#### Request

-   Method : POST
-   Path : /signin
-   Body Parameters :

```json
{
    "email": "test1@gmail.com",
    "password": "Baguskeren77"
}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "user_id": "nqKeaO1vLxHM",
    "name": "Test",
    "email": "test1@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5xS2VhTzF2THhITSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNzE2NzgxMDk1LCJleHAiOjE3MTY3ODQ2OTV9.IBF__BzpKKoLjCTCVOeEFrCLWSKMq_TMEFfb0ZqatM0", //access token refresh each login
    "message": "Login success"
}
```

### SIGN OUT

Method to sign out a user.

#### Request

-   Method : POST
-   Path : /signout
-   Authentication : Token
-   Body Parameters :

```json
{}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "Signout success",
    "data": null
}
```

### GET ALL USERS

Get all users .

#### Request

-   Method : GET
-   Path : /users
-   Authentication : Token
-   Body Parameters:

```json
{}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "Users found",
    "data": [
        {
            "user_id": "4PPGmix5Tim3",
            "name": "irvan",
            "email": "irvan@gmail.com"
        },
        {
            "user_id": "FvO6JEA5LHmQ",
            "name": "msdfkljsh",
            "email": "honda@gmail.com"
        },
        {
            "user_id": "nqKeaO1vLxHM",
            "name": "Test",
            "email": "test1@gmail.com"
        }
    ]
}
```

### GET USERS BY ID

Get user by unique ID.

#### Request

-   Method : GET
-   Path : /users/:user_id
-   Authentication : Token
-   Body Parameters:

```json
{}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "User found",
    "data": {
        "user_id": "nqKeaO1vLxHM",
        "name": "Test",
        "email": "test@gmail.com",
        "role": "user",
        "created_at": "2024-05-27T03:37:00.000Z",
        "updated_at": "2024-05-27T03:37:00.000Z"
    }
}
```

### UPDATE USER NAME AND EMAIL

Method to update data email and username .

#### Request

-   Method : PUT
-   Path : /users/:user_id
-   Authentication : Token
-   Body Parameters:

```json
{
    "name": "Testing",
    "email": "test@gmail.com"
}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "User updated successfully",
    "dataUpdate": {
        "user_id": "nqKeaO1vLxHM",
        "name": "Test2",
        "email": "test1@gmail.com"
    }
}
```

### CHANGE PASSWORD

Method to change password user.

#### Request

-   Method : PUT
-   Path : /users/change-password/:user_id
-   Authentication : Token
-   Body Parameters:

```json
{
    "oldPassword": "Baguskeren77",
    "newPassword": "BagusGanteng78",
    "confirmPassword": "BagusGanteng78"
}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "Password updated successfully"
}
```

### POST SHARING/DISCUSSION

Method to post sharing section user .

#### Request

-   Method : POST
-   Path : /sharing
-   Authentication : Token
-   Body Parameters:

```json
{
    "content": "Testing a response sharing",
    "imgUrl": "https://imageexample.com" //can be null
}
```

#### Response

-   Success(201 CREATED)

```json
{
    "status": "success",
    "message": "Content shared successfully",
    "dataPost": {
        "sharing_id": "sharing-cGzG",
        "name": "test",
        "content": "Testing a response sharing",
        "imgUrl": "https://imageexample.com"
    }
}
```

### GET ALL SHARING

Method to get all user sharing .

#### Request

-   Method : GET
-   Path : /sharing
-   Authentication : Token
-   Body Parameters:

```json
{}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "Sharing content found",
    "dataGetAll": [
        [
            {
                "sharing_id": "sharing-t0eU",
                "content": "ASIKKKKK UHUYYYY BANGET NIH JADI",
                "imgUrl": null,
                "created_at": "2024-06-06T00:54:04.000Z",
                "updated_at": "2024-06-06T00:54:04.000Z",
                "name": "test",
                "user_id": "MU-GNKIDHI4T"
            }
        ]
    ]
}
```

### GET SHARING BY SHARING ID

Method to get sharing by id .

#### Request

-   Method : GET
-   Path : /sharing/:sharing_id
-   Authentication : Token
-   Body Parameters:

```json
{}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "Sharing found",
    "dataGetById": {
        "sharing_id": "sharing-fCdU",
        "user_id": "MU-GNKIDHI4T",
        "name": "test",
        "content": "ASIKKKKK UHUYYYY BANGET NIH JADI KALI",
        "ImgUrl": null
    }
}
```

### UPDATE SHARING

Method to update data email and username .

#### Request

-   Method : PUT
-   Path : /sharing/:sharing_id
-   Authentication : Token
-   Body Parameters:

```json
{
    "content": "Testing response update",
    "imgUrl": null
}
```

#### Response

-   Success(200 OK)

```json
{
    "status": "success",
    "message": "Sharing updated successfully",
    "dataUpdate": {
        "sharing_id": "sharing-t0eU",
        "content": "Testing response update",
        "imgUrl": null
    }
}
```
