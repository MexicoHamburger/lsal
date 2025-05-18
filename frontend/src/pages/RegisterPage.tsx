import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import IdErrorMessage from "@/components/IdErrorMessage";
import Layout from "@/components/Layout";

function RegisterPage() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [isIdValid, setIsIdValid] = useState(false);
    const [isIdCheckPassed, setIsIdCheckPassed] = useState<null | boolean>(null);
    const [isPasswordStrongEnough, setIsPasswordStrongEnough] = useState(false);

    const handleCheckIdDuplicate = async () => {
        if (!id.trim() || !isIdValid) {
            setError("올바른 형식의 아이디를 입력해주세요.");
            setIsIdCheckPassed(false);
            return;
        }

        try {
            const res = await fetch(`/api/auth/check-id/${id}`);
            if (res.ok) {
                setIsIdCheckPassed(true);
                setError("");
            } else {
                setIsIdCheckPassed(false);
                setError("사용불가한 아이디입니다.");
            }
        } catch (e) {
            console.error(e);
            setIsIdCheckPassed(false);
            setError("중복확인 중 오류가 발생했습니다.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id.trim()) return setError("아이디를 입력해주세요.");
        if (!password.trim()) return setError("비밀번호를 입력해주세요.");
        if (password !== confirmPassword) return setError("비밀번호가 일치하지 않습니다.");
        if (!isIdCheckPassed) return setError("아이디 중복확인을 해주세요.");
        setError("");

        if (isIdValid && isPasswordStrongEnough) {
            try {
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userid: id, password }),
                });

                if (!response.ok) {
                    throw new Error("회원가입 실패");
                }
                navigate("/register/success");
            } catch (error) {
                console.error("error occurred while register", error);
                setError("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Layout>
            <main className="flex-1 flex-row-center p-8">
                <div className="card-gray text-center w-full max-w-lg p-8">
                    <h1 className="text-2xl font-bold mb-6">회원가입</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        {/* 아이디 + 중복확인 */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="아이디"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                    setIsIdCheckPassed(null);
                                }}
                                className="flex-1 input-gray"
                            />
                            <button
                                type="button"
                                onClick={handleCheckIdDuplicate}
                                className={`text-white rounded transition-colors duration-200 px-3 py-2 w-28
                                    ${
                                        isIdCheckPassed === null
                                            ? "bg-gray-600 hover:bg-gray-700"
                                            : isIdCheckPassed
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                중복확인
                            </button>
                        </div>
                        <IdErrorMessage id={id} onValidityChange={setIsIdValid} />

                        {/* 비밀번호 */}
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-gray"
                        />
                        <PasswordStrengthIndicator
                            password={password}
                            onStrengthChange={setIsPasswordStrongEnough}
                        />

                        {/* 비밀번호 확인 */}
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-gray"
                        />

                        {/* 에러 메시지 */}
                        {error && <p className="text-sm text-red-400">{error}</p>}

                        {/* 제출 버튼 */}
                        <button
                            type="submit"
                            className="card-blue-hv cursor-pointer text-white-bold px-4 py-2"
                        >
                            회원가입
                        </button>
                    </form>

                    <p className="text-gray-400 text-sm mt-4">
                        이미 계정이 있으신가요?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            로그인
                        </Link>
                    </p>
                </div>
            </main>
        </Layout>
    );
}

export default RegisterPage;
