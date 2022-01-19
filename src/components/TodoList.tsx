import React, { useContext } from "react";
import TodoTask from "./TodoTask";
import { ITask } from "../Interfaces";
import { AppContext } from "../App";

const TodoList = () => {
  const { state, dispatch } = useContext(AppContext);
  const completeTask = (taskNameToDelete: string): void => {
    dispatch({ type: "DELETE_TASK", payload: taskNameToDelete });
  };
  return (
    <div>
      {state.todoList.map((task: ITask, key: number) => {
        return <TodoTask key={key} task={task} completeTask={completeTask} />;
      })}
    </div>
  );
};

export default TodoList;
