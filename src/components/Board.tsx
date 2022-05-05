import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { initialData } from "../data/intial-data";
import Column from "./Column";

export default function Board() {
  const [state, setState] = useState(initialData);

  const onDragStart = (start: any, provided: any) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
  };

  const onDragUpdate = (update: any, provided: any) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  const onDragEnd = (result: any, provided: any) => {
    const message = result.destination
      ? `You have moved the task from position
            ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
            ${result.source.index + 1}`;

    provided.announce(message);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newHome.id]: newHome,
        },
      };

      setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setState(newState);
  };

  const addColumn = () => {
    const id = Math.random().toString();
    const column = {
      id,
      title: "New column",
      taskIds: [],
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [id]: column,
      },
      columnOrder: [...state.columnOrder, id],
    };
    setState(newState);
  };

  const addTask = (columnId: any) => {
    columnId = "column-1";

    let newTaskId = Math.random().toString();

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          taskIds: [...state.columns[columnId].taskIds, newTaskId],
        },
      },
      tasks: {
        ...state.tasks,
        [newTaskId]: {
          id: newTaskId,
          content: "New task",
        },
      },
    };
    setState(newState);
  };

  return (
    <>
      <Box>
        <HStack spacing={5} mb='5'>

        <Button size="sm" onClick={addColumn}>
          Add Column
        </Button>
        <Button size="sm" onClick={addTask}>
          Add Task
        </Button>
        </HStack>


        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <Flex
                p={5}
                bg={"blue.100"}
                w="100vw"
                overflow="scroll"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.columnOrder.map((columnId: any, index: any) => {
                  const column: any = state.columns[columnId];
                  return (
                    <InnerList
                      key={column.id}
                      column={column}
                      taskMap={state.tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
}

function InnerList(props: any) {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map((taskId: any) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
}
