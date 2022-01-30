import React, { FC, useState, createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@patternfly/patternfly/patternfly.css";
import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageSection } from "@patternfly/react-core";

import './App.scss'
import { ITask } from "./Interfaces";
import api from "./apis";


import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer/Footer";
interface IContextProps {
  state: any;
  dispatch: ({ type, payload }: { type: string; payload?: any }) => void;
}
const AppContext = createContext({} as IContextProps);

const initialState = {
  todoList: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {

    case "INSERT_TODO":
      console.log(
        `ToDo: ${action.payload.taskname} | ${action.payload.deadline}`
      );
      api.insertTodo(action.payload).then(res => {
        window.alert(`ToDo inserted successfully`);
        console.log("Inserted Record: ", res);
      });
      return {...state};

    case "GET_TODOS":
      console.log("Getting all ToDos: ", action.payload);
      return { ...state, todoList: action.payload };

      // api.getAllTodos().then(todos => {
      //   console.log("All ToDos: ", todos.data);
      //   return { ...state, todoList: todos.data};
      // });
      // return { ...state };

    case "DELETE_TASK":
      console.log(`Deleting: ${action.payload}`);
      api.deleteTodoById(action.payload)

      const newList = state.todoList.filter(
        (task: ITask) => task.id !== action.payload
      );
      return { ...state, todoList: newList };

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
            className="block"
            header={<Header isNavOpen={isNavOpen} onNavToggle={onNavToggle} />}
            sidebar={<Sidebar isNavOpen={isNavOpen} />}
          >
            <PageSection sticky="bottom">
              <div>
                <Routes>
                  <Route path="/todos" element={<TodoList />} />
                  <Route path="/" element={<TodoForm />} />
                </Routes>
              </div>
              <Footer />
            </PageSection>
          </Page>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
export { AppContext };
