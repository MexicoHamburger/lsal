import { useState, useEffect, useRef } from 'react';
import { getToday, getCalendarGrid } from '@/utils/dateUtil';

interface DatePickerPopupProps {
  initialDate?: string;
  onConfirm: (val: string) => void;
  onClose: () => void;
}

export default function DatePickerPopup({ onClose }: DatePickerPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const today = getToday();

  const [selYear, setSelYear] = useState(today.year);
  const [selMonth, setSelMonth] = useState(today.month);

  const goPrevMonth = () => {
    setSelMonth((prev) => prev === 1 ? 12 : prev - 1);
  };
  const goNextMonth = () => {
    setSelMonth((prev) => prev === 12 ? 1 : prev + 1);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const years = Array.from({ length: 41 }, (_, i) => 1990 + i); // 1990 ~ 2030

  return (
    <div
      ref={ref}
      className="absolute bg-white text-black border rounded shadow p-4 z-50 w-[400px] flex"
    >
      {/* 왼쪽 연도 스크롤 바 */}
      <div className="w-20 h-[300px] overflow-y-auto border-r pr-2 mr-4">
        {years.map((year) => (
          <div
            key={year}
            onClick={() => setSelYear(year)}
            className={`
              cursor-pointer px-2 py-1 text-sm
              ${year === selYear ? 'text-blue-600 font-bold bg-blue-50 rounded' : 'text-gray-700'}
            `}
          >
            {year}
          </div>
        ))}
      </div>

      {/* 오른쪽 달력 본체 */}
      <div className="flex-1 w-full">
        {/* 상단: 년/월 + 월 이동 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">{selYear}년 {selMonth}월</div>
          <div className="flex space-x-2">
            <button onClick={goPrevMonth}>{'<'}</button>
            <button onClick={goNextMonth}>{'>'}</button>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center text-sm mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div
              key={`${day}-${index}`}
              className={`font-medium text-sm ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 더미 */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="py-1 rounded hover:bg-blue-100 cursor-pointer">
              {i < 5 || i > 30 ? '' : i - 4}
            </div>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-sm text-gray-500">
            닫기
          </button>
          <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
