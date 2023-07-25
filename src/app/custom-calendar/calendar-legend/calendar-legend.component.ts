import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-calendar-legend',
  templateUrl: './calendar-legend.component.html',
  styleUrls: ['./calendar-legend.component.scss']
})
export class CalendarLegendComponent {

  @Input() legends: string[];
  @Input() colors: string[];

}
