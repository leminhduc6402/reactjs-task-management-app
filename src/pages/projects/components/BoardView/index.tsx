import queryString from "query-string";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "../../../../redux/api/taskApi";
import TaskColumn from "../TaskColumn";

type BoardProps = {
  id: string | undefined;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const taskStatus = [
  "To do",
  "Work In Progress",
  "Under Review",
  "Completed",
  "Block",
];
const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const queryParams = queryString.stringify({
    current: 1,
    pageSize: 1000,
    projectId: id,
    populate: "createdBy,assignedUser",
    fields:
      "createdBy.name,createdBy.email,createdBy.avatar,assignedUser.name,assignedUser.email,assignedUser.avatar",
  });
  const { data: tasks, isLoading, isFetching } = useGetTasksQuery(queryParams);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const moveTask = (taskId: string, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading || isFetching) return <p>Loading tasks...</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            moveTask={moveTask}
            tasks={tasks?.data?.results || []}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BoardView;
