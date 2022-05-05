import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function Column(props: any) {
  return (
    <>
      <Draggable draggableId={props.column.id.toString()} index={props.index}>
        {(provided) => {
          return (
            <Box
              padding={5}
              bg="white"
              minW="300px"
              border="1px solid"
              borderColor="gray.200"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <Heading {...provided.dragHandleProps}>
                {props.column.title}
                <IconButton ml='5' size="sm" aria-label="delete" icon={<DeleteIcon />}>
                delete
              </IconButton>
              </Heading>

              <Droppable droppableId={props.column.id} type="task">
                {(provided, snapshot) => (
                  <Box
                    padding={3}
                    bg={snapshot.isDraggingOver ? "blue.50" : "white"}
                    minH="100px"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <InnerList tasks={props.tasks} />
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          );
        }}
      </Draggable>
    </>
  );
}

function InnerList(props: any) {
  return props.tasks.map((task: any, index: any) => {
    return <Task key={task.id} task={task} index={index} />;
  });
}
