import { useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import BoardView from "./components/BoardView";
import { useParams } from "react-router-dom";
import ListView from "./components/ListView";

const Project = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <div className="px-4 xl:px-6">Timeline View</div>
      )}
      {activeTab === "Table" && <div className="px-4 xl:px-6">Table View</div>}
    </>
  );
};

export default Project;
