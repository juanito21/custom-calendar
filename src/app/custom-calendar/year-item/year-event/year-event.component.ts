import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarEventParams} from "../../custom-calendar.model";

@Component({
  selector: 'app-year-event',
  templateUrl: './year-event.component.html',
  styleUrls: ['./year-event.component.scss']
})
export class YearEventComponent {
  @Input() params: CalendarEventParams;
  @Output() click: EventEmitter<number> = new EventEmitter();

  onClick() {
    this.click.emit(this.params.id)
  }
}
