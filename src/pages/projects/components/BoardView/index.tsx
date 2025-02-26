import queryString from "query-string";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hook";
import { callFetchTask } from "../../../../config/api";
import { ITask } from "../../../../types/backend";

type BoardProps = {
  id: string;
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
  const [tasks, setTask] = useState<ITask[] | null>(null);
  // const user = useAppSelector((state) => state.account.user);
  const queryParams = queryString.stringify({
    current: 1,
    pageSize: 1000,
    projectId: id,
    populate: "createdBy",
    fields: "createdBy.name,createdBy.email,createdBy.avatar",
  });

  const fetchTask = async () => {
    if (id) {
      const res = await callFetchTask(queryParams);
      if (res && res.data) {
        setTask(res.data.results || []);
      }
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

  return <div>BoardView</div>;
};

export default BoardView;
