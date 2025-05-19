# js-node-react-next-nest-typescript-fortress

A full-stack monorepo fortress built with **Node.js**, **React**, **Next.js**, **NestJS**, and **TypeScript**. This project integrates a robust backend with Express and NestJS, a MongoDB database, and a dynamic frontend with React and Next.js, all unified with TypeScript for type safety and scalability.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Monorepo Architecture**: Manage multiple packages (backend, frontend, shared utilities) in a single repository.
- **Backend**: RESTful APIs with Express and NestJS, MongoDB integration, JWT authentication, and Swagger API documentation.
- **Frontend**: React with Redux Toolkit for state management, React Router for navigation, and Next.js for server-side rendering (optional).
- **Type Safety**: TypeScript across the stack for robust development.
- **Developer Tools**: ESLint, Prettier, Stylelint, and Mocha for code quality and testing.
- **Styling**: Tailwind CSS for rapid, utility-first styling.

## Tech Stack
- **Backend**: Node.js, Express, NestJS, MongoDB, Mongoose, JWT, Swagger
- **Frontend**: React, Next.js, Redux Toolkit, React Router, Tailwind CSS
- **Shared**: TypeScript, Vite (frontend build tool)
- **Dev Tools**: ESLint, Prettier, Stylelint, Mocha, ts-node

## Project Structure
```
js-node-react-next-nest-typescript-fortress/
├── node-demo/          # Node.js/Express server example
├── react/              # React frontend
├── typescript-demo/    # TypeScript demo scripts
├── tests/              # Mocha test files
├── styles/             # CSS styles (Tailwind output)
├── package.json        # Monorepo root configuration
└── README.md           # This file
```

*Note*: The monorepo may include additional packages (e.g., NestJS backend, shared utilities) as development progresses.

## Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)
- **Git**: For version control

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/js-node-react-next-nest-typescript-fortress.git
   cd js-node-react-next-nest-typescript-fortress
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory based on `.env.example` (if provided). Example:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/fortress
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the project**:
   - For Node.js server: `npm run dev:node`
   - For React frontend: `npm run dev:react`
   - For TypeScript demo: `npm run dev:ts`

## Scripts
| Command                | Description                                      |
|------------------------|--------------------------------------------------|
| `npm run dev:ts`       | Runs TypeScript demo (`typescript-demo/hello.ts`) |
| `npm run dev:node`     | Runs Node.js server with nodemon (`node-demo/server.js`) |
| `npm run dev:react`    | Starts React dev server with Vite                |
| `npm run build`        | Compiles TypeScript files                        |
| `npm run watch`        | Compiles TypeScript in watch mode                |
| `npm run lint`         | Lints `.ts`, `.tsx`, `.js`, `.jsx` files with ESLint |
| `npm run format`       | Formats code with Prettier                       |
| `npm run format:check` | Checks code formatting with Prettier             |
| `npm run lint:css`     | Lints CSS files with Stylelint                   |
| `npm run test`         | Runs Mocha tests (`tests/**/*.test.ts`)          |

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code adheres to ESLint and Prettier rules. Run `npm run lint` and `npm run format` before committing.

## License
This project is licensed under the [MIT License](LICENSE).