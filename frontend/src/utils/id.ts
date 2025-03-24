export const getIdErrorMessage = (id: string): string => {
    const allowedPatternRegex = /^[A-Za-z0-9!?\@\#\$\%\*\_]{4,32}$/;

    if (!allowedPatternRegex.test(id)) {
        if (id.length < 4 || id.length > 32) {
            return "ID는 4 ~ 32자 사이여야 합니다.";
        }
        return "ID는 영문 대소문자, 숫자,\n특수기호(!?@#$%*_)만 사용하실 수 있습니다.";
    }

    return "";
};