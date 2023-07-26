import {Component, Input} from '@angular/core';
import {CalendarEventParams, CalendarHolidayParams, MonthCalendarItemParams} from "../custom-calendar.model";

@Component({
  selector: 'app-month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.scss']
})
export class MonthItemComponent {

  eventsToDisplay: CalendarEventParams[];
  holidays: CalendarHolidayParams[];
  eventsNotDisplayed: number = 0;
  dayOfMonth: number;
  currentMonth: boolean;
  publicHoliday: boolean;

  @Input() set params(value: MonthCalendarItemParams) {
    this.eventsToDisplay = value.events.slice(0, 3);
    this.eventsNotDisplayed = value.events.length - this.eventsToDisplay.length;
    this.dayOfMonth = value.dayOfMonth;
    this.currentMonth = value.isCurrentMonth;
    this.holidays = value.holidays.filter(h => !h.publicHoliday);
    this.publicHoliday = value.holidays.filter(h => h.publicHoliday).length > 0;
  }
}
