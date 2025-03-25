import Layout from "@/components/Layout";
import { useParams } from "react-router";

function PersonalPage() {
    let { userid } = useParams(); 
    return (
        <Layout>
            <p>Welcome, {userid}</p>
        </Layout>
    );
}

export default PersonalPage;
