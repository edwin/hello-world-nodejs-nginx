# React + Vite + Nginx Docker Application

This project is a React application built with Vite and configured to be deployed using Nginx in a Docker container. It provides a production-ready setup for containerized deployment of React applications.

## Technologies Used

- **React 19**: Modern JavaScript library for building user interfaces
- **Vite 7**: Next-generation frontend build tool
- **Nginx**: High-performance web server for serving static content
- **Docker**: Containerization platform for consistent deployment
- **Red Hat UBI 9**: Enterprise-grade base images for containers

## Project Structure

- `/src`: React application source code
- `Dockerfile`: Multi-stage build for optimized container images
- `nginx.conf`: Custom Nginx configuration for serving the React app
- `vite.config.js`: Vite build configuration

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
   docker build -t react-nginx-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 react-nginx-app
   ```

3. Access the application at http://localhost:8080

## Docker Image Details

- **Build Stage**: Uses Red Hat UBI 9 with Node.js 24 to build the React application
- **Runtime Stage**: Uses Red Hat UBI 9 with Nginx 1.24 to serve the built application
- The Nginx server is configured to handle client-side routing for the React application

## Additional Commands

- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the production build locally
