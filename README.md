# EMIS API States

Simplify API calls and data access via react hooks on top of redux and others.

## Installation

## Usage

```jsx
import { Store, useTodoApiState, useTodoDispatch } from "api-states";

// store provider
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// states
const {
  list: todos,
  page,
  total,
  filter,
  loading,
  posting,
  error,
  selected: todo
} = useTodoApiState({ page: 1, filter: {} });

// actions
const {
  get: getTodos,
  post: postTodo,
  patch: updateTodo,
  put: replaceTodo,
  del: deleteTodo
} = useTodoDispatch();
```
