# Notion-like Task Manager with React

This project is a Notion-like task management application built with React and Vite. It provides a simple yet powerful interface for managing tasks and categories without requiring any backend server. All data is stored locally in the browser.

## Technologies Used

- **React 19**: Modern JavaScript library for building user interfaces
- **Vite 7**: Next-generation frontend build tool
- **LocalStorage API**: Browser-based data persistence
- **Nginx**: High-performance web server for serving static content
- **Docker**: Containerization platform for consistent deployment
- **Red Hat UBI 9**: Enterprise-grade base images for containers

## Features

- **Task Management**: Create, edit, complete, and delete tasks
- **Categories**: Organize tasks into different categories
- **Rich Task Details**: Add descriptions and due dates to tasks
- **Expandable UI**: Click on tasks to view additional details
- **Local Storage**: All data persists in your browser between sessions
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

- `/src`: React application source code
- `Dockerfile`: Multi-stage build for optimized container images
- `nginx.conf`: Custom Nginx configuration for serving the React app
- `vite.config.js`: Vite build configuration

## Usage Guide

### Managing Tasks

1. **Creating Tasks**:
   - Click the "+ New Task" button
   - Fill in the task details (title, description, due date, category)
   - Click "Create Task" to save

2. **Viewing Task Details**:
   - Click on a task title to expand and view its full details
   - Click again to collapse

3. **Editing Tasks**:
   - Click the "Edit" button on any task
   - Modify the task details in the form
   - Click "Save" to update or "Cancel" to discard changes

4. **Completing Tasks**:
   - Check the checkbox next to a task to mark it as complete
   - Completed tasks are visually distinguished with strikethrough text

5. **Deleting Tasks**:
   - Click the "Delete" button on any task to remove it

### Managing Categories

1. **Creating Categories**:
   - Click the "+ New Category" button
   - Enter a category name
   - Click "Create Category" to save

2. **Deleting Categories**:
   - Click the "×" button next to a category name
   - All tasks in that category will be moved to the "General" category

### Data Persistence

All your tasks and categories are automatically saved to your browser's local storage. This means:
- Your data persists between browser sessions
- No account or login required
- Data is private to your browser/device
- Clearing browser data will erase your tasks

## Development

To run the application in development mode:

```bash
npm install
npm run dev
```

This will start the Vite development server with hot module replacement (HMR).

## Building for Production

To build the application for production:

```bash
npm run build
```

This will generate optimized static files in the `dist` directory.

## Docker Deployment

The application is configured for containerized deployment using a multi-stage Docker build:

1. Build the Docker image:
   ```bash
   docker build -t notion-task-manager .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 notion-task-manager
   ```

3. Access the application at http://localhost:8080

## Docker Image Details

- **Build Stage**: Uses Red Hat UBI 9 with Node.js 24 to build the React application
- **Runtime Stage**: Uses Red Hat UBI 9 with Nginx 1.24 to serve the built application
- The Nginx server is configured to handle client-side routing for the React application

## Additional Commands

- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the production build locally
