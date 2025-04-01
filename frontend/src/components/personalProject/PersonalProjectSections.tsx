import { useState } from "react";
import CardMotion from "@/components/CardMotion";

const dummyCard = {
    id : "dummy",
    thumbnailUrl : "/src/assets/empty.svg",
};

const dummyProjects = [
    {
        id:"project-1",
        thumbnailUrl: "/src/assets/apple.svg",
    },
];
export default function PersonalProjectSections() {
    const [projectList, setProjectList] = useState(dummyProjects);

    const addProject = () => {
      const newProject = {
        id: `project-${Date.now()}`,
        thumbnailUrl: "/src/assets/empty.svg",
      };
      setProjectList((prev) => [...prev, newProject]);
    };

    const displayCards = [...projectList].slice(0, 3);
    while (displayCards.length < 3) {
      displayCards.push({ ...dummyCard, id: `dummy-${displayCards.length}` });
    }

    return (
        <>
            <button
                type="button"
                onClick={addProject}
                className="text-blue-500 cursor-pointer hover:underline text-sm pb-2"
            >
                + 프로젝트 추가
            </button>
            <CardMotion cards = {[...displayCards].reverse()} />
        </>
    );
}