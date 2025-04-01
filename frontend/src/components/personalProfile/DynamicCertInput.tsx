// src/components/DynamicCertInput.tsx
import React, { useState, useRef } from 'react';

interface CertItem {
    year: string;
    description: string;
}

const DynamicCertInput: React.FC = () => {
    const [certList, setCertList] = useState<CertItem[]>([
        { year: '', description: '' },
    ]);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const addCert = () => {
        setCertList((prev) => {
            const newList = [...prev, { year: '', description: '' }];
            setTimeout(() => {
                const lastIndex = newList.length - 1;
                inputRefs.current[lastIndex]?.focus();
            }, 0);
            return newList;
        });
    };

    const removeCert = (index: number) => {
        if (certList.length === 1) return; // 최소 1개 보장
        setCertList(certList.filter((_, i) => i !== index));
    };

    const updateCert = (index: number, field: keyof CertItem, value: string) => {
        const newList = [...certList];
        newList[index][field] = value;
        setCertList(newList);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCert();
        }
    };

    return (
        <div className="space-y-3">
            {certList.map((item, idx) => (
                <div key={idx} className="flex space-x-2 items-center">
                    <input
                        ref={(el) => {inputRefs.current[idx] = el}}
                        type="text"
                        placeholder="보유한 자격증을 입력하세요. (Enter로 추가)"
                        value={item.description}
                        onChange={(e) => updateCert(idx, 'description', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="flex-[3] border px-3 py-2 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => removeCert(idx)}
                        className="text-red-400 hover:text-red-600 cursor-pointer text-sm"
                    >
                        삭제
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DynamicCertInput;