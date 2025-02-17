import { useParams } from "react-router-dom";
import ProjectHeader from "./components/ProjectHeader";
import { useState } from "react";

const Project = () => {
  const { id } = useParams();
  console.log(id);
  const [activeTab, setActiveTab] = useState("Board");
  return (
    <>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && <div className="px-4 xl:px-6">Board View</div>}
      {activeTab === "List" && <div className="px-4 xl:px-6">List View</div>}
      {activeTab === "Timeline" && (
        <div className="px-4 xl:px-6">Timeline View</div>
      )}
      {activeTab === "Table" && <div className="px-4 xl:px-6">Table View</div>}
    </>
  );
};

export default Project;
