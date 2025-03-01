import queryString from "query-string";
import { useGetTasksQuery } from "../../../../redux/api/taskApi";
import Header from "../../../../components/Header";
import TaskCard from "../../../../components/TaskCard";

type ListProps = {
  id: string | undefined;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const ListView = ({ id, setIsModalNewTaskOpen }: ListProps) => {
  const queryParams = queryString.stringify({
    current: 1,
    pageSize: 1000,
    projectId: id,
    populate: "createdBy,assignedUser",
    fields:
      "createdBy.name,createdBy.email,createdBy.avatar,assignedUser.name,assignedUser.email,assignedUser.avatar",
  });
  const { data: tasks, isLoading, isFetching } = useGetTasksQuery(queryParams);
  if (!setIsModalNewTaskOpen) {
    return;
  }
  if (isLoading || isFetching) return <p>Loading tasks...</p>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.data &&
          tasks?.data.results &&
          tasks?.data.results.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default ListView;
