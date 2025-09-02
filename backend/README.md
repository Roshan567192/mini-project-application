# Mini Project Manager Backend

A RESTful API for managing projects and tasks built with Node.js, Express.js, and MongoDB.

## Features

- **Authentication**: JWT-based authentication with user registration and login
- **Projects**: Complete CRUD operations for project management
- **Tasks**: Task management with status tracking and filtering
- **Security**: Password hashing, JWT tokens, and protected routes
- **Validation**: Input validation and comprehensive error handling

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: bcryptjs for password hashing

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Set `MONGODB_URI` to your MongoDB Atlas connection string (format: `mongodb+srv://username:password@cluster0.mongodb.net/mini-project-manager?retryWrites=true&w=majority`)
   - Update `JWT_SECRET` with a secure secret key
   - Adjust other settings as needed

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all user projects | Yes |
| GET | `/api/projects/:id` | Get project by ID | Yes |
| POST | `/api/projects` | Create new project | Yes |
| PUT | `/api/projects/:id` | Update project | Yes |
| DELETE | `/api/projects/:id` | Delete project | Yes |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | Yes |
| GET | `/api/tasks/:id` | Get task by ID | Yes |
| GET | `/api/tasks/project/:projectId` | Get tasks by project | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| PATCH | `/api/tasks/:id/status` | Update task status | Yes |

## Request Examples

### User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My New Project",
    "description": "This is a sample project",
    "status": "active"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete API documentation",
    "description": "Write comprehensive API docs",
    "project": "PROJECT_ID_HERE",
    "priority": "high",
    "dueDate": "2024-12-31T23:59:59.000Z"
  }'
```

## Data Models

### User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `timestamps` (createdAt, updatedAt)

### Project
- `title` (String, required, max 100 chars)
- `description` (String, required, max 500 chars)
- `owner` (ObjectId, references User)
- `status` (String, enum: active/completed/on-hold)
- `startDate` (Date, default: now)
- `endDate` (Date, optional)
- `timestamps` (createdAt, updatedAt)

### Task
- `title` (String, required, max 100 chars)
- `description` (String, optional, max 500 chars)
- `status` (String, enum: todo/in-progress/done)
- `priority` (String, enum: low/medium/high)
- `dueDate` (Date, optional)
- `project` (ObjectId, references Project)
- `owner` (ObjectId, references User)
- `timestamps` (createdAt, updatedAt)

## Query Parameters

### Projects
- `status` - Filter by project status
- `search` - Search in title and description
- `page` - Page number for pagination
- `limit` - Number of items per page

### Tasks
- `status` - Filter by task status
- `priority` - Filter by priority level
- `project` - Filter by project ID
- `search` - Search in title and description
- `page` - Page number for pagination
- `limit` - Number of items per page

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors array (when applicable)
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mini-project-manager` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

### Health Check

Check if the API is running:
```bash
curl http://localhost:5000/api/health
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a strong `JWT_SECRET`
3. Use MongoDB Atlas or a production MongoDB instance
4. Configure proper CORS settings
5. Set up proper logging and monitoring

## License

ISC