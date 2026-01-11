# Portfolio Website

A modern, full-stack portfolio website with admin panel for managing resumes and contact form submissions.

## Features

### Frontend
- ✅ Modern React UI with Framer Motion animations
- ✅ Dark/Light theme support
- ✅ Responsive design
- ✅ Interactive terminal component
- ✅ Project showcase
- ✅ Services section
- ✅ Contact form with validation
- ✅ Resume download functionality

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ File upload (resume management)
- ✅ Email notifications (nodemailer)
- ✅ Contact form submissions tracking

### Admin Panel
- ✅ Secure authentication
- ✅ Dashboard with statistics
- ✅ Resume management (upload, activate, delete)
- ✅ Download count tracking
- ✅ Contact form submissions management
- ✅ Mark messages as read/unread

## Tech Stack

### Frontend
- React 17
- Vite
- Tailwind CSS
- Framer Motion
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Multer (file uploads)
- Nodemailer (email)
- bcryptjs (password hashing)

## Installation

### Prerequisites
- Node.js (v12 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Sandip Portfolio"
```

2. **Install dependencies**

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Configure environment variables**

Create `.env` file in `server/` directory:

```env
PORT=5001
MONGO_URI=your-mongodb-connection-string
ADMIN_SECRET=your-admin-secret-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret-key
```

4. **Run the application**

```bash
# Terminal 1 - Run backend
cd server
node index.js

# Terminal 2 - Run frontend
cd client
npm run dev
```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Admin Panel**: http://localhost:5001/admin.html

## Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT**: Change these credentials in `.env` before deployment!

## API Endpoints

### Public Endpoints
```
GET    /api/projects              - Get all projects
GET    /api/projects/featured     - Get featured projects
GET    /api/resume/latest         - Get active resume info
GET    /api/resume/download       - Download active resume
POST   /api/contact/send          - Submit contact form
```

### Admin Endpoints (Protected)
```
POST   /api/admin/login           - Admin login
GET    /api/admin/verify          - Verify JWT token
GET    /api/admin/stats           - Dashboard statistics
GET    /api/admin/resumes         - List all resumes
POST   /api/admin/resumes/upload  - Upload new resume
PUT    /api/admin/resumes/:id/activate - Activate resume
DELETE /api/admin/resumes/:id     - Delete resume
GET    /api/admin/contacts        - List all contacts
PUT    /api/admin/contacts/:id/read - Mark as read
DELETE /api/admin/contacts/:id    - Delete contact
```

## Security Features

- JWT authentication for admin panel
- Password hashing with bcrypt
- Environment variables for sensitive data
- File upload validation (PDF only, 5MB limit)
- Input validation on forms
- CORS protection

## License

MIT

## Author

Sandip Chavda
