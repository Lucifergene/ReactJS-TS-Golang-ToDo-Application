import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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

  const [taskname, setTaskname] = useState("");
  const [deadline, setDeadline] = useState(0);

  const addTask = (): void => {
    const newTask = {
      taskname: taskname,
      deadline: deadline,
    };
    dispatch({ type: "INSERT_TODO", payload: newTask });
    console.log(newTask);
  };

  const todoStyle = {
    margin: "9.5em 0 10em 0",
  };

  return (
    <div style={todoStyle}>
      <Grid>
        <GridItem span={3}></GridItem>
        <GridItem span={6}>
          <Form>
            <FormGroup label="Task" isRequired fieldId="task">
              <TextInput
                isRequired
                type="text"
                id="task"
                name="task"
                value={taskname}
                onChange={(value) => {
                  setTaskname(value);
                }}
              />
            </FormGroup>
            <FormGroup label="Deadline" isRequired fieldId="deadline">
              <TextInput
                isRequired
                type="number"
                id="deadline"
                name="deadline"
                value={deadline}
                onChange={(value) => {
                  setDeadline(Number(value));
                }}
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
                    setTaskname("");
                    setDeadline(0);
                  }}
                >
                  Cancel
                </Button>
              </ActionGroup>
            </Bullseye>
          </Form>
        </GridItem>
        <GridItem span={3}></GridItem>
        <br />
        <br />
        <Bullseye>
          <Link to="/todos">
            <Button variant="secondary">Pending Tasks</Button>
          </Link>
        </Bullseye>
      </Grid>
    </div>
  );
};

export default TodoForm;
