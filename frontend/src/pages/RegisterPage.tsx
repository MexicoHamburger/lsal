import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import IdErrorMessage from "@/components/IdErrorMessage";
import Layout from "@/components/Layout";

function RegisterPage() {
    let navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [isIdValid, setIsIdValid] = useState(false);
    const [isPasswordStrongEnough, setIsPasswordStrongEnough] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id.trim()) return setError("아이디를 입력해주세요.");
        if (!password.trim()) return setError("비밀번호를 입력해주세요.");
        if (password !== confirmPassword) return setError("비밀번호가 일치하지 않습니다.");
        setError("");

        console.log(isIdValid);
        console.log(isPasswordStrongEnough);
        if (isIdValid && isPasswordStrongEnough) {
            const user = {
                id,
                password,
            };
            localStorage.setItem("registeredUser", JSON.stringify(user));
            /* 여기서 회원가입 성공 처리 */
            navigate("/register/success");
        }
    };

    return (
        <Layout>
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h1 className="text-2xl font-bold mb-6">회원가입</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                        />
                        <IdErrorMessage id={id} onValidityChange = {setIsIdValid} />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                        />
                        <PasswordStrengthIndicator password={password} onStrengthChange = {setIsPasswordStrongEnough} />
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                        />
                        {error && <p className="text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-4 rounded"
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
