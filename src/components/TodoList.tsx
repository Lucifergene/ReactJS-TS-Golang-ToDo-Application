import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Bullseye, Title, Button, EmptyState, EmptyStateIcon, EmptyStateBody, } from "@patternfly/react-core";
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";
import { ITask } from "../Interfaces";
import { AppContext } from "../App";
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';

const TodoList = () => {
  const { state, dispatch } = useContext(AppContext);

  const completeTask = (taskNameToDelete: string): void => {
    dispatch({ type: "DELETE_TASK", payload: taskNameToDelete });
  };
  const emptyListStyle = {
    margin: "15.3em 0 15.5em 0",
  };

  const columnNames = {
    name: 'Name',
    deadline: 'Deadline',
    completed: 'Complete Task'
  };


  return (
    <div>
      {state.todoList.length > 0 ? (
        <TableComposable>
          <Caption><Title headingLevel="h1"><Bullseye>My Pending ToDos</Bullseye></Title> </Caption>
          <Thead>
            <Tr>
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.deadline}</Th>
              <Th>{columnNames.completed}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.todoList.map((task: ITask, key: number) => (
              <Tr key={key}>
                <Td dataLabel={columnNames.name}>{task.taskName}</Td>
                <Td dataLabel={columnNames.deadline}>{task.deadline}</Td>
                <Td dataLabel={columnNames.completed}><Button
                  variant="link"
                  icon={<CheckIcon />}
                  onClick={() => {
                    completeTask(task.taskName);
                  }}
                >
                  Completed
                </Button></Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      ) : (
        <EmptyState style={emptyListStyle}>
          <EmptyStateIcon icon={CubesIcon} />
          <Title headingLevel="h4" size="lg">
            No Tasks
          </Title>
          <EmptyStateBody>
            Hurray !!!
          </EmptyStateBody>
          <br />
          <Link to="/">
            <Button variant="secondary">Click here to Add Tasks</Button>
          </Link>

        </EmptyState>
      )}
    </div>
  );
};

export default TodoList;
