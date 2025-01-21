
---

# GROUP20PLP  

**GROUP20PLP** is a full-stack project repository that includes an event management application (**EventHub**) as its core project. The repository is organized to facilitate seamless backend and frontend development and deployment.  

---

## Repository Structure (see inside eventmanagementapp folder for more details).         

```
GROUP20PLP/
├── eventmanagementapp/         # Main event management application
│   ├── backend/                # Backend code (Node.js/Express)
│   │   ├── package.json        # Backend dependencies
│   │   ├── src/                # Backend source code
│   │   ├── .env.example        # Example environment variables for backend
│   │   └── README.md           # Backend-specific documentation
│   ├── frontend/               # Frontend code (React.js)
│   │   ├── package.json        # Frontend dependencies
│   │   ├── src/                # Frontend source code
│   │   ├── .env.example        # Example environment variables for frontend
│   │   └── README.md           # Frontend-specific documentation
│   └── README.md               # Documentation for eventmanagementapp
├── .gitignore                  # Git ignore file for the entire repository
├── LICENSE                     # Project license
└── README.md                   # Main project documentation
```

---

## About EventHub  

**EventHub** is the core application within this repository. It is designed to:  
- Allow users to browse, search, and filter events.  
- Provide a seamless ticket booking and payment experience using M-Pesa.  
- Enable admins to manage events with role-based access control.  

For more details, refer to the `README.md` files in the **eventmanagementapp** directory and its subdirectories.  

---

## Prerequisites  

Ensure the following tools are installed on your system:  
- **Node.js**: Version 14 or higher.  
- **NPM**: Comes with Node.js.  
- **Git**: For version control.  
- **MySql**: Required for backend data storage.  
- **M-Pesa Developer Account**: To handle payment integrations.  

---

## Installation  

### 1. Clone the Repository  
```bash  
git clone https://github.com/PrudenceGikundi/Group20PLP/tree/backend  
cd GROUP20PLP  
```  

### 2. Install Dependencies  

Navigate to the backend and frontend folders separately to install dependencies:  

#### Backend:  
```bash  
cd eventmanagementapp/backend  
npm install  
```  

#### Frontend:  
```bash  
cd ../frontend  
npm install  
```  

### 3. Environment Configuration  

Set up the environment variables in `.env` files in both the backend and frontend directories using the respective `.env.example` templates.  

---

## Running the Project  

### 1. Start the Backend  
Navigate to the `backend` directory and run:  
```bash  
npm start  
```  
The backend server will be running on `http://localhost:5000`.  

### 2. Start the Frontend  
Navigate to the `frontend` directory and run:  
```bash  
npm start  
```  
The frontend will be accessible at `http://localhost:3000`.  

---

## Git Workflow  

- **Branching Strategy**:  
  - Use `main` for stable releases.  
  - Create feature branches for new features (e.g., `feature/authentication`).  
  - Create hotfix branches for urgent fixes (e.g., `hotfix/payment-bug`).  

- **Commit Messages**: Follow a conventional format:  
  - `feat: Add user authentication`  
  - `fix: Resolve payment API error`  

---

## Dependencies  

### Global Dependencies (Root)  
- **Node.js**: For running JavaScript code on the backend and frontend.  
- **Git**: For version control and collaboration.  

### Backend Dependencies  
- Express.js: Web framework.  
- Mongoose: MongoDB object modeling.  
- JWT: Authentication.  
- M-Pesa SDK: Payment integration.  

### Frontend Dependencies  
- React.js: Frontend library.  
- Axios: API requests.  
- TailwindCSS (optional): For styling.  

Refer to the `package.json` files in the backend and frontend folders for more details.  

---

## Project Management  

- **Team Collaboration**:  
  - Use GitHub Issues and Pull Requests for tracking tasks and progress.  
  - Assign tasks based on team roles (Backend/Frontend/Testing).  

- **Testing**:  
  - All APIs and frontend features have been tested with Postman and a live frontend connection.  

---

## Licensing  

This project is licensed under the [MIT License](LICENSE).  

--- 

For more details, refer to the README files inside the **eventmanagementapp** folder.  

Enjoy building and managing events with **GROUP20PLP**!