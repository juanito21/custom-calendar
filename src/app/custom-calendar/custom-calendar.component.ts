import {Component, EventEmitter, Input} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventParams,
  CalendarHoliday,
  CalendarHolidayParams,
  colors,
  DayOfWeek,
  days, holidayColors,
  Month,
  MonthCalendarItem,
  months,
  YearCalendarItem
} from "./custom-calendar.model";
import {debounceTime, tap} from "rxjs";
import {
  convertDateToMonthCalendarItem,
  convertDateToYearCalendarItem,
  getCalendarEventParams,
  getCalendarHolidaysParams,
  getDaysInMonth,
  getDaysInYear
} from "./custom-calendar.utils";

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss']
})
export class CustomCalendarComponent {

  _month: number = new Date().getMonth();
  _year: number = new Date().getFullYear();
  _events: CalendarEvent[] = [];
  _holidays: CalendarHoliday[] = [];
  _monthView: boolean = false;

  legends: string[] = [];
  colors: string[] = [];

  monthData: MonthCalendarItem[] = [];
  yearData: YearCalendarItem[] = [];

  monthDisplayedColumns: DayOfWeek[] = days;
  yearDisplayedColumns: Month[] = months;

  setterEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input() set month(value: number) {
    this._month = value;
    this.setterEvent.emit(0);
  }

  @Input() set year(value: number) {
    this._year = value;
    this.setterEvent.emit(0);
  }

  @Input() set events(values: CalendarEvent[]) {
    this._events = values.sort((e1, e2) => Date.parse(e1.start) - Date.parse(e2.start))
    this.setterEvent.emit(0);
  }

  @Input() set holidays(values: CalendarHoliday[]) {
    this._holidays = values.sort((e1, e2) => Date.parse(e1.start) - Date.parse(e2.start))
    this.setterEvent.emit(0);
  }

  @Input() set monthView(value: boolean) {
    this._monthView = value;
    this.setterEvent.emit(0);
  }

  constructor() {
    this.setterEvent.pipe(
      debounceTime(100),
      tap(() => this._monthView ? this.setMonthData() : this.setYearData())
    ).subscribe();
  }

  dateChange(date: string) {
    const dateAsDate = new Date(date);
    this.month = dateAsDate.getMonth();
    this.year = dateAsDate.getFullYear();
  }

  setYearData() {
    const datesInYear = getDaysInYear(this._year);
    const dateToEvents = this.getDateToEvents(datesInYear);
    const legendToColor = this.setAndGetLegend();
    const dateToHolidays = this.getDateToHolidays(datesInYear, legendToColor);
    this.yearData = convertDateToYearCalendarItem(datesInYear, this._year, dateToEvents, dateToHolidays);
  }

  setMonthData() {
    const datesInMonth = getDaysInMonth(this._month, this._year);
    const dateToEvents = this.getDateToEvents(datesInMonth);
    const legendToColor = this.setAndGetLegend();
    const dateToHolidays = this.getDateToHolidays(datesInMonth, legendToColor);
    this.monthData = convertDateToMonthCalendarItem(datesInMonth, dateToEvents, dateToHolidays, this._month);
  }

  setAndGetLegend(): { [legend: string]: string } {
    const legendToColor = Object.assign(
      {},
      ...[...new Set(this._holidays.map(e => e.legend).filter(l => l !== undefined))]
        .map((legend, index) => ({[legend]: holidayColors[index % holidayColors.length]})))
    this.legends = Object.keys(legendToColor);
    this.colors = Object.values(legendToColor);
    return legendToColor;
  }

  getDateToHolidays(dates: Date[], legendToColor: { [legend: string]: string }): {
    [isoDate: string]: CalendarHolidayParams[]
  } {
    return Object.assign({}, ...dates.map(date => {
      const eventsOfDate = getCalendarHolidaysParams(date, this._holidays, legendToColor);
      return {[date.toISOString()]: eventsOfDate};
    }));
  }

  getDateToEvents(dates: Date[]): { [isoDate: string]: CalendarEventParams[] } {
    let previousEvents = [];
    return Object.assign({}, ...dates.map(date => {
      const eventsOfDate = getCalendarEventParams(date, this._events, previousEvents);
      previousEvents = eventsOfDate;
      return {[date.toISOString()]: eventsOfDate};
    }));
  }

  onViewToggle(toggle: boolean) {
    this.monthView = toggle;
  }

  protected readonly days = days;
  protected readonly months = months;
}
