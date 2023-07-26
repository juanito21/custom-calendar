import {Component, Input} from '@angular/core';
import {
  CalendarEventParams,
  CalendarHolidayParams,
  MonthCalendarItemParams,
  YearCalendarItemParams
} from "../custom-calendar.model";

@Component({
  selector: 'app-year-item',
  templateUrl: './year-item.component.html',
  styleUrls: ['./year-item.component.scss']
})
export class YearItemComponent {

  empty: boolean = false;
  eventsToDisplay: CalendarEventParams[];
  holidays: CalendarHolidayParams[];
  eventsNotDisplayed: number = 0;
  date: Date;
  publicHoliday: boolean;

  @Input() set params(value: YearCalendarItemParams) {
    if (value === undefined) {
      this.empty = true;
      return;
    }
    this.eventsToDisplay = value.events.slice(0, 5);
    this.eventsNotDisplayed = value.events.length - this.eventsToDisplay.length;
    this.date = value.date;
    this.holidays = value.holidays.filter(h => !h.publicHoliday);
    this.publicHoliday = value.holidays.filter(h => h.publicHoliday).length > 0;
  }
}
