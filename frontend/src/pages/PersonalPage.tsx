import { useParams, useNavigate } from "react-router";
import Layout from "@/components/Layout";
import { sections } from "@/components/PersonalInfoSections"

function PersonalPage() {
    const { userid } = useParams();
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex-col px-[20%] pt-[5%] space-y-4">
                <div className="w-full p-4 space-y-4 border rounded-2xl">
                    <p className="text-sm">개인 프로필 설명 관리</p>

                    {sections.map((item, idx) => (
                        <div key={idx} className="flex w-full space-x-4">
                            <div className="w-[30%] p-2 rounded-xl">
                                {item.left}
                            </div>
                            <div className="w-[70%] p-2 rounded-xl">
                                {item.right}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default PersonalPage;
