# GreenTrade - Mini Supplier-Product Management System
A production-ready MERN stack application for managing suppliers and eco-friendly products.
## 🚀 Features
- **Dashboard**: Real-time analytics with interactive charts (Products by Category, Certification Status).
- **Supplier Management**: Add, view, and search suppliers.
- **Product Management**: CRUD operations for products with image placeholders, categorization, and certification tracking.
- **Advanced Filtering**: Filter products by category and certification status.
- **Global Search**: Search functionality for products and suppliers.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop using a premium aesthetic.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Chart.js, React Hook Form, Axios, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Validation**: Joi (Backend).
- **State Management**: React Hooks (useState, useEffect).

## 📦 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd greentrade
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create .env file
   cp .env.example .env
   # Seed database
   node seed.js
   # Start server
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 📡 API Endpoints

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create a new supplier
- `GET /api/suppliers/:id` - Get supplier details (with products)

### Products
- `GET /api/products` - Get all products (supports `search`, `category`, `certification_status` query params)
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Analytics
- `GET /api/analytics/summary` - Get dashboard stats

## 🎨 Design Decisions
- **Monorepo Structure**: Kept frontend and backend in a single repository for easier development and deployment.
- **Component-Based Architecture**: Reusable `Input`, `Select`, `Modal`, and `Card` components.
- **Tailwind CSS**: Used for rapid, consistent, and responsive styling with a custom emerald color palette.
- **Chart.js**: chosen for its flexibility and ease of use in visualizing data.

## 📸 Screenshots
*(Placeholders for screenshots)*
- [Dashboard View]
- [Product List with Filters]
- [Add Supplier Modal]

## 🌐 Live Demo
- Frontend: [Vercel Link]
- Backend: [Render Link]
# Elan-greentrade
