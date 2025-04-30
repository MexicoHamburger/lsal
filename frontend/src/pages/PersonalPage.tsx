import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Layout from "@/components/Layout";
import PersonalInfoSections from "@/components/personalProfile/PersonalInfoSections";
import PersonalProjectSections from "@/components/personalProject/PersonalProjectSections";

function PersonalPage() {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const savePersonalInfo = () => {
    // save logic here

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const saveProjectInfo = () => {
    // save logic here

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex-col px-[20%] pt-[5%] space-y-8">
        <div className="w-full p-4 space-y-4 border rounded-2xl">
          <p className="text-sm">개인 프로필 설명 관리</p>
          <PersonalInfoSections />
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
              onClick={savePersonalInfo}
            >
              저장하기
            </button>
          </div>
        </div>
        <div className="w-full p-4 space-y-4 border rounded-2xl">
          <p className="text-sm">개인 프로젝트 관리</p>
          <PersonalProjectSections />
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
              onClick={saveProjectInfo}
            >
              저장하기
            </button>
          </div>
        </div>
        <footer className="footer" />
      </div>

      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-50">
          <div className="bg-gray-900 text-white text-lg px-8 py-4 rounded-lg shadow-lg animate-fade-in-out">
            저장되었습니다!
          </div>
        </div>
      )}
    </Layout>
  );
}

export default PersonalPage;
