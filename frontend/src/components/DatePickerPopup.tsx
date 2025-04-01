import { useState, useEffect, useRef } from 'react';
import { getToday, getCalendarGrid, CalendarDay } from '@/utils/dateUtil';

interface DatePickerPopupProps {
    initialDate?: string;
    onConfirm: (val: string) => void;
    onClose: () => void;
}

export default function DatePickerPopup({ onClose, onConfirm }: DatePickerPopupProps) {
    const ref = useRef<HTMLDivElement>(null);
    const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const today = getToday();

    const [selYear, setSelYear] = useState(today.year);
    const [selMonth, setSelMonth] = useState(today.month);
    const [selDay, setSelDay] = useState(today.day);
    const [dayInfo, setDayInfo] = useState<CalendarDay[]>([]);

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

    useEffect(() => {
        setDayInfo(getCalendarGrid(selYear, selMonth));
    }, [selMonth, selYear]);

    const years = Array.from(
        { length: today.year - 1900 + 1 },
        (_, i) => 1900 + i
    );

    useEffect(() => {
        const selectedRef = yearRefs.current[selYear];
        if (selectedRef) {
            selectedRef.scrollIntoView({ block: 'center' });
        }
    }, []);

    return (
        <div
            ref={ref}
            className="absolute bg-white text-black border rounded shadow p-4 z-50 w-[400px] flex"
        >
            {/* 좌측 year 스크롤 바 */}
            <div className="w-20 h-[300px] overflow-y-auto border-r pr-2 mr-4 scrollbar-hidden">
                {years.map((year) => (
                    <div
                        key={year}
                        ref={(el) => {
                            yearRefs.current[year] = el;
                        }}
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
                        <button className="px-2 hover:bg-blue-100 cursor-pointer" onClick={goPrevMonth}>{'<'}</button>
                        <button className="px-2 hover:bg-blue-100 cursor-pointer" onClick={goNextMonth}>{'>'}</button>
                    </div>
                </div>

                {/* 요일 헤더 */}
                <div className="grid grid-cols-7 text-center text-sm mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <div
                            key={`${day}-${index}`}
                            className={`font-medium text-sm ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
                                }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* 날짜 그리드 더미 */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                    {dayInfo.map((item, i) => (
                        <div
                            key={i}
                            className={`
                            py-1 rounded cursor-pointer
                            ${item.isCurrentMonth ? 'text-black hover:bg-blue-100' : 'text-gray-400 hover:bg-gray-100'}
                            `}
                            onClick={() => setSelDay(item.day)}
                        >
                            {item.day}
                        </div>
                    ))}
                </div>


                {/* 하단 버튼 */}
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="text-sm px-3 py-1 rounded text-gray-500 hover:bg-gray-100">
                        닫기
                    </button>
                    <button
                        onClick={() => {
                            const dateStr = `${selYear}-${String(selMonth).padStart(2, '0')}-${String(selDay).padStart(2, '0')}`;
                            onConfirm(dateStr);
                            onClose();
                        }}
                        className="text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
