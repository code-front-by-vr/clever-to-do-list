# Clever To-Do List

🚀 **Live Demo**: [https://clever-to-do-list.vercel.app/](https://clever-to-do-list.vercel.app/)

## Task

📋 **Task Description**: [View on Google Drive](https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view)

## How to run the app

### Prerequisites:

- [Node.js](https://nodejs.org/) >=20.19.0 or >=22.12.0

### Setup and Development Flow:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file in the root directory and specify Firebase environment variables:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Prepare [Husky](https://typicode.github.io/husky/) for git hooks:

   ```bash
   npm run prepare
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build the application:

   ```bash
   npm run build
   ```

6. Preview the built application locally using Vite:
   ```bash
   npm run preview
   ```

## Database snapshot

The application uses **Firebase Firestore** for data storage with the following structure:

### Collections:

```
users/{userId}/tasks/{taskId}
```

### Database Features:

- **User Authentication**: Firebase Authentication with email/password
- **Real-time Data**: Firestore provides real-time synchronization
- **Query Optimization**: Tasks are queried by date ranges for calendar view
- **Security**: Data is scoped to authenticated users only
- **Date Handling**: Automatic conversion between JavaScript Date and Firebase Timestamp

## Application stack

### Core Technologies:

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vue Router](https://router.vuejs.org/)** - Official router for Vue.js
- **[Vuex](https://vuex.vuejs.org/)** - State management pattern and library
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service platform
  - **Firestore** - NoSQL document database
  - **Authentication** - User authentication service

### UI & Icons:

- **[Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next)** - Beautiful & consistent icon toolkit
- **[Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)** - Efficient virtual scrolling for large lists

### Code Quality and Development Tools:

- **[ESLint](https://eslint.org/)** - JavaScript linting utility
- **[Prettier](https://prettier.io/)** - Code formatter
- **[Husky](https://typicode.github.io/husky/)** - Git hooks made easy
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files
- **[Vue DevTools](https://devtools.vuejs.org/)** - Browser extension for Vue.js debugging

### Commands

| Command                | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                            |
| `npm run dev`          | Starts local dev server                                          |
| `npm run build`        | Builds the project                                               |
| `npm run preview`      | Starts local server to serve `dist` folder on the specified port |
| `npm run lint`         | Runs JavaScript and Vue linting using ESLint                     |
| `npm run lint:check`   | Checks for linting errors without fixing                         |
| `npm run format`       | Formats the codebase using Prettier                              |
| `npm run format:check` | Checks if code is formatted correctly                            |
| `npm run prepare`      | Prepares Husky git hooks                                         |

## Project Structure

```
src/
├── api/                     # Firebase API configuration and methods
├── assets/                  # Static assets (CSS, fonts, images)
├── components/              # Vue components organized by feature
│   ├── calendar/           # Calendar-related components
│   ├── shared/             # Reusable shared components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   └── task/               # Task-specific components
├── config/                 # Application configuration
├── lib/                    # Utility libraries and adapters
│   ├── adapters/           # Data transformation adapters
│   └── utils/              # Utility functions
├── plugins/                # Vue plugins and extensions
│   └── toast/              # Toast notification system
├── router/                 # Vue Router configuration
├── services/               # Business logic and API services
├── store/                  # Vuex state management
│   └── modules/            # State modules
├── views/                  # Page components (routes)
├── App.vue                 # Root Vue component
└── main.js                 # Application entry point
```

### Architecture Highlights:

- **Component-based**: Modular Vue components with clear separation of concerns
- **State Management**: Centralized state with Vuex for tasks and authentication
- **Service Layer**: Dedicated services for API interactions and business logic
- **Utility Layer**: Reusable utilities for common operations
- **Configuration**: Environment-based configuration for different deployment stages
