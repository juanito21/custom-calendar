import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-calendar-holiday',
  templateUrl: './calendar-holiday.component.html',
  styleUrls: ['./calendar-holiday.component.scss']
})
export class CalendarHolidayComponent {

  @Input() color: string;

}
