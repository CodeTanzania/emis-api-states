# EMIS API States

[![Build Status](https://travis-ci.org/CodeTanzania/emis-api-states.svg?branch=develop)](https://travis-ci.org/CodeTanzania/emis-api-states)

Simplify API calls and data access via react hooks on top of redux and others.

## Installation

## Usage

```jsx
import { Store, useTodoApiState, useTodoDispatch } from 'emis-api-states';

// store provider
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
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
  selected: todo,
} = useTodoApiState({ page: 1, filter: {} });

// actions
const {
  get: getTodos,
  post: postTodo,
  patch: updateTodo,
  put: replaceTodo,
  del: deleteTodo,
} = useTodoDispatch();
```

### LICENSE

MIT License

Copyright (c) 2018 Code Tanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
