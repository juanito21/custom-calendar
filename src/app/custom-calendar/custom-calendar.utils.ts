import {
  CalendarEvent,
  CalendarEventParams,
  CalendarHoliday,
  CalendarHolidayParams,
  CalendarItem,
  colors,
  DayOfWeek,
  days,
  emptyCalendarEventParams
} from "./custom-calendar.model";

export function getCalendarHolidaysParams(date: Date, events: CalendarHoliday[], legendToColor: {[legend: string]: string}): CalendarHolidayParams[] {
  const availableEvents = events.filter(event => isWithinEvent(date, event));
  return availableEvents.map((event, index) => ({
    id: event.id,
    color: legendToColor[event.legend],
    publicHoliday: event.start === event.end
  }));
}

export function getCalendarEventParams(date: Date, events: CalendarEvent[], previous: CalendarEventParams[]): CalendarEventParams[] {
  const availableEvents = events.filter(event => isWithinEvent(date, event));
  const params: CalendarEventParams[] = availableEvents.map((event, index) => {
    const previousFound = previous.find(p => p.id === event.id);
    return {
      id: event.id,
      position: previousFound ? previousFound.position : undefined,
      firstDay: isSameDate(date, event.start),
      lastDay: isSameDate(date, event.end),
      description: previousFound ? '' : event.description,
      color: event.color || colors[index % colors.length],
      invisible: false
    };
  });
  const takenIndexes = params.map(p => p.position).filter(p => p !== undefined);
  const resultWithoutInvisible = params.map(p => {
    if (p.position !== undefined) return p;
    const index = getFirstAvailableIndex(takenIndexes, params.length);
    if (index !== undefined && !takenIndexes.includes(index)) {
      takenIndexes.push(index);
    }
    return {...p, position: index};
  });

  const resultWithoutInvisiblePosition = resultWithoutInvisible.map(r => r.position);
  let i = resultWithoutInvisiblePosition[resultWithoutInvisiblePosition.length - 1];
  while (i-- > 0) {
    if (!resultWithoutInvisiblePosition.includes(i)) {
      let index = resultWithoutInvisiblePosition.indexOf(i + 1)
      resultWithoutInvisible.splice(index, 0, {...emptyCalendarEventParams, position: i});
    }
  }
  return resultWithoutInvisible.sort((o1, o2) => o1.position - o2.position);
}


export function getFirstAvailableIndex(takenIndexes: number[], length: number): number {
  for (let i = 0; i < length; i++) {
    if (takenIndexes.includes(i)) continue;
    return i;
  }
  return length;
}

export function isWithinEvent(date: Date, {start, end}: any) {
  const [startTs, endTs] = [
    new Date(Date.parse(start)).setHours(0),
    new Date(Date.parse(end)).setHours(0)
  ];
  return date.getTime() >= startTs && date.getTime() <= endTs;
}

export function isSameDate(date: Date, other: string) {
  const otherDate = new Date(Date.parse(other));
  return date.getDate() === otherDate.getDate()
    && date.getMonth() === otherDate.getMonth()
    && date.getFullYear() === otherDate.getFullYear();
}


export function convertDateToCalendarItem(
  dates: Date[],
  dateToEvent: { [isoDate: string]: CalendarEventParams[] },
  dateToHolidays: { [isoDate: string]: CalendarHolidayParams[] },
  currentMonth: number
): CalendarItem[] {
  const result: CalendarItem[] = [];
  for (let i = 0; i < Math.ceil(dates.length / 7); i++) {
    const item = Object.assign(
      {},
      ...days.map((day: DayOfWeek, index) => ({
        [day]: {
          dayOfMonth: dates[i * 7 + index].getDate(),
          isCurrentMonth: dates[i * 7 + index].getMonth() === currentMonth,
          events: dateToEvent[dates[i * 7 + index].toISOString()],
          holidays: dateToHolidays[dates[i * 7 + index].toISOString()]
        }
      }))
    );
    result.push(item as any)
  }
  return result;
}

export function getDaysInMonth(month, year): Date[] {
  const date = new Date(year, month);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return withDaysAfter(withDaysBefore(days));
}

export function withDaysBefore(days: Date[]) {
  let firstDay = days[0];
  const result: Date[] = [];
  let day = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
  while (day > 1) {
    const date = new Date(firstDay);
    date.setDate(date.getDate() - 1);
    result.push(date);
    firstDay = date;
    day = firstDay.getDay();
  }
  return result.reverse().concat(days);
}

export function withDaysAfter(days: Date[]) {
  let lastDay = days[days.length - 1];
  const result: Date[] = [];
  let day = lastDay.getDay() == 0 ? 6 : lastDay.getDay() - 1;
  while (day < 6) {
    const date = new Date(lastDay);
    date.setDate(date.getDate() + 1);
    result.push(date);
    lastDay = date;
    day = lastDay.getDay() == 0 ? 6 : lastDay.getDay() - 1;
  }
  return days.concat(result);
}