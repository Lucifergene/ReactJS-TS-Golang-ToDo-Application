import React, { FC, useState, createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/react-core/dist/styles/base.css";
import { Page } from "@patternfly/react-core";

import { ITask } from "./Interfaces";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

interface IContextProps {
  state: any;
  dispatch: ({ type, payload }: { type: string; payload?: any }) => void;
}
const AppContext = createContext({} as IContextProps);

const initialState = {
  task: "",
  deadline: 0,
  todoList: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_TASK":
      console.log(`Task: ${action.payload}`);
      return { ...state, task: action.payload };

    case "SET_DEADLINE":
      console.log(`Deadline: ${action.payload}`);
      return { ...state, deadline: action.payload };

    case "ADD_TASK":
      console.log(
        `ToDo: ${action.payload.taskName} | ${action.payload.deadline}`
      );
      return { ...state, todoList: [...state.todoList, action.payload] };

    case "DELETE_TASK":
      console.log(`Deleting: ${action.payload}`);
      const newList = state.todoList.filter(
        (task: ITask) => task.taskName !== action.payload
      );
      return { ...state, todoList: newList };

    case "CANCEL_TASK":
      console.log(`Clearing Form`);
      return { ...state, task: "", deadline: 0 };

    default:
      return state;
  }
};

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ state, dispatch }}>
          <Page
            header={<Header isNavOpen={isNavOpen} onNavToggle={onNavToggle} />}
            sidebar={<Sidebar isNavOpen={isNavOpen} />}
          >
            <div>
              <Routes>
                <Route path="/todos" element={<TodoList />} />
                <Route path="/" element={<TodoForm />} />
              </Routes>
            </div>
            <Footer />
          </Page>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
export { AppContext };
