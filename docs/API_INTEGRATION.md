# WashOn Customer App - API Integration Guide

This document outlines the complete REST API specification for backend developers connecting to the WashOn customer mobile app.

---

## 1. Authentication & Profile Services

### `POST /api/v1/auth/request-otp`
- **Description:** Sends a 6-digit SMS OTP to an Indian mobile number.
- **Auth Required:** No
- **Request Body:**
```json
{
  "phoneNumber": "+918120652523",
  "countryCode": "+91"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "requestId": "otp_req_98127391823",
    "expiresIn": 60,
    "resendAttemptsLeft": 3
  }
}
```

### `POST /api/v1/auth/verify-otp`
- **Description:** Verifies 6-digit OTP and generates JWT session tokens.
- **Auth Required:** No
- **Request Body:**
```json
{
  "phoneNumber": "+918120652523",
  "otp": "123456",
  "requestId": "otp_req_98127391823"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi...",
    "user": {
      "id": "usr_992182",
      "phoneNumber": "+918120652523",
      "fullName": "Akash Mishra",
      "email": "akash@example.com",
      "isProfileComplete": true,
      "avatarUrl": "https://images.unsplash.com/..."
    }
  }
}
```

---

## 2. Location & Address Management

### `GET /api/v1/addresses`
- **Auth Required:** Bearer Token
- **Response (200 OK):** List of saved user addresses (`home`, `office`, `other`).

### `POST /api/v1/addresses`
- **Auth Required:** Bearer Token
- **Request Body:**
```json
{
  "title": "Home",
  "houseNumber": "Flat 402, Sunshine Heights",
  "street": "Vijay Nagar Main Rd",
  "landmark": "Near C21 Mall",
  "city": "Indore",
  "state": "Madhya Pradesh",
  "pincode": "452010",
  "latitude": 22.7533,
  "longitude": 75.8937,
  "isDefault": true
}
```

---

## 3. Vehicles Management

### `GET /api/v1/vehicles`
- **Auth Required:** Bearer Token
- **Response (200 OK):** Array of user registered vehicles (Bike/Car, plate numbers, brand, model).

### `POST /api/v1/vehicles`
- **Auth Required:** Bearer Token
- **Request Body:**
```json
{
  "type": "bike",
  "brand": "Royal Enfield",
  "model": "Classic 350",
  "registrationNumber": "MP09AB1234",
  "color": "Matte Black",
  "imageUrl": "https://..."
}
```

---

## 4. Services & Washerman Discovery

### `GET /api/v1/services?vehicleType=bike`
- **Description:** Returns services catalog (`Basic Wash`, `Foam Wash`, `Chain Cleaning`, `Detailing`).

### `GET /api/v1/vendors/nearby?lat=22.7533&lng=75.8937&radiusKm=5`
- **Description:** Returns available online washermen within proximity with live coordinates, ratings, and vehicle specialty.

---

## 5. Booking Workflow Lifecycle

### `POST /api/v1/bookings`
- **Request Body:**
```json
{
  "vehicleId": "veh_123",
  "serviceId": "srv_bike_foam",
  "addOnIds": ["addon_chain_lube"],
  "washermanId": "vdr_456",
  "addressId": "addr_789",
  "scheduleType": "instant",
  "scheduledTime": "2026-09-18T16:00:00Z",
  "instructions": "Vehicle parked in B1 basement, call before arrival"
}
```

### `GET /api/v1/bookings/:bookingId/tracking`
- **Description:** Polling/WebSocket stream returning washerman live GPS coords, route polyline, and arrival ETA.

---

## 6. Payments & Invoices

### `POST /api/v1/payments/create-order`
- **Request Body:**
```json
{
  "bookingId": "bk_99182",
  "paymentMethod": "upi",
  "amount": 196.00
}
```

### `GET /api/v1/invoices/:bookingId`
- **Description:** Returns itemized tax invoice data and signed PDF download URL.
