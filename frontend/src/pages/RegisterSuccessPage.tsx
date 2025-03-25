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
            <main className="flex-1 flex items-center justify-center p-10">
                <div className={`
                    bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center
                    transition-opacity duration-1000 ease-out ${show ? "opacity-100" : "opacity-0"}
                    `}>
                    <h1 className="text-2xl font-bold mb-6">환영합니다!</h1>
                    <h2 className="text-xl my-8">이제 자신만의 포트폴리오를 꾸며봅시다.</h2>
                    <Link
                        to="/login"
                        className="bg-blue-800 hover:bg-blue-900 cursor-pointer text-white my-6 py-2 px-4 rounded"
                    >
                        로그인 페이지로 이동
                    </Link>
                </div>
            </main>
        </Layout>
    );
}

export default RegisterSuccessPage;
