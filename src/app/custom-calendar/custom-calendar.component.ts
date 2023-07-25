import {Component, EventEmitter, Input} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventParams,
  CalendarHoliday, CalendarHolidayParams,
  CalendarItem, colors,
  DayOfWeek,
  days
} from "./custom-calendar.model";
import {debounceTime, tap} from "rxjs";
import {
  convertDateToCalendarItem,
  getCalendarEventParams,
  getCalendarHolidaysParams,
  getDaysInMonth
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

  legends: string[] = [];
  colors: string[] = [];

  monthData: CalendarItem[] = [];
  displayedColumns: DayOfWeek[] = days;
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

  constructor() {
    this.setterEvent.pipe(
      debounceTime(100),
      tap(() => this.setMonthData())
    ).subscribe();
  }

  dateChange(date: string) {
    const dateAsDate = new Date(date);
    this.month = dateAsDate.getMonth();
    this.year = dateAsDate.getFullYear();
  }
  setMonthData() {
    const datesInMonth = getDaysInMonth(this._month, this._year);
    let previousEvents = [];
    const dateToEvents: { [isoDate: string]: CalendarEventParams[] } = Object.assign({}, ...datesInMonth.map(date => {
      const eventsOfDate = getCalendarEventParams(date, this._events, previousEvents);
      previousEvents = eventsOfDate;
      return {[date.toISOString()]: eventsOfDate};
    }));
    const legendToColor = Object.assign(
      {},
      ...[...new Set(this._holidays.map(e => e.legend))]
        .map((legend, index) => ({[legend]: colors[(colors.length) - 1 - index % colors.length]})))
    this.legends = Object.keys(legendToColor);
    this.colors = Object.values(legendToColor);
    const dateToHolidays: { [isoDate: string]: CalendarHolidayParams[] } = Object.assign({}, ...datesInMonth.map(date => {
      const eventsOfDate = getCalendarHolidaysParams(date, this._holidays, legendToColor);
      return {[date.toISOString()]: eventsOfDate};
    }));
    this.monthData = convertDateToCalendarItem(datesInMonth, dateToEvents, dateToHolidays, this._month);
  }

  protected readonly days = days;
}
