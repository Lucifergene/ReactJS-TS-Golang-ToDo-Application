import React, { useContext } from "react";
import { AppContext } from "../App";
import {
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  Bullseye,
  Grid,
  GridItem,
} from "@patternfly/react-core";

const TodoForm = () => {
  const { state, dispatch } = useContext(AppContext);

  const handletask = (value: any): void => {
    dispatch({ type: "SET_TASK", payload: value });
    console.log(value);
  };

  const handledeadline = (value: any): void => {
    dispatch({ type: "SET_DEADLINE", payload: Number(value) });
    console.log(value);
  };

  const addTask = (): void => {
    const newTask = {
      taskName: state.task,
      deadline: state.deadline,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
    console.log(newTask);
  };

  const todoStyle = {
    margin: "9.5em 0 10em 0",
  };

  return (
    <div style={todoStyle}>
      <Grid>
        <GridItem span={3} rowSpan={4}></GridItem>
        <GridItem span={6} rowSpan={4}>
          <Form>
            <FormGroup label="Task" isRequired fieldId="task">
              <TextInput
                isRequired
                type="text"
                id="task"
                name="task"
                value={state.task}
                onChange={handletask}
              />
            </FormGroup>
            <FormGroup label="Deadline" isRequired fieldId="deadline">
              <TextInput
                isRequired
                type="number"
                id="deadline"
                name="deadline"
                value={state.deadline}
                onChange={handledeadline}
              />
            </FormGroup>
            <Bullseye>
              <ActionGroup>
                <Button variant="primary" onClick={addTask}>
                  Submit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch({ type: "CANCEL_TASK" });
                  }}
                >
                  Cancel
                </Button>
              </ActionGroup>
            </Bullseye>
          </Form>
        </GridItem>
        <GridItem span={3} rowSpan={4}></GridItem>
      </Grid>
    </div>
  );
};

export default TodoForm;
