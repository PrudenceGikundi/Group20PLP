
---

# EventHub - Frontend  

**EventHub** is a modern, dynamic event management platform that provides a seamless way for users to explore, book, and pay for events. The frontend is built with **React.js**, offering a user-friendly and responsive interface. This document provides a comprehensive guide for setting up, running, and contributing to the frontend of EventHub.  

---

## Features  

### User Features  
- **Authentication**:  
  - Secure and intuitive Sign-Up and Login system.  

- **Event Discovery**:  
  - Browse a wide range of events with comprehensive details such as title, description, date, time, venue, category, and ticket prices.  

- **Search and Filter**:  
  - Search events by keywords.  
  - Filter by categories (e.g., Music, Sports, Education) and times of the day (Morning, Afternoon, Evening).  

- **Event Booking**:  
  - Select and book tickets for events.  
  - Integrated **M-Pesa payment gateway** ensures safe and instant payments.  

### Admin Features  
- **Event Management**:  
  - Admins can manage event data using backend APIs.  

---

## Prerequisites  

Ensure the following are installed on your system before proceeding:  
- **Node.js**: Version 14 or higher.  
- **NPM**: Comes with Node.js or use **Yarn** as an alternative.  
- **Backend Server**: Running at `http://localhost:5000/api` to serve event data and process payments.  

---

## Installation  

Follow these steps to set up the frontend project on your local machine:  

### 1. Clone the Repository  
Clone the repository to your local machine and navigate to the project directory:  
```bash  
git clone https://github.com/PrudenceGikundi/Group20PLP/tree/backend/eventmanagementapp/Frontend
cd eventhub-frontend  
```  

### 2. Install Dependencies  
Install all required dependencies using npm or yarn:  
```bash  
npm install  
```  

### 3. Configure Environment Variables  
Create a `.env` file in the project root directory and add the following:  
```env  
REACT_APP_API_BASE_URL=http://localhost:5000/api  
```  

### 4. Run the Development Server  
Start the development server to launch the application in your browser:  
```bash  
npm start  
```  

The application will be accessible at `http://localhost:3000`.  

---

## Project Structure  

Here is an overview of the project directory structure:  

## Project Structure  

```
src/
├── components/
│   ├── layouts/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
├── interface/
│   └── Event.ts (TypeScript interface for event data)
├── pages/
│   └── index.tsx (Main home page)
├── styles/
│   └── global.css (Global CSS styles)
```

---
## How It Works  

### Frontend Functionality  

#### **Event Listings**  
- Events are fetched from the backend and displayed as cards on the home page.  
- Each card shows event details, including name, date, price, and category.  

#### **Search and Filters**  
- Users can search for events by keywords.  
- Filter options allow sorting events by time slots or categories like Music, Education, and Sports.  

#### **Event Booking and Payment**  
- Upon selecting an event, users can view detailed information and proceed to booking.  
- Payment is processed using the **M-Pesa STK push**, ensuring secure transactions.  
- Users receive real-time feedback on payment success or failure.  

---

## API Integration  

The frontend communicates with the backend using RESTful APIs. Below are key API endpoints:  

### **Get All Events**  
**Endpoint**: `/api/events`  
**Method**: `GET`  
**Response**:  
```json  
[
  {
    "id": 1,
    "title": "Music Festival",
    "description": "A grand celebration of music.",
    "date": "2025-01-31",
    "time": "18:00",
    "venue": "Nairobi Arena",
    "category": "Music",
    "price": 500,
    "imageUrl": "https://example.com/image.jpg"
  }
]
```  

### **Process Payment**  
**Endpoint**: `/api/payments/process`  
**Method**: `POST`  
**Request Body**:  
```json  
{
  "phone": "0712345678",
  "amount": 500
}
```  

### **Authenticate User**  
**Login Endpoint**: `/api/auth/login`  
**Register Endpoint**: `/api/auth/register`  

---

## Testing  

The system has been tested using **Postman** and **React Developer Tools** to ensure smooth functionality across all APIs and components.  

### Sample Postman Requests  

#### **Login User**  
**URL**: `http://localhost:5000/api/auth/login`  
**Method**: `POST`  
**Body (JSON)**:  
```json  
{
  "email": "user@example.com",
  "password": "securepassword"
}
```  

#### **Fetch Events**  
**URL**: `http://localhost:5000/api/events`  
**Method**: `GET`  

---

## Future Enhancements  

Here are some potential upgrades for the platform:  
- **Profile Management**: Allow users to update profiles and view booking history.  
- **Advanced Notifications**: Email and SMS notifications for event updates and reminders.  
- **Multi-language Support**: Enable support for various languages.  
- **Improved Analytics**: Include dashboards for admins to analyze event performance and revenue.  

---

## Contributing  

We welcome contributions from the community. To contribute:  
1. Fork the repository.  
2. Create a new branch for your feature or bug fix.  
3. Submit a pull request with a detailed description of the changes.  

---

## License  

This project is licensed under the [MIT License](LICENSE).  

---

**EventHub** – Making event discovery and booking effortless!  
