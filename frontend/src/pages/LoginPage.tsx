import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Layout from "@/components/Layout";

function LoginPage() {
    let navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!id.trim()) {
            setError("아이디를 입력해주세요.");
            return;
        }
        else if (!password.trim()) {
            setError("비밀번호를 입력해주세요.");
            return;
        }
        setError("");
        
        {/* TODO : 로그인 검증 로직 */}
        navigate(`/id/${id}`);
    }

    return (
        <Layout>
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h1 className="text-2xl font-bold mb-6">lsal</h1>

                    {/* 로그인 폼 */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="아이디"
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* 에러 메시지 표시 (입력값이 없을 때) */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-4 rounded"
                        >
                            로그인
                        </button>
                    </form>

                    {/* 회원가입 링크 */}
                    <p className="text-gray-400 text-sm mt-4">
                        계정이 없으신가요?{" "}
                        <Link to="/register" className="text-blue-400 hover:underline">
                            회원가입
                        </Link>
                    </p>
                </div>
            </main>
        </Layout>
    );
}

export default LoginPage;
