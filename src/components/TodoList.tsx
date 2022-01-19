import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Bullseye, Title, Button } from "@patternfly/react-core";
import TodoTask from "./TodoTask";
import { ITask } from "../Interfaces";
import { AppContext } from "../App";

const TodoList = () => {
  const { state, dispatch } = useContext(AppContext);
  const completeTask = (taskNameToDelete: string): void => {
    dispatch({ type: "DELETE_TASK", payload: taskNameToDelete });
  };
  const emptyListStyle = {
    margin: "15.3em 0 15.5em 0",
  };
  return (
    <div>
      {state.todoList.length > 0 ? (
        <div>
          {state.todoList.map((task: ITask, key: number) => {
            return (
              <TodoTask key={key} task={task} completeTask={completeTask} />
            );
          })}
        </div>
      ) : (
        <div style={emptyListStyle}>
          <Bullseye>
            <Title headingLevel="h2" size="3xl">
              No Tasks <br /> Hurray !!!
            </Title>
          </Bullseye>
          <br />
          <Bullseye>
            <Link to="/">
              <Button variant="secondary">Click here to Add Tasks</Button>
            </Link>
          </Bullseye>
        </div>
      )}
    </div>
  );
};

export default TodoList;
