
---

# Event Management System - Backend  

This is the **backend API** for the Event Management System. It handles **authentication**, **authorization**, and **M-Pesa payment processing** functionality. The backend is built using **Node.js** and **Express.js** and uses **MySQL** as the database.  

---

## Table of Contents  

1. [Overview](#overview)  
2. [Authentication and Authorization](#authentication-and-authorization)  
    - [User Registration](#user-registration)  
    - [User Login](#user-login)  
    - [Admin Login](#admin-login)  
3. [Payment Processing](#payment-processing)  
    - [Payment via M-Pesa STK Push](#payment-via-m-pesa-stk-push)  
    - [Callback Handling](#callback-handling)  
4. [Installation and Setup](#installation-and-setup)  
5. [Environment Variables](#environment-variables)  
6. [API Endpoints](#api-endpoints)  
7. [Sample Requests (Postman)](#sample-requests-postman)  
8. [Common Issues](#common-issues)  
9. [License](#license)  

---

## Overview  

This backend system provides APIs for managing event-related operations, with user authentication, admin-level controls, and seamless integration with **M-Pesa STK push** for payment processing. The backend supports users with the roles `user` and `admin`.  

> **Note**: All endpoints and functionalities have been tested using **Postman** and are working perfectly.  

---

## Authentication and Authorization  

### 1. User Registration  

**Endpoint**: `/api/auth/register`  
**Method**: `POST`  
**Description**: Allows a new user to register as a regular user or admin.  

#### Request Body (JSON):  
```json
{
  "username": "adminUser",
  "email": "admin@example.com",
  "password": "securepassword",
  "role": "admin"
}
```  

#### Response  

**Success (201 Created)**:  
```json
{
  "message": "User registered successfully"
}
```  

**Error (400 Bad Request)**:  
```json
{
  "message": "Email already exists"
}
```  

#### Validation Rules:  
- `username`: At least 3 characters.  
- `email`: Must be unique and follow a valid email format.  
- `password`: At least 6 characters.  
- `role`: Optional, can be `admin` or `user` (default is `user`).  

---

### 2. User Login  

**Endpoint**: `/api/auth/login`  
**Method**: `POST`  
**Description**: Allows a registered user to log in and obtain a JWT token.  

#### Request Body (JSON):  
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```  

#### Response  

**Success (200 OK)**:  
```json
{
  "message": "Login successful",
  "token": "<JWT_Token>"
}
```  

**Error (401 Unauthorized)**:  
```json
{
  "message": "Invalid credentials"
}
```  

**Error (404 Not Found)**:  
```json
{
  "message": "User not found"
}
```  

---

### 3. Admin Login  

**Endpoint**: `/api/auth/admin-login`  
**Method**: `POST`  
**Description**: Allows admins to log in and receive a JWT token.  

#### Request Body (JSON):  
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```  

#### Response  

**Success (200 OK)**:  
```json
{
  "message": "Admin login successful",
  "token": "<JWT_Token>"
}
```  

---

## Payment Processing  

### 1. Payment via M-Pesa STK Push  

**Endpoint**: `/api/payments/process`  
**Method**: `POST`  
**Description**: Initiates an M-Pesa STK push for payment.  

#### Request Body (JSON):  
```json
{
  "phone": "0712345678",
  "amount": 100
}
```  

#### Response  

**Success (200 OK)**:  
```json
{
  "message": "Payment request sent. Await M-Pesa confirmation.",
  "data": { ... }
}
```  

**Error (400 Bad Request)**:  
```json
{
  "message": "Invalid input data"
}
```  

> **Note**: The phone number provided should be in the format `07XXXXXXXX`. The backend will automatically convert it to the international format (`2547XXXXXXXX`).  

---

### 2. Callback Handling  

**Endpoint**: `/api/payments/callback`  
**Method**: `POST`  
**Description**: Handles payment status updates from M-Pesa.  

**Example Response** (from M-Pesa):  
```json
{
  "Body": {
    "stkCallback": {
      "ResultCode": 0,
      "ResultDesc": "The service request is processed successfully.",
      "CallbackMetadata": {
        "Item": [
          { "Name": "Amount", "Value": 100 },
          { "Name": "MpesaReceiptNumber", "Value": "ABC123" },
          { "Name": "PhoneNumber", "Value": "254712345678" }
        ]
      }
    }
  }
}
```  

---

## Installation and Setup  

### Prerequisites  
- **Node.js**: v14 or later.  
- **MySQL**: v5.7 or later.  

---

### Setup  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/PrudenceGikundi/Group20PLP/tree/backend/eventmanagementapp/backend
   cd backend
   ```  

2. **Install dependencies**:  
   ```bash
   npm install
   ```  

3. **Configure `.env` file** (see [Environment Variables](#environment-variables)).  

4. **Start the server**:  
   ```bash
   npm start
   ```  

---

## Environment Variables  

Set up a `.env` file in the root directory with the following:  

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=event_management

MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
CALLBACK_URL=https://1234abcd.ngrok.io
BUSINESS_SHORTCODE=174379
PASSKEY=bfb279f9aa9...

JWT_SECRET=your_jwt_secret
PORT=3000
```  

---

## Sample Requests (Postman)  

### User Registration  
**URL**: `http://localhost:3000/api/auth/register`  
**Method**: `POST`  
**Body (JSON)**:  
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password"
}
```  

---

### Payment  
**URL**: `http://localhost:3000/api/payments/process`  
**Method**: `POST`  
**Body (JSON)**:  
```json
{
  "phone": "0712345678",
  "amount": 10
}
```  

---

## Common Issues  

1. **Invalid phone format**: Ensure the phone number is in the format `07XXXXXXXX`.  
2. **STK push fails**: Verify `CALLBACK_URL` and M-Pesa API credentials.  

---

## License  

This project is licensed under the MIT License.  