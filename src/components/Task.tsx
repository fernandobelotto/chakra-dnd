import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props: any) {
  return (
    <>
      <Draggable draggableId={props.task.id.toString()} index={props.index}>
        {(provided, snapshot) => (
          <Box
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            padding={3}
            marginBottom={2}
            display="flex"
            w="100%"
            justifyContent={"space-between"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            bg={snapshot.isDragging ? "blue.50" : "white"}
            aria-roledescription="Press space bar to lift the task"
          >
            {props.task.content}
            <IconButton size="sm" aria-label="delete" icon={<DeleteIcon />}>
              delete
            </IconButton>
          </Box>
        )}
      </Draggable>
    </>
  );
}
