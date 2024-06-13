# Web Services Agronect Capstone - C241-PS501

## Team Members

-   **Sarah Suwarno** – Universitas Indonesia – (ML) M010D4KX3022
-   **Andhika Rhaifahrizal Hartono** – Universitas Dian Nuswantoro – (ML) M007D4KY2878
-   **Faizal Ilyas Syah Putra** – Universitas Gajah Mada – (ML) M008D4KY3112
-   **Bagus Syafiq Faqihuddin** – Universitas Jenderal Soedirman – (CC) C229D4KY1116
-   **Rawiansyah Andhika Suarnanusa** – Universitas Pembangunan Nasional "Veteran" Yogyakarta – (CC) C297D4KY0696
-   **Benedictus Irvanda Nugroho** – Universitas Pembangunan Nasional "Veteran" Yogyakarta – (MD) A297D4KY3818
-   **Muhammad Rizky** – Universitas Pembangunan Nasional "Veteran" Yogyakarta – (MD) A297D4KY3817

# API Documentation

This document provides information on how to use the API endpoints and their functionalities.

## URL Services

-   **Base URL:** [https://agronect-testing-sprknqibeq-et.a.run.app/](https://agronect-testing-sprknqibeq-et.a.run.app/)

## Recap Endpoint Routes

| Route                              | HTTP Method | Description                |
| ---------------------------------- | ----------- | -------------------------- |
| /signup                            | POST        | Sign up a new user         |
| /signin                            | POST        | Sign in a user             |
| /signout                           | POST        | Sign out a user            |
| /users                             | GET         | Get all users              |
| /users/:user_id                    | GET         | Get user by ID             |
| /users/:user_id                    | PUT         | Update user name and email |
| /users/change-password/:user_id    | PUT         | Change user password       |
| /users/:user_id/uploadProfilePhoto | PUT         | Upload user profile photo  |
| /sharing                           | POST        | Add sharing content        |
| /sharing                           | GET         | Get all sharing content    |
| /sharing/:sharing_id               | GET         | Get sharing by ID          |
| /sharing/:sharing_id               | PUT         | Update sharing by ID       |
| /sharing/:sharing_id               | DELETE      | Delete sharing by ID       |

## Endpoints

### SIGN UP

Create a new user account.

-   **Method:** POST
-   **Path:** /signup
-   **Body Parameters:**

    ```json
    {
        "name": "Test",
        "email": "test1@gmail.com",
        "password": "Baguskeren77"
    }
    ```

-   **Response:**

    -   **Success (201 CREATED)**

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

-   **Method:** POST
-   **Path:** /signin
-   **Body Parameters:**

    ```json
    {
        "email": "test1@gmail.com",
        "password": "Baguskeren77"
    }
    ```

-   **Response:**

    -   **Success (200 OK)**

    ```json
    {
        "status": "success",
        "user_id": "nqKeaO1vLxHM",
        "name": "Test",
        "email": "test1@gmail.com",
        "access_token": "your_access_token", // Access token refresh each login
        "message": "Login success"
    }
    ```

### SIGN OUT

Sign out a user.

-   **Method:** POST
-   **Path:** /signout
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {}
    ```

-   **Response:**

    -   **Success (200 OK)**

    ```json
    {
        "status": "success",
        "message": "Signout success",
        "data": null
    }
    ```

### GET ALL USERS

Get all users.

-   **Method:** GET
-   **Path:** /users
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {}
    ```

-   **Response:**

    -   **Success (200 OK)**

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

### GET USER BY ID

Get user by unique ID.

-   **Method:** GET
-   **Path:** /users/:user_id
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {}
    ```

-   **Response:**

    -   **Success (200 OK)**

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

Update user's name and email.

-   **Method:** PUT
-   **Path:** /users/:user_id
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {
        "name": "Test2",
        "email": "test1@gmail.com"
    }
    ```

-   **Response:**

    -   **Success (200 OK)**

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

Change user's password.

-   **Method:** PUT
-   **Path:** /users/change-password/:user_id
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {
        "oldPassword": "Baguskeren77",
        "newPassword": "BagusGanteng78",
        "confirmPassword": "BagusGanteng78"
    }
    ```

-   **Response:**

    -   **Success (200 OK)**

    ```json
    {
        "status": "success",
        "message": "Password updated successfully"
    }
    ```

### UPLOAD PROFILE PHOTO

Upload a user's profile photo.

-   **Method:** POST
-   **Path:** /users/:user_id/upload-photoprofile
-   **Authentication:** Token
-   **URL Parameters:**

    -   `user_id`: The ID of the user

-   **Headers:**

    -   `Content-Type: multipart/form-data`

-   **Body Parameters:**

    -   `profile_photo`: The profile photo file (image)

-   **Response:**

    -   **Success (200 OK)**

    ```json
    {
        "status": "success",
        "message": "Profile photo uploaded successfully",
        "dataUploadProfile": {
            "photoProfileUrl": "https://storage.googleapis.com/agronect-test-bucket/Photo-Profile_Image/profile-photo-9H-O"
        }
    }
    ```

### ADD SHARING CONTENT

Add sharing content for a user.

-   **Method:** POST
-   **Path:** /sharing
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {
        "content": "Testing a response sharing",
        "imgUrl": "https://imageexample.com" // Can be null
    }
    ```

-   **Response:**

    -   **Success (201 CREATED)**

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

Get all sharing content.

-   **Method:** GET
-   **Path:** /sharing
-   **Authentication:** Token
-   **Parameters:**

    -   `page`: integer (optional)
    -   `size`: integer (optional)

-   **Response:**

-   **Success (200 OK)**

```json
{
    "status": "success",
    "message": "Sharing content found",
    "dataGetAll": [
        {
            "sharing_id": "sharing-68ov",
            "user_id": "Ae5CDM038Dns",
            "name": "rizky(O_O)",
            "content": "hai aku dewangga",
            "imgUrl": null,
            "created_at": "2024-06-12T03:37:44.000Z",
            "updated_at": "2024-06-12T03:37:44.000Z"
        },
        {
            "sharing_id": "sharing--Nns",
            "user_id": "Ae5CDM038Dns",
            "name": "rizky(O_O)",
            "content": "fdjgdhjfghjfghjfghj",
            "imgUrl": null,
            "created_at": "2024-06-12T03:37:27.000Z",
            "updated_at": "2024-06-12T03:37:27.000Z"
        },
        {
            "sharing_id": "sharing-04NN",
            "user_id": "Ae5CDM038Dns",
            "name": "rizky(O_O)",
            "content": "hai aku rizky\n",
            "imgUrl": "https://storage.googleapis.com/agronect-test-bucket/Sharing_Image/sharing-image-awk_",
            "created_at": "2024-06-12T03:32:43.000Z",
            "updated_at": "2024-06-12T03:32:43.000Z"
        },
        {
            "sharing_id": "sharing-ta-9",
            "user_id": "ad4hBhEo6FrS",
            "name": "irvan",
            "content": "halo baru baru",
            "imgUrl": "https://storage.googleapis.com/agronect-test-bucket/Sharing_Image/sharing-image-MWLN",
            "created_at": "2024-06-11T08:34:15.000Z",
            "updated_at": "2024-06-11T08:34:15.000Z"
        },
        {
            "sharing_id": "sharing-90V5",
            "user_id": "Ae5CDM038Dns",
            "name": "rizky",
            "content": "mshhdbamajs shshs d dnjs s djcjcjdd  xnx d d djdjsjsuhevd xjsbe d djs d djdihzhahdidb d djxuxhbsbs elaosudhoaow e diaosisioajs soaisusoaoe zoaosuoaosos soauysoeoais zosieiwn s soqowueisowwb soqiwusiausoa  soaisisoaiabsl spsiauwoejsboaoa sosisuoaiabssoiaiehs soahshs soshe snaiwhe os e d soaisjs s",
            "imgUrl": "https://storage.googleapis.com/agronect-test-bucket/Sharing_Image/sharing-image-5geB",
            "created_at": "2024-06-11T07:08:05.000Z",
            "updated_at": "2024-06-11T07:08:05.000Z"
        }
    ],
    "pagination": {
        "totalItems": 34,
        "totalPages": 7,
        "currentPage": 1,
        "itemsPerPage": 5
    }
}
```

### GET SHARING BY ID

Get sharing content by ID.

-   **Method:** GET
-   **Path:** /sharing/:sharing_id
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {}
    ```

-   **Response:**

    -   **Success (200 OK)**

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

Update sharing content.

-   **Method:** PUT
-   **Path:** /sharing/:sharing_id
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {
        "content": "Testing response update",
        "imgUrl": null
    }
    ```

-   **Response:**

    -   **Success (200 OK)**

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

### DELETE SHARING

Delete sharing content by ID.

-   **Method:** DELETE
-   **Path:** /sharing/:sharing_id
-   **Authentication:** Token
-   **Body Parameters:**

    ```json
    {}
    ```

-   **Response:**

    -   **Success (200 OK)**

    ```json
    {
        "status": "success",
        "message": "Sharing deleted successfully"
    }
    ```
