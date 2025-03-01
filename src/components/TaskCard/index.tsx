import { ITask } from "../../types/backend";

type Props = {
  task: ITask;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          {/* <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              // <img
              //   src={`/${task.attachments[0].fileURL}`}
              //   alt={task.attachments[0].fileName}
              //   width={400}
              //   height={200}
              //   className="rounded-md"
              // />
            )}
          </div> */}
        </div>
      )}
      <p>
        <strong>ID:</strong> {task._id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No Description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? task.startDate : "Not Set"}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate ? task.dueDate : "Not Set"}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {task.createdBy ? task.createdBy.name : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignedUser ? task.assignedUser.name : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;
