
## Architecture and API Design Approach

Turborepo is used to manage the frontend and backend(not included as part of this assignment).It will allow for easy scaling and adding of new features.

### Frontend Architecture
-The frontend is built using React with TypeScript,. Key architectural decisions include:
-1. Component-Based Structure: The UI is divided into reusable components (e.g., SortableCard, ImageOverlay) for maintainability and reusability.
-2. State Management: React's built-in hooks (useState, useEffect,useRef) are used for local state management. Additionally custom hook created (useData) to manage the documents state.
-3. Drag-and-Drop Functionality: Implemented using the @dnd-kit library for a smooth user experience.
-4. Styling: Tailwind CSS is used for rapid UI development and consistent styling.
-5. shadcn/ui components are used for the dashboard page.
-6. Vite for development and build optimizations.

### Setup

```sh
docker compose up --build
docker compose up --d
```

### Running the app

```sh
npx turbo dev
```