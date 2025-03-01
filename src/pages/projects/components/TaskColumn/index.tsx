import { useDrag, useDrop } from "react-dnd";
import { ITask } from "../../../../types/backend";
import { EllipsisVertical, MessageSquareMore, PlusIcon } from "lucide-react";

type TaskColumnProps = {
  status: string;
  tasks: ITask[];
  moveTask: (taskId: string, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks = [],
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const taskCount = tasks.filter((task) => task.status === status).length;
  const statusColor: any = {
    "To do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
    Block: "#000000",
  };
  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${
        isOver ? "bg-blue-100 dark:bg-neutral-950" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        ></div>
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-gray-700">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-slate-600 dark:text-white"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {taskCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-slate-600 dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task._id} task={task} />
        ))}
    </div>
  );
};

export default TaskColumn;

type TaskProps = {
  task: ITask;
};
const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },

    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  // const numberOfComment = (task.comments && task.comments.length) || 0;
  const PriorityTag = ({ priority }: { priority: ITask["priority"] }) => {
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          priority === "CRITICAL"
            ? "bg-red-200 text-red-700"
            : priority === "HIGH"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "MEDIUM"
            ? "bg-green-200 text-green-700"
            : priority === "LOW"
            ? "bg-blue-200 text-blue-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </div>
    );
  };
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* {task.attachments && task.attachments.length > 0 && (
        <img
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )} */}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-600 dark:text-neutral-400">
          {task.startDate && <span>{task.startDate} - </span>}
          {task.dueDate && <span>{task.dueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark"></div>

        {/* Users */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px]">
            {task.createdBy && (
              <img
                key={task.assignedUser._id}
                src={`http://localhost:8080/images/${task.assignedUser?.avatar}`}
                alt={task.assignedUser.name}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.createdBy && (
              <img
                key={task.createdBy._id}
                src={`http://localhost:8080/images/${task.createdBy?.avatar}`}
                alt={task.createdBy.name}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>

          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={26} />
            {/* <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComment}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
