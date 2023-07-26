import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-month-holiday',
  templateUrl: './month-holiday.component.html',
  styleUrls: ['./month-holiday.component.scss']
})
export class MonthHolidayComponent {

  @Input() color: string;

}
