import React from "react";
import { ITask } from "../Interfaces";

import {
  Card,
  CardHeader,
  CardHeaderMain,
  CardActions,
  CardTitle,
  CardBody,
  Button,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";

import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardHeaderMain>
            <TextContent>
              <Text component={TextVariants.h1}>My ToDo</Text>
            </TextContent>
          </CardHeaderMain>
          <CardActions>
            <Button
              variant="link"
              icon={<CheckIcon />}
              onClick={() => {
                completeTask(task.taskName);
              }}
            >
              Completed
            </Button>
          </CardActions>
        </CardHeader>
        <CardTitle>{task.taskName}</CardTitle>
        <CardBody>{task.deadline}</CardBody>
      </Card>
    </div>
  );
};

export default TodoTask;
