// src/components/DynamicHistoryInput.tsx
import React, { useState } from 'react';

interface CertItem {
    year: string;
    description: string;
}

const DynamicCertInput: React.FC = () => {
    const [certList, setCertList] = useState<CertItem[]>([
        { year: '', description: '' },
    ]);

    const addCert = () => {
        setCertList([...certList, { year: '', description: '' }]);
    };

    const removeCert = (index: number) => {
        setCertList(certList.filter((_, i) => i !== index));
    };

    const updateCert = (index: number, field: keyof CertItem, value: string) => {
        const newList = [...certList];
        newList[index][field] = value;
        setCertList(newList);
    };

    return (
        <div className="space-y-2">
            {certList.map((item, idx) => (
                <div key={idx} className="flex space-x-2 items-center">
                    <input
                        type="text"
                        placeholder="취득 연도"
                        value={item.year}
                        onChange={(e) => updateCert(idx, 'year', e.target.value)}
                        className="flex-[1] border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="자격증 이름"
                        value={item.description}
                        onChange={(e) => updateCert(idx, 'description', e.target.value)}
                        className="flex-[3] border px-3 py-2 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => removeCert(idx)}
                        className="text-red-400 hover:text-red-600 text-sm"
                    >
                        삭제
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addCert}
                className="text-blue-500 cursor-pointer hover:underline text-sm mt-2"
            >
                + 자격증 추가
            </button>
        </div>
    );
};

export default DynamicCertInput;
