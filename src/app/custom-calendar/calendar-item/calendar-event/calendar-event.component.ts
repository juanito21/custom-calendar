import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarEventParams} from "../../custom-calendar.model";

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent {
  @Input() params: CalendarEventParams;
  @Output() click: EventEmitter<number> = new EventEmitter();

  onClick() {
    this.click.emit(this.params.id)
  }
}
