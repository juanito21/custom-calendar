export const days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export const months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'november', 'october', 'december'];

export type DayOfWeek = typeof days[number];
export type Month = typeof months[number];

export type CalendarItem = Record<DayOfWeek, CalendarItemParams>

export const colors: string[] = ['#fcba03', '#0380fc', '#863bdc', '#449e00', '#d9004c']

export interface CalendarItemParams {
  dayOfMonth: number;
  isCurrentMonth: boolean;
  events: CalendarEventParams[];
  holidays: CalendarHolidayParams[];
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
  legend: string;
  color?: string;
}

export interface CalendarHolidayParams {
  id: number;
  color: string;
  publicHoliday: boolean;
}

