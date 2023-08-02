export const days: string[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
export const months: string[] = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'novembre', 'octobre', 'decembre'];

export type DayOfWeek = typeof days[number];
export type Month = typeof months[number];

export type MonthCalendarItem = Record<DayOfWeek, MonthCalendarItemParams>
export type YearCalendarItem = Record<Month, MonthCalendarItemParams>

export const colors: string[] = ['#fcba03', '#0380fc', '#863bdc', '#449e00', '#d9004c'];
export const eventColors: string[] = ['#FAF2DA', '#E4EFF6', '#E3F3EF', '#FEEBDB', '#F5CDBF', '#D1CDE8'];
export const holidayColors: string[] = ['#6558B1', '#00B388', '#F2827F'];

export interface YearCalendarItemParams {
  date: Date;
  events: CalendarEventParams[];
  holidays: CalendarHolidayParams[];
  publicHoliday: boolean;
  today: boolean;
  weekEndDay: boolean;
}

export interface MonthCalendarItemParams {
  dayOfMonth: number;
  isCurrentMonth: boolean;
  events: CalendarEventParams[];
  holidays: CalendarHolidayParams[];
  publicHoliday: boolean;
  today: boolean;
  weekEndDay: boolean;
}

export interface CalendarEvent {
  id: number;
  start: string;
  end: string;
  description: string;
  color?: string;
}

export interface CalendarEventParams {
  id: number;
  position: number;
  firstDay: boolean;
  lastDay: boolean;
  invisible: boolean;
  color: string;
  description: string;
}

export const emptyCalendarEventParams = {
  id: undefined,
  position: undefined,
  firstDay: undefined,
  lastDay: undefined,
  invisible: undefined,
  color: undefined,
  description: undefined,
}

export interface CalendarHoliday {
  id: number;
  start: string;
  end: string;
  legend?: string;
  color?: string;
}

export interface CalendarHolidayParams {
  id: number;
  color: string;
  publicHoliday: boolean;
}

