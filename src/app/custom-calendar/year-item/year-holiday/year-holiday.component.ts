import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-year-holiday',
  templateUrl: './year-holiday.component.html',
  styleUrls: ['./year-holiday.component.scss']
})
export class YearHolidayComponent {
  @Input() color: string;
}
