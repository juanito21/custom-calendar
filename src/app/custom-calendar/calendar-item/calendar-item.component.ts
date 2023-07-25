import {Component, Input} from '@angular/core';
import {CalendarEventParams, CalendarHolidayParams, CalendarItemParams} from "../custom-calendar.model";

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent {

  eventsToDisplay: CalendarEventParams[];
  holidays: CalendarHolidayParams[];
  eventsNotDisplayed: number = 0;
  dayOfMonth: number;
  currentMonth: boolean;
  publicHoliday: boolean;

  @Input() set params(value: CalendarItemParams) {
    this.eventsToDisplay = value.events.slice(0, 3);
    this.eventsNotDisplayed = value.events.length - this.eventsToDisplay.length;
    this.dayOfMonth = value.dayOfMonth;
    this.currentMonth = value.isCurrentMonth;
    this.holidays = value.holidays.filter(h => !h.publicHoliday);
    this.publicHoliday = value.holidays.filter(h => h.publicHoliday).length > 0;
  }

  constructor() {
  }
}
