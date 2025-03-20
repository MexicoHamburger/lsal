import React, { useState } from "react";
import { Link } from "react-router";

function RegisterPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const isIdValid = (id: string): boolean => {
        const idRegex = /^.{4,16}$/;
        return idRegex.test(id);
    };

    const getPasswordStrength = (password: string) => {
        if (password.length < 8 || password.length > 16) {
            return "비밀번호는 8~16자여야 합니다.";
        }

        const hasLower = /[a-z]/.test(password);  // 소문자 포함 여부
        const hasUpper = /[A-Z]/.test(password);  // 대문자 포함 여부
        const hasNumber = /[0-9]/.test(password); // 숫자 포함 여부
        const hasSpecial = /[\^_@$%]/.test(password); // 특수문자 포함 여부

        const satisfiedConditions = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

        if (satisfiedConditions == 4) {
            return "비밀번호 안전성 : 높음";
        }
        else if (satisfiedConditions == 3) {
            return "비밀번호 안전성 : 적정"
        }
        else if (satisfiedConditions > 0) {
            return "비밀번호 안전성 : 낮음"
        }
        else {
            return "비밀번호는 영문, 소문자, 특수기호(^_@$%)만 사용하실 수 있습니다.";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        {/*-- id 중복 체크 로직 필요 --*/ }
        if (!id.trim()) {
            setError("아이디를 입력해주세요.");
            return;
        }
        if (!isIdValid(id)) {
            setError("id는 4 ~ 16자여야 합니다.");
            return;
        }
        if (!password.trim()) {
            setError("비밀번호를 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        setError("");
        console.log("회원가입 성공!");
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h1 className="text-2xl font-bold mb-6">회원가입</h1>

                    {/* 회원가입 폼 */}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                        />

                        {/* 비밀번호 안전도 표시 */}
                        {password && (
                            <p className="text-sm mt-1"
                                style={{ color: getPasswordStrength(password).includes("🟢") ? "green" : "yellow" }}>
                                {getPasswordStrength(password)}
                            </p>
                        )}

                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                        />

                        {/* 에러 메시지 표시 */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-4 rounded"
                        >
                            회원가입
                        </button>
                    </form>

                    {/* 로그인으로 이동 */}
                    <p className="text-gray-400 text-sm mt-4">
                        이미 계정이 있으신가요?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            로그인
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default RegisterPage;
