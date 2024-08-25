
# Nest Task Manager Playground

This repository is a task management service developed with NestJS, demonstrating a layered architecture for managing tasks.

## Features

- **Task Management:** Create, update, delete, and manage tasks efficiently.
- **Layered Architecture:** Separation of concerns across different layers (Application, Domain, Infrastructure, Interface).
- **NestJS Framework:** Built using the NestJS framework for a modular and testable architecture.
- **TypeScript Support:** Written entirely in TypeScript for type safety and modern JavaScript features.

## Architecture Overview

### Application Layer
- **Purpose:** Orchestrates application logic and coordinates tasks between the domain and infrastructure layers.
- **Components:** Services, which implement use cases like task creation, updating, and retrieval.

### Domain Layer
- **Purpose:** Encapsulates the core business logic and rules of the task management system.
- **Components:** Entities (e.g., `Task`), and domain services that enforce business rules.

### Infrastructure Layer
- **Purpose:** Handles communication with external systems like databases, APIs, and message brokers.
- **Components:** Repositories that abstract data persistence, and integrations with external services.

### Interface Layer
- **Purpose:** Manages incoming HTTP requests and outgoing responses, handling user interactions with the system.
- **Components:** Controllers that process requests and invoke the appropriate services.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

- **Development Mode:**
  ```bash
  npm run start
  ```
- **Watch Mode:**
  ```bash
  npm run start:dev
  ```
- **Production Mode:**
  ```bash
  npm run start:prod
  ```

### Testing

- **Unit Tests:**
  ```bash
  npm run test
  ```
- **End-to-End Tests:**
  ```bash
  npm run test:e2e
  ```
- **Test Coverage:**
  ```bash
  npm run test:cov
  ```

## Project Structure

- `src/` - Contains the main application code organized into layers.
- `test/` - Contains test files for unit and end-to-end testing.

## Technologies Used

- **NestJS** - A progressive Node.js framework.
- **TypeScript** - Static typing and modern JavaScript features.

## Contributing

Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.
