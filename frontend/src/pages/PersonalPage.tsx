import { useParams, useNavigate } from "react-router";
import Layout from "@/components/Layout";
import PersonalInfoSections from "@/components/personalProfile/PersonalInfoSections";
import PersonalProjectSections from "@/components/personalProject/PersonalProjectSections";

function PersonalPage() {
  const { userid } = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-col px-[20%] pt-[5%] space-y-8">
        <div className="w-full p-4 space-y-4 border rounded-2xl">
          <p className="text-sm">개인 프로필 설명 관리</p>
          <PersonalInfoSections />
        </div>
        <div className="w-full p-4 space-y-4 border rounded-2xl">
          <p className="text-sm">개인 프로젝트 관리</p>
          <PersonalProjectSections />
        </div>
        <footer className = "footer" />
      </div>
    </Layout>
  );
}

export default PersonalPage;
