import { useEffect, useRef } from 'react';

interface DatePickerPopupProps {
  initialDate?: string;
  onConfirm: (val: string) => void;
  onClose: () => void;
}

export default function DatePickerPopup({ onClose }: DatePickerPopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bg-white text-black border rounded shadow p-4 z-50 w-80"
    >
      {/* 상단: 년도 선택 + 월 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">년도 선택</div>
        <div className="text-lg font-semibold">2025년 3월</div>
        <div className="flex space-x-2">
          <button>{'<'}</button>
          <button>{'>'}</button>
        </div>
      </div>

      {/* 달력 그리드 더미 */}
      <div className="grid grid-cols-7 text-center text-sm mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="font-medium text-gray-500">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="py-1 rounded hover:bg-blue-100 cursor-pointer">
            {i < 5 || i > 30 ? '' : i - 4}
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="text-sm text-gray-500">닫기</button>
        <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded">확인</button>
      </div>
    </div>
  );
}
