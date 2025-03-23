const getSatisfiedConditionCount = (password: string): number => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[\^_@$%]/.test(password);
    return [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
};

export const getPasswordStrengthMessage = (password: string): string => {
    if (password.length < 8 || password.length > 16) {
        return "비밀번호는 8~16자여야 합니다.";
    }

    const allowedPattern = /^[a-zA-Z0-9\^_@$%]*$/;
    if (!allowedPattern.test(password)) {
        return "비밀번호는 영문, 소문자, 특수기호(^_@$%)만 사용하실 수 있습니다.";
    }

    const count = getSatisfiedConditionCount(password);

    if (count === 4) return "비밀번호 안전성 : 높음";
    if (count === 3) return "비밀번호 안전성 : 적정";
    if (count > 0) return "비밀번호 안전성 : 낮음";
    return "비밀번호는 영문, 소문자, 특수기호(^_@$%)만 사용하실 수 있습니다.";
};

export const getSafetyLevel = (password: string): number => {
    if (password.length < 8 || password.length > 16) return 0;

    const allowedPattern = /^[a-zA-Z0-9\^_@$%]*$/;
    if (!allowedPattern.test(password)) return 0;

    const count = getSatisfiedConditionCount(password);

    if (count === 4) return 3;
    if (count === 3) return 2;
    if (count === 2 || count === 1) return 1;
    return 0;
};
