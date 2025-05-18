import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Layout from "@/components/Layout";

function LoginPage() {
    let navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
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
        
        try {
            const response = await fetch("/api/auth/login", {
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({userid: id, password: password}),
            });

            if (!response.ok) {
                throw new Error("로그인 실패");
            }
            navigate(`/personal/${id}`);
        } catch (error) {
            setError("아이디 혹은 비밀번호가 틀렸습니다.");
            return;
        }
    }

    return (
        <Layout>
            <main className="flex-1 flex-row-center p-8">
                <div className="card-gray shadow-lg text-center w-full max-w-sm p-8">
                    <h1 className="text-white-bold text-2xl mb-6">lsal</h1>

                    {/* 로그인 폼 */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="아이디"
                            className="input-gray"
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="input-gray"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* 에러 메시지 표시 (입력값이 없을 때) */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="card-blue-hv cursor-pointer text-white-bold py-2 px-4"
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
