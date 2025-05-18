import Layout from "@/components/Layout";
import { useParams } from "react-router";
import { useState } from "react";

function ProjectEditPage() {
    const { projectid } = useParams();

    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Layout>
            <div className="flex justify-center px-12 py-12">
                <div className="w-full max-w-screen-lg space-y-6">
                    <h1 className="text-white-bold text-3xl">
                        프로젝트 수정: <span className="text-blue-400">{projectid}</span>
                    </h1>
                    <div className="space-y-2">
                        <label className="text-white-bold block">프로젝트 제목</label>
                        <input
                            type="text"
                            className="card-gray text-white border-gray focus-blue w-full px-4 py-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="개인 프로젝트 - Automatic Coin Trader"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white-bold block">썸네일 이미지 URL</label>
                        <input
                            type="text"
                            className="card-gray text-white border-gray focus-blue w-full px-4 py-3"
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                            placeholder="예: https://blahblah.net/abcd/123"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white-bold block">프로젝트 설명</label>
                        <textarea
                            rows={8}
                            className="card-gray text-white border-gray focus-blue w-full px-4 py-3 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="이 프로젝트에 대해 간단히 설명해 주세요."
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectEditPage;
