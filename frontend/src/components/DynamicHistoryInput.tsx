// src/components/DynamicHistoryInput.tsx
import React, { useState } from 'react';
import DatePickerPopup from './DatePickerPopup';

interface HistoryItem {
    description: string;
    startDate: string;
    endDate: string;
}

const DynamicHistoryInput: React.FC = () => {
    const [historyList, setHistoryList] = useState<HistoryItem[]>([
        { description: '', startDate: '', endDate: '' },
    ]);
    const [activePicker, setActivePicker] = useState<{
        type: 'start' | 'end';
        index: number;
    } | null>(null);

    const addHistory = () => {
        setHistoryList([...historyList, { description: '', startDate: '', endDate: '' }]);
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
        <div className="space-y-2 relative">
            {historyList.map((item, idx) => (
                <div key={idx} className="space-y-2 border p-4 rounded-md">
                    {/* 이력 */}
                    <div className="space-y-1">
                        <label className="text-sm text-white-600">이력</label>
                        <input
                            type="text"
                            placeholder="이력을 입력하세요"
                            value={item.description}
                            onChange={(e) => updateHistory(idx, 'description', e.target.value)}
                            className="w-full border px-3 py-2 mt-2 rounded"
                        />
                    </div>

                    {/* 재직 기간 */}
                    <div className="space-y-1 relative">
                        <label className="text-sm text-white-600">재직 기간</label>
                        <div className="flex items-center space-x-2">
                            {/* 시작일 */}
                            <div className="relative flex-1">
                                <div
                                    className="border border-white text-white px-3 py-2 mt-2 rounded cursor-pointer bg-gray-900"
                                    onClick={() => setActivePicker({ type: 'start', index: idx })}
                                >
                                    {item.startDate || '시작일 선택'}
                                </div>
                                {activePicker?.type === 'start' && activePicker.index === idx && (
                                    <div className="absolute z-50 mt-2 left-0">
                                        <DatePickerPopup
                                            initialDate={item.startDate}
                                            onConfirm={(date) => updateHistory(idx, 'startDate', date)}
                                            onClose={() => setActivePicker(null)}
                                        />
                                    </div>
                                )}
                            </div>

                            <span className="text-gray-500">~</span>

                            {/* 종료일 */}
                            <div className="relative flex-1">
                                <div
                                    className="border border-white text-white px-3 py-2 mt-2 rounded cursor-pointer bg-gray-900"
                                    onClick={() => setActivePicker({ type: 'end', index: idx })}
                                >
                                    {item.endDate || '종료일 선택'}
                                </div>
                                {activePicker?.type === 'end' && activePicker.index === idx && (
                                    <div className="absolute z-50 mt-2 left-0">
                                        <DatePickerPopup
                                            initialDate={item.endDate}
                                            onConfirm={(date) => updateHistory(idx, 'endDate', date)}
                                            onClose={() => setActivePicker(null)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 삭제 버튼 */}
                    <div className="text-right">
                        <button
                            type="button"
                            onClick={() => removeHistory(idx)}
                            className="text-red-400 hover:text-red-600 text-sm"
                        >
                            삭제
                        </button>
                    </div>
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
