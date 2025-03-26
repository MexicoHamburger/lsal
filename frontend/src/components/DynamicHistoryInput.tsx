// src/components/DynamicHistoryInput.tsx
import React, { useState } from 'react';

interface HistoryItem {
    year: string;
    description: string;
}

const DynamicHistoryInput: React.FC = () => {
    const [historyList, setHistoryList] = useState<HistoryItem[]>([
        { year: '', description: '' },
    ]);

    const addHistory = () => {
        setHistoryList([...historyList, { year: '', description: '' }]);
    };

    const removeHistory = (index: number) => {
        setHistoryList(historyList.filter((_, i) => i !== index));
    };

    const updateHistory = (index: number, field: keyof HistoryItem, value: string) => {
        const newList = [...historyList];
        newList[index][field] = value;
        setHistoryList(newList);
    };

    return (
        <div className="space-y-2">
            {historyList.map((item, idx) => (
                <div key={idx} className="flex space-x-2 items-center">
                    <input
                        type="text"
                        placeholder="연도"
                        value={item.year}
                        onChange={(e) => updateHistory(idx, 'year', e.target.value)}
                        className="flex-[1] border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="설명"
                        value={item.description}
                        onChange={(e) => updateHistory(idx, 'description', e.target.value)}
                        className="flex-[3] border px-3 py-2 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => removeHistory(idx)}
                        className="text-red-400 hover:text-red-600 text-sm"
                    >
                        삭제
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addHistory}
                className="text-blue-500 cursor-pointer hover:underline text-sm mt-2"
            >
                + 이력 추가
            </button>
        </div>
    );
};

export default DynamicHistoryInput;
