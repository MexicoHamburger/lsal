import { useState } from "react";
import CardMotion from "@/components/CardMotion";
import { useNavigate } from "react-router";

type Props = {
    userid: string | undefined;
};

const dummyCard = {
    id: "dummy",
    thumbnailUrl: "/src/assets/empty.svg",
};

const dummyProjects = [
    {
        id: "project-1",
        thumbnailUrl: "/src/assets/apple.svg",
    },
    {
        id: "dummy-1",
        thumbnailUrl: "/src/assets/empty.svg",
    },
    {
        id: "dummy-2",
        thumbnailUrl: "/src/assets/empty.svg",
    },
];

export default function PersonalProjectSections({ userid }: Props) {
    const [projectList, setProjectList] = useState(dummyProjects);
    const [showLimitMsg, setShowLimitMsg] = useState(false);
    const navigate = useNavigate();

    const addProject = () => {
        if (projectList.length >= 8) {
            setShowLimitMsg(true);
            return;
        }
        const newProject = {
            id: `project-${Date.now()}`,
            thumbnailUrl: "/src/assets/empty.svg",
        };
        setProjectList((prev) => [...prev, newProject]);
        setShowLimitMsg(false);
    };

    const handleCardClick = (id: string) => {
        navigate(`/personal/${userid}/project/${id}`)
    }

    const displayList =
        projectList.length < 3
            ? [
                ...projectList,
                ...Array(3 - projectList.length)
                    .fill(dummyCard)
                    .map((card) => ({ ...card, id: Date.now() + Math.random() })),
            ]
            : projectList;

    return (
        <>
            <div className="flex items-center gap-2 pb-2">
                <button
                    type="button"
                    onClick={addProject}
                    className="text-blue-500 cursor-pointer hover:underline text-sm"
                >
                    + 프로젝트 추가
                </button>
                {showLimitMsg && (
                    <p className="text-red-500 px-4 text-sm">프로젝트는 최대 8개까지 가능합니다.</p>
                )}
            </div>
            <CardMotion cards={[...displayList].reverse()} onCardClick={handleCardClick} />
        </>
    );
} 