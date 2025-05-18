import { Link } from "react-router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

function RegisterSuccessPage() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <Layout>
            <main className="flex-1 flex-row-center p-10">
                <div className={`
                    card-gray text-center w-full max-w-lg p-8 
                    transition-opacity duration-1000 ease-out ${show ? "opacity-100" : "opacity-0"}
                    `}>
                    <h1 className="text-white-bold text-2xl mb-6">환영합니다!</h1>
                    <h2 className="text-xl my-8">이제 자신만의 포트폴리오를 꾸며봅시다.</h2>
                    <Link
                        to="/login"
                        className="card-blue-hv my-6 py-2 px-4"
                    >
                        로그인 페이지로 이동
                    </Link>
                </div>
            </main>
        </Layout>
    );
}

export default RegisterSuccessPage;
