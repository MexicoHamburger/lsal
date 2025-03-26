import DynamicHistoryInput from './DynamicHistoryInput';
import DynamicCertInput from './DynamicCertInput';

export const sections = [
    {
        left: '성명',
        right: (
            <input
                type="text"
                placeholder="이름을 입력하세요"
                className="w-full border rounded px-3 py-2"
            />
        ),
    },
    {
        left: '이력',
        right: <DynamicHistoryInput />,
    },
    {
        left: '자격증 목록',
        right: <DynamicCertInput />,
    },
    {
        left: '개인 블로그 링크',
        right: (
            <input
                type="url"
                placeholder="블로그 링크를 입력하세요"
                className="w-full border rounded px-3 py-2"
            />
        ),
    },
];
