import React, { useEffect, useRef, useState } from 'react';

interface DatePickerPopupProps {
    initialDate?: string;
    onConfirm: (val: string) => void;
    onClose: () => void;
}

const DatePickerPopup: React.FC<DatePickerPopupProps> = ({ initialDate, onConfirm, onClose }) => {
    const [tempDate, setTempDate] = useState(initialDate || '');
    const ref = useRef<HTMLDivElement>(null);

    // 바깥 클릭 시 닫힘
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={ref}
            className="absolute bg-white text-black border rounded shadow p-4 z-50 w-64"
        >
            <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="border px-2 py-1 rounded w-full bg-white text-black"
            />
            <div className="flex justify-end space-x-2 mt-3">
                <button onClick={onClose} className="text-sm text-gray-500">취소</button>
                <button
                    onClick={() => {
                        if (tempDate) onConfirm(tempDate);
                        onClose();
                    }}
                    className="text-sm text-blue-600 font-medium"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default DatePickerPopup;
