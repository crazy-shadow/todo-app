# To-do app

## Available Scripts
Developed in node v18.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Code Review Questions

### `State Management`

Why did you choose the specific state management approach? How would you scale it for a larger application?

I chose Redux as the state management solution because it provides a centralized store and predictable state updates, making it easier to manage complex state logic in a scalable way. Redux is well-suited for applications like a To-Do app where multiple components share and update the same state, such as tasks and filters. Redux’s use of actions and reducers also allows for clear, testable state transitions.

To scale this approach for a larger application, I would break down the state into feature-based slices, each handling specific domains of the application (e.g., tasks, users, settings). Redux's middleware support, such as redux-thunk or redux-saga, could be introduced for handling asynchronous actions and side effects efficiently. Furthermore, as the application grows, I would consider lazy-loading state slices to improve performance and reduce the initial bundle size, only loading the parts of the store that are needed for the active views.

### `Performance Optimization`

What techniques did you use to optimize the performance of the application? How do they work?

I implemented several performance optimization techniques in the application:

Virtualization: Using libraries like react-window to render only the visible tasks on the screen. Virtualization minimizes DOM nodes by rendering just the items within the viewport, enhancing performance, especially when dealing with large task lists.

Memoization with React.memo: For components like TaskItem, which are repeatedly rendered in a list, I used React.memo to avoid unnecessary re-renders. This ensures that the component only re-renders when its props change, thus reducing rendering overhead.

Debouncing Search Input: For the search functionality, debouncing user input delays updates to the search query state until the user stops typing, preventing excessive renders and enhancing responsiveness.

Selective State Management: By keeping task-related state (tasks, filters) in Redux and UI state (search query) in component-local state, I reduced the number of components that depend on global state changes, minimizing unnecessary re-renders.

These optimizations work by reducing the number of DOM updates, managing asynchronous tasks efficiently, and minimizing unnecessary component re-renders, all of which contribute to a smoother user experience.

### `Testing Strategy`

How do you decide which parts of the application need to be unit tested? What are your guidelines?

For this application, I prioritized testing core functionality and user interactions that are critical for the user experience:

Core Components: I unit tested components that encapsulate key features, such as TaskItem, TaskList, and AddTaskForm. These components directly manage user interactions for adding, editing, and displaying tasks, making them essential to test for proper functionality.

State Changes: I wrote tests for Redux reducers and actions to verify that state changes, such as adding, editing, and deleting tasks, occur as expected. Since these are core functionalities, unit tests ensure they work correctly in isolation.

Filter and Search: I added tests to verify that filtering tasks by status and searching tasks by title work as intended. These features are critical for usability, so it’s important to ensure they are robust.

Snapshot Testing: I included snapshot tests for static components to ensure the UI remains consistent after changes. This is useful for catching unexpected UI changes after refactoring or updates.

Guidelines: My guideline is to prioritize tests that validate critical features, core logic, and user interactions that impact the main workflows. For scalability, I avoid testing implementation details and instead focus on testing inputs and outputs, making tests resilient to refactors.

### `Code Structure`

Explain how you organized your project structure and why.

I organized the project with a feature-based structure to keep related components, state, and utilities close together. This approach makes it easier to scale, maintain, and reason about the application as it grows. Here’s a breakdown:

src/components: Contains reusable, self-contained UI components, such as SearchBar, TaskList, and TaskItem. Each component is responsible for its own rendering and behavior, making them modular and easy to test.

src/store: Holds Redux slices for state management, allowing global state to be accessed and modified predictably across the app. This is where the tasksSlice resides, handling task-related actions and state.

src/tests: Contains unit tests organized to match the component structure. This allows for easy navigation between components and their tests.

src/App.tsx: Serves as the main entry point, where the layout and key components, like AddTaskForm, TaskList, and SearchBar, are assembled.

This structure supports modularity, as each feature is contained and easy to extend. Components are kept reusable, the store is centralized, and tests are collocated for easy maintenance and scalability. This approach aligns well with best practices for React applications and allows the project to adapt to future requirements with minimal restructuring.
