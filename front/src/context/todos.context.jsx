import * as React from "react";

const TodosContext = React.createContext();

const DEFAULT_TODOS = [];

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = React.useState(DEFAULT_TODOS);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  return React.useContext(TodosContext);
};
