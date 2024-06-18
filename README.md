# Medium Clone

This repository contains a Medium clone application built with a Node.js backend and a React frontend.

## Project Structure

The project is divided into two main parts:

- `Backend`: Contains the server-side code
- `Frontend`: Contains the client-side code
- `Common`: Contains shared configurations or utilities (if any)

### Backend

The backend is responsible for handling the API and database interactions. It uses:

- **Node.js**: JavaScript runtime for building the server.
- **Prisma**: ORM for database management.
- **Wrangler**: Configuration for deploying to Cloudflare Workers.

#### Directory Structure

- `.wrangler`: Configuration for Cloudflare Workers.
- `node_modules`: Dependencies for the backend.
- `prisma`: Prisma schema and migrations.
- `src`: Source code for the backend.
- `.env`: Environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `package-lock.json`: Lockfile for backend dependencies.
- `package.json`: Lists backend dependencies and scripts.
- `README.md`: Documentation for the backend.
- `tsconfig.json`: TypeScript configuration.
- `wrangler.toml`: Configuration file for Wrangler.

### Frontend

The frontend is a React application that interacts with the backend API to display and manage Medium-like articles.

#### Directory Structure

- `node_modules`: Dependencies for the frontend.
- `public`: Public assets like HTML and images.
- `src`: Source code for the frontend.
- `.eslintrc.cjs`: ESLint configuration.
- `.gitignore`: Specifies files to be ignored by Git.
- `index.html`: Main HTML file.
- `package-lock.json`: Lockfile for frontend dependencies.
- `package.json`: Lists frontend dependencies and scripts.
- `postcss.config.js`: PostCSS configuration for Tailwind CSS.
- `README.md`: Documentation for the frontend.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `tsconfig.json`: TypeScript configuration.
- `tsconfig.node.json`: TypeScript configuration for Node.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (for database if using Prisma locally)

### Installation

#### Backend

1. Navigate to the `Backend` directory:

   ```sh
   cd Backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:

   ```sh
   cp .env.example .env
   ```

4. Initialize the database (using Prisma):

   ```sh
   npx prisma migrate dev
   ```

5. Start the backend server:

   ```sh
   npm start
   ```

#### Frontend

1. Navigate to the `Frontend` directory:

   ```sh
   cd Frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

## Usage

After starting both the backend and frontend servers, you can open your browser and navigate to `http://localhost:3000` to see the application in action.


## Interesting Problems Tackled in the Project

### 1. **Using Connection Pool**
   - As Cloudflare Workers are serverless and can be initialized based on requests from any part of the world, each new worker needs to connect to the database.
   - To handle the limited number of database connections, we use PRISMA Accelerate for connection pooling. This creates a pool to which all workers connect, and the pool then connects to the database.

### 2. **Using Hono for Routing**
   - Cloudflare Workers do not support Node.js APIs, so we cannot use Express in our application.
   - Instead, we use Hono, a library that simplifies routing in a worker environment. Although routing can be done without Hono, it becomes too complicated for larger applications.

### 3. **Responsive Design**
   - Implemented a responsive design using Tailwind CSS's `sm`, `md`, `lg` breakpoints to ensure a seamless experience across different devices and screen sizes.

### 4. **Text, Markdown, HTML**
   - The project does not contain advanced logic for styling blog posts but uses a combination of keyboard events, Markdown, and HTML.
   - Keyboard events detect when the Enter key is pressed, creating new paragraphs as divs. Each div returns a paragraph of the blog post, adding a `\n` at the end when saved to the database.
   - Heading tags are represented with Markdown syntax (e.g., `##` for h2, `###` for h3). When reading a blog, the Markdown text is converted to HTML using the `Marked()` function and other preprocessing, enabling custom styling and scroll snapping logic.

### 5. **Pagination While Loading Blogs**
   - Blogs are loaded in small batches (similar to Instagram) rather than all at once.
   - Based on scroll events (e.g., when the user scrolls to the bottom of the page), new batches of posts are loaded.
   - Implemented logic to determine when all blogs are loaded and to update loading parameters when reaching the maximum scroll.

### 6. **Using Skeletons**
   - Utilized skeleton screens to improve user experience while content is loading on the DOM.

### 7. **State Management**
   - Used Recoil and Recoil Persist for efficient state management.
