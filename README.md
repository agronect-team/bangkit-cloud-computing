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

## Recap Endpoint Routes

| Route    | HTTP Method | Description        |
| -------- | ----------- | ------------------ |
| /signup  | POST        | Sign up a new user |
| /signin  | POST        | Sign in a user     |
| /signout | POST        | Sign out a user    |

## Endpoints

### POST /signup

Create a new user account.

#### Request

-   Method: POST
-   Path: /signup
-   Body Parameters:

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

### POST /signin

Authenticate and sign in a user.

#### Request

-   Method: POST
-   Path: /signin
-   Body Parameters:

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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5xS2VhTzF2THhITSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNzE2NzgxMDk1LCJleHAiOjE3MTY3ODQ2OTV9.IBF__BzpKKoLjCTCVOeEFrCLWSKMq_TMEFfb0ZqatM0",
    "message": "Login success"
}
```

### POST /signin

Authenticate and sign in a user.

#### Request

-   Method: POST
-   Path: /signout
-   Body Parameters:

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
