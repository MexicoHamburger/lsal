export type CalendarDay = {
  day: number;
  isCurrentMonth: number;
  // 0 -> prev month, 1 -> current month, 2 -> next month
};

export function getToday() {
    const now = new Date();
    return {
        year: now.getFullYear(),
        month: now.getMonth() + 1, // 1~12
        day: now.getDate(),
    };
}

function getMonthInfo(year: number, month: number) {
    const jsMonth = month - 1;

    const firstDate = new Date(year, jsMonth, 1);
    const lastDate = new Date(year, jsMonth + 1, 0);
    const prevLastDate = new Date(year, jsMonth, 0);

    return {
        startDayOfWeek: firstDate.getDay(),
        curMonthLastDate: lastDate.getDate(),
        prevMonthLastDate: prevLastDate.getDate(),
    };
}

export function getCalendarGrid(selYear: number, selMonth: number): CalendarDay[] {
    const monthInfo = getMonthInfo(selYear, selMonth);
    const firstDay = monthInfo.startDayOfWeek;
    const lastDate = monthInfo.curMonthLastDate;
    const prevLastDate = monthInfo.prevMonthLastDate;
  
    const result: CalendarDay[] = [];
  
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({ day: prevLastDate - i, isCurrentMonth: 0 });
    }
  
    for (let i = 1; i <= lastDate; i++) {
      result.push({ day: i, isCurrentMonth: 1 });
    }
  
    const remaining = 42 - result.length;
    for (let i = 1; i <= remaining; i++) {
      result.push({ day: i, isCurrentMonth: 2 });
    }
  
    return result;
  }
  

